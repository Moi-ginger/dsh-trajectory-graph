/**
 * Browser architecture-graph plugin contributing one entry to the conversation
 * view slot without defining a service.
 */
import type { Context } from '@deepseek-ai/cordis'
import type { ObservableSnapshot } from '@deepseek-ai/dsh-client-store'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: the 'conversation.view' SlotMap row (declared by the slot's
// owning package) must be in the program for the register calls to type.
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-trajectory/client'
import { GraphView, type GraphViewInjected } from './GraphView.tsx'
import { cloneDefaultPositions } from './layout.ts'
import { createGraphLayoutStore } from './layout-store.ts'
import { en, NS, zh } from './locales.ts'
import { createGraphSource, type GraphSnapshot } from './project.ts'

export type { GraphKey } from './locales.ts'

/** Required services: the conversation slot, locale, Conversation assembly, and Sessions. */
export const inject = ['slots', 'locale', 'uiConversation', 'sessions']

/**
 * Client plugin body: register the architecture-graph view tab. The
 * registration rides the slot service's effect wrapper, so plugin unload
 * removes the tab.
 * @param ctx - client root context.
 */
export function apply(ctx: Context): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-trajectory-graph: dictionaries')
  const t = ctx.locale.bind(NS)
  const layout = createGraphLayoutStore()
  const graphSources = new Map<SessionId, ObservableSnapshot<GraphSnapshot>>()
  const graphSource = (sessionId: SessionId): ObservableSnapshot<GraphSnapshot> => {
    const existing = graphSources.get(sessionId)
    if (existing !== undefined) return existing
    const source = createGraphSource(ctx.uiConversation.binding(sessionId).target('trajectory'))
    graphSources.set(sessionId, source)
    return source
  }
  ctx.slots.inject('conversation.view', () => ctx.slots.register({
    name: 'conversation.view',
    id: 'graph',
    order: 20,
    locale: NS,
    label: () => t('view.graph'),
    inject: (sessionId: SessionId): GraphViewInjected => {
      const session = ctx.sessions.binding(sessionId)?.session
      if (session === undefined) {
        throw new Error(`ui-trajectory-graph: session "${sessionId}" is unavailable`)
      }
      const trajectory = ctx.uiConversation.binding(sessionId).target('trajectory')
      return {
        hooks: { graph: graphSource(sessionId), layout },
        setLayout: (positions) => { layout.set({ ...positions }) },
        resetLayout: () => { layout.set(cloneDefaultPositions()) },
        loadOlder: async () => {
          const before = trajectory.getSnapshot()
          await session.loadOlder()
          return trajectory.getSnapshot() !== before
        },
      }
    },
  }, GraphView))
}
