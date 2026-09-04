/** Grouped drawer rows derived from the projection and the Trajectory snapshot. */

import type {
  AssistantBlock, AssistantMessageNode, ConversationNode, RequestView, ToolResultNode,
} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { TrajectorySnapshot } from '@deepseek-ai/dsh-client-ui-trajectory/client'
import { compactTokens, durationMillis, exactTokens, type GraphTranslate } from './format.ts'
import {
  assembleSegments, locationInScope, scopeTotals, stepsInScope,
  type AssembleSegmentId, type GraphScope, type GraphSnapshot, type GraphTurnInfo,
  type RequestPromptKind,
} from './project.ts'
import type { GraphNodeId } from './topology.ts'

/** One clickable row in a details group. */
export interface GraphDrawerRow {
  readonly id: string
  /** Left identifier: a request number, block index, turn, or count. */
  readonly lead: string
  /** Monospace body: a recorded event name, value, or preview. */
  readonly body: string
  /** Right column: attributed tokens or elapsed time. */
  readonly trailing?: string
  /** Success marker; absent when the row records no outcome. */
  readonly ok?: boolean
  /** Assembly-source swatch, for the rows that carry one. */
  readonly segment?: AssembleSegmentId
  /** Dim the row: the source contributed nothing inside the scope. */
  readonly muted?: true
  /** Opens the Trajectory view at this call. */
  readonly callId?: string
}

/** One collapsible group of drawer rows. */
export interface GraphDrawerGroup {
  readonly id: string
  readonly title: string
  readonly rows: readonly GraphDrawerRow[]
  /** Right-hand roll-up shown beside the row count. */
  readonly total?: string
  /** Whether the group opens with the drawer. */
  readonly open: boolean
}

const PREVIEW_CHARACTERS = 48

/** Where each assembly source's material comes from, named by its mechanism. */
const SOURCE_MECHANISMS: Readonly<Record<AssembleSegmentId, string>> = {
  system: 'ctx.systemPrompt.section()',
  tools: 'ctx.tools',
  context: 'agent.inject()',
  history: 'deriveMessages()',
  results: 'tool/result',
}

const SEGMENT_KEYS = {
  system: 'seg.system',
  tools: 'seg.tools',
  context: 'seg.context',
  history: 'seg.history',
  results: 'seg.results',
} as const

const CHANGE_KEYS = {
  'initial': 'change.initial',
  'system': 'change.system',
  'tools': 'change.tools',
  'system-and-tools': 'change.systemAndTools',
} as const

const STATUS_KEYS = {
  running: 'status.pending',
  complete: 'status.completed',
  error: 'status.failed',
} as const

function preview(text: string): string {
  const compact = text.replace(/\s+/g, ' ').trim()
  return compact.length > PREVIEW_CHARACTERS
    ? `${compact.slice(0, PREVIEW_CHARACTERS).trimEnd()}…`
    : compact
}

function nodeText(node: Extract<ConversationNode, { content: unknown }>): string {
  const blocks = node.content as readonly { type: string; text?: string }[]
  return blocks.map(block => block.text ?? '').join(' ')
}

/**
 * Group name for one recorded result: the tool it ran, or its call id when the
 * call head never arrived.
 * @param event - A recorded tool result.
 * @returns the group name.
 */
function toolNameOf(event: ToolResultNode): string {
  return event.call?.name ?? event.callId
}

function blockBody(block: AssistantBlock): string {
  if (block.kind === 'text' || block.kind === 'reasoning') return preview(block.text)
  if (block.kind === 'tool-call') return block.name
  return block.kind
}

/**
 * Whether a compaction request belongs to the scope. A compaction occupies a
 * request number but no step, so a step scope never covers one.
 * @param request - A request whose purpose is `compaction`.
 * @param scope - Active inspection scope.
 * @returns true when the scope covers it.
 */
function compactionInScope(request: RequestView, scope: GraphScope): boolean {
  if (scope.kind === 'session') return true
  if (scope.kind === 'step') return false
  return request.turn === scope.turn
}

function turnsInScope(
  snapshot: GraphSnapshot,
  scope: GraphScope,
): readonly GraphTurnInfo[] {
  if (scope.kind === 'session') return snapshot.turns
  return snapshot.turns.filter(turn => turn.turn === scope.turn)
}

function group(
  id: string,
  title: string,
  rows: readonly GraphDrawerRow[],
  open: boolean,
  total?: string,
): readonly GraphDrawerGroup[] {
  if (rows.length === 0) return []
  return [{ id, title, rows, open, ...(total === undefined ? {} : { total }) }]
}

function assembleGroups(
  snapshot: GraphSnapshot,
  trajectory: TrajectorySnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const segments = assembleSegments(snapshot, scope)
  const sources = segments.map((segment): GraphDrawerRow => ({
    id: `seg-${segment.id}`,
    lead: t(SEGMENT_KEYS[segment.id]),
    body: SOURCE_MECHANISMS[segment.id],
    trailing: compactTokens(segment.tokens, t),
    segment: segment.id,
    ...(segment.active ? {} : { muted: true as const }),
  }))
  const changes = stepsInScope(snapshot, scope).flatMap((step): GraphDrawerRow[] => {
    const kind: RequestPromptKind | undefined = step.promptKind
    if (kind === undefined) return []
    return [{
      id: `change-${step.turn}-${step.step}`,
      lead: t('group.step', { step: step.step }),
      body: t(CHANGE_KEYS[kind]),
    }]
  })
  const compactions = [...trajectory.requests]
    .sort((left, right) => left.startSeq - right.startSeq)
    .flatMap((request, index): GraphDrawerRow[] => {
      if (request.purpose !== 'compaction' || !compactionInScope(request, scope)) return []
      return [{
        id: `compaction-${request.startSeq}`,
        lead: t('request.label', { request: index + 1 }),
        body: request.turn === null
          ? t('request.compaction', { section: t('section.betweenTurns') })
          : t('group.compaction'),
      }]
    })
  const totals = scopeTotals(snapshot, scope)
  return [
    ...group('sources', t('group.assembleSources'), sources, true,
      compactTokens(totals.inputTokens, t)),
    ...group('changes', t('group.promptChanges'), changes, false),
    ...group('compactions', t('group.compaction'), compactions, false),
  ]
}

function requestGroups(
  snapshot: GraphSnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const totals = scopeTotals(snapshot, scope)
  const steps = stepsInScope(snapshot, scope)
  const status = steps[steps.length - 1]?.status
  const overview: GraphDrawerRow[] = [
    ...(status === undefined
      ? []
      : [{ id: 'status', lead: t('details.status'), body: t(STATUS_KEYS[status]) }]),
    ...(snapshot.provider === undefined
      ? []
      : [{ id: 'provider', lead: t('details.provider'), body: snapshot.provider }]),
    ...(snapshot.model === undefined
      ? []
      : [{ id: 'model', lead: t('details.model'), body: snapshot.model }]),
    { id: 'calls', lead: t('details.toolCalls'), body: String(totals.calls) },
  ]
  const usage: GraphDrawerRow[] = totals.inputTokens + totals.outputTokens === 0 ? [] : [
    { id: 'input', lead: t('usage.input'), body: exactTokens(totals.inputTokens, t) },
    { id: 'cached', lead: t('usage.cached'), body: exactTokens(totals.cacheReadTokens, t) },
    { id: 'output', lead: t('usage.output'), body: exactTokens(totals.outputTokens, t) },
  ]
  const timing: GraphDrawerRow[] = totals.timedSteps === 0 ? [] : [
    {
      id: 'total',
      lead: t('timing.totalDuration'),
      body: durationMillis(totals.ttftMs + totals.generationMs, t),
    },
    { id: 'ttft', lead: t('timing.ttft'), body: durationMillis(totals.ttftMs, t) },
    { id: 'generation', lead: t('timing.generation'), body: durationMillis(totals.generationMs, t) },
  ]
  const retries = steps.flatMap((step): GraphDrawerRow[] => (
    step.retry === undefined ? [] : [{
      id: `retry-${step.turn}-${step.step}`,
      lead: t('group.step', { step: step.step }),
      body: t('card.retry', { retry: step.retry, maximum: step.maxRetries ?? totals.maxRetries }),
      ok: false,
    }]
  ))
  return [
    ...group('overview', t('group.overview'), overview, true),
    ...group('usage', t('group.usage'), usage, true),
    ...group('timing', t('group.timing'), timing, true),
    ...group('retries', t('group.retries'), retries, true),
  ]
}

function inputGroups(
  snapshot: GraphSnapshot,
  trajectory: TrajectorySnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const users = scope.kind === 'session'
    ? snapshot.users
    : snapshot.userTurns.filter(turn => turn === scope.turn).length
  const resumed = stepsInScope(snapshot, scope)
    .reduce((sum, step) => sum + step.incomingResults, 0)
  const sources: GraphDrawerRow[] = [
    { id: 'user', lead: t('source.user'), body: 'user/message', trailing: String(users) },
    { id: 'results', lead: t('source.results'), body: 'tool/result', trailing: String(resumed) },
  ]
  const messages = trajectory.eventNodes.flatMap((event): GraphDrawerRow[] => {
    if (event.kind !== 'user' && event.kind !== 'steering') return []
    if (!locationInScope(trajectory.eventLocations.get(event.seq), scope)) return []
    return [{
      id: `msg-${event.seq}`,
      lead: event.kind,
      body: preview(nodeText(event)),
    }]
  })
  return [
    ...group('sources', t('group.sources'), sources, true),
    ...group('messages', t('group.messages'), messages, true),
  ]
}

function assistantGroups(
  trajectory: TrajectorySnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const messages = trajectory.eventNodes.filter((event): event is AssistantMessageNode => {
    if (event.kind !== 'assistant') return false
    if (scope.kind === 'session') return true
    if (event.turn !== scope.turn) return false
    return scope.kind === 'turn' || event.step === scope.step
  })
  return messages.flatMap((message, index) => group(
    `msg-${message.seq}`,
    t('group.step', { step: message.step }),
    message.blocks.map((block, blockIndex): GraphDrawerRow => ({
      id: `block-${message.seq}-${blockIndex}`,
      lead: t('block.label', { index: blockIndex + 1 }),
      body: `${block.kind} · ${blockBody(block)}`,
      ...(block.kind === 'tool-call' ? { callId: block.callId } : {}),
    })),
    index === 0,
  ))
}

function toolGroups(
  snapshot: GraphSnapshot,
  trajectory: TrajectorySnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const results = trajectory.eventNodes.filter((event): event is ToolResultNode => (
    event.kind === 'tool-result'
    && locationInScope(trajectory.eventLocations.get(event.seq), scope)
  ))
  const running = trajectory.runningCalls.filter((call) => {
    if (scope.kind === 'session') return true
    if (call.turn !== scope.turn) return false
    return scope.kind === 'turn' || call.step === scope.step
  })
  const names: string[] = []
  for (const name of [
    ...results.map(toolNameOf),
    ...running.map(call => call.name),
  ]) {
    if (!names.includes(name)) names.push(name)
  }
  if (names.length === 0) {
    const steps = stepsInScope(snapshot, scope)
    const only = scope.kind === 'step' ? steps[0] : undefined
    if (only?.isLast !== true) return []
    return group('none', t('node.tool'), [
      { id: 'none', lead: t('card.toolsNone'), body: t('drawer.noCalls') },
    ], true)
  }
  return names.flatMap((name, index) => {
    const rows: GraphDrawerRow[] = [
      ...results
        .filter(event => toolNameOf(event) === name)
        .map((event): GraphDrawerRow => ({
          id: `tool-${event.seq}`,
          lead: `#${event.seq}`,
          body: preview(event.call?.argsRaw ?? ''),
          ...(event.callTime === null
            ? {}
            : { trailing: durationMillis(event.time - event.callTime, t) }),
          ok: !event.isError,
          callId: event.callId,
        })),
      ...running
        .filter(call => call.name === name)
        .map((call): GraphDrawerRow => ({
          id: `run-${call.callId}`,
          lead: t('status.pending'),
          body: preview(call.argsRaw),
          callId: call.callId,
        })),
    ]
    const elapsed = results.reduce((sum, event) => {
      if (toolNameOf(event) !== name || event.callTime === null) return sum
      return sum + (event.time - event.callTime)
    }, 0)
    return group(`tool-${name}`, name, rows, index === 0,
      elapsed === 0 ? undefined : durationMillis(elapsed, t))
  })
}

function logGroups(
  trajectory: TrajectorySnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const counts = new Map<string, number>()
  for (const event of trajectory.eventNodes) {
    if (!locationInScope(trajectory.eventLocations.get(event.seq), scope)) continue
    counts.set(event.kind, (counts.get(event.kind) ?? 0) + 1)
  }
  const rows = [...counts].map(([kind, count]): GraphDrawerRow => ({
    id: `log-${kind}`,
    lead: String(count),
    body: kind,
  }))
  return group('events', t('group.events'), rows, true)
}

function turnendGroups(
  snapshot: GraphSnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const rows = turnsInScope(snapshot, scope).map((turn): GraphDrawerRow => {
    const calls = turn.steps.reduce((sum, step) => sum + step.calls, 0)
    return {
      id: `turn-${turn.turn}`,
      lead: t('turn.label', { turn: turn.turn }),
      body: t('rail.summary', {
        steps: t(
          turn.steps.length === 1 ? 'turn.stepCount.one' : 'turn.stepCount.other',
          { count: turn.steps.length },
        ),
        toolCalls: t(
          calls === 1 ? 'summary.toolCalls.one' : 'summary.toolCalls.other',
          { count: calls },
        ),
      }),
      // The end status lives in its own column; it is not a tool-call count.
      trailing: turn.ended ? t('card.turnendFired') : t('card.turnendRunning'),
      ...(turn.ended ? { ok: turn.halt === undefined } : {}),
    }
  })
  return group('turns', t('group.turns'), rows, true)
}

function llmGroups(
  snapshot: GraphSnapshot,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const config = snapshot.requestConfig
  if (config === undefined) return []
  // Map the known request-config fields explicitly; a blind `Object.entries`
  // dump would render a future object-valued field as `[object Object]`.
  const rows: GraphDrawerRow[] = []
  const push = (field: string, value: string): void => {
    rows.push({ id: `opt-${field}`, lead: field, body: value })
  }
  push('provider', config.provider)
  push('model', config.model)
  if (config.purpose !== undefined) push('purpose', config.purpose)
  if (config.thinking !== undefined) push('thinking', config.thinking)
  if (config.reasoningEffort !== undefined) push('reasoningEffort', config.reasoningEffort)
  if (config.temperature !== undefined) push('temperature', String(config.temperature))
  if (config.maxTokens !== undefined) push('maxTokens', String(config.maxTokens))
  if (config.stop !== undefined && config.stop.length > 0) push('stop', config.stop.join(', '))
  return group('options', t('group.options'), rows, true)
}

function workspaceGroups(
  snapshot: GraphSnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  const totals = scopeTotals(snapshot, scope)
  const rows = Object.entries(totals.toolCounts).map(([name, count]): GraphDrawerRow => ({
    id: `op-${name}`,
    lead: name,
    body: 'ctx.fs · ctx.shell',
    trailing: String(count),
  }))
  return group('operations', t('group.operations'), rows, true)
}

/**
 * Collapsible details groups for one selected node.
 *
 * Rows carrying a `callId` open the Trajectory view; this drawer summarises and
 * never reimplements Trajectory's own record inspector.
 * @param node - Compile-time graph node.
 * @param snapshot - Session-wide index.
 * @param trajectory - Current Trajectory target snapshot.
 * @param scope - Active inspection scope.
 * @param t - Graph translator.
 * @returns groups in reading order; empty for a node with no readings.
 */
export function drawerGroups(
  node: GraphNodeId,
  snapshot: GraphSnapshot,
  trajectory: TrajectorySnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): readonly GraphDrawerGroup[] {
  switch (node) {
    case 'input': return inputGroups(snapshot, trajectory, scope, t)
    case 'assemble': return assembleGroups(snapshot, trajectory, scope, t)
    case 'request': return requestGroups(snapshot, scope, t)
    case 'assistant': return assistantGroups(trajectory, scope, t)
    case 'tool': return toolGroups(snapshot, trajectory, scope, t)
    case 'log': return logGroups(trajectory, scope, t)
    case 'turnend': return turnendGroups(snapshot, scope, t)
    case 'llm': return llmGroups(snapshot, t)
    case 'workspace': return workspaceGroups(snapshot, scope, t)
    // The sandbox node is reserved: no backend mounts behind it yet.
    case 'sandbox': return []
  }
}
