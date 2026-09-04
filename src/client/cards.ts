/** Per-node card readings for the active inspection scope. */

import { compactTokens, durationSeconds, exactTokens, type GraphTranslate } from './format.ts'
import {
  scopeTotals, stepsInScope,
  type GraphScope, type GraphSnapshot, type GraphStepInfo, type GraphToolCounts,
  type GraphToolPreview, type GraphTurnInfo, type RequestPromptKind,
} from './project.ts'
import type { GraphNodeId } from './topology.ts'

/**
 * Rows and corner flags one node card shows below its title and source. A field
 * the scope has no reading for is `undefined` or empty, and the card omits it.
 */
export interface GraphCardReading {
  /** Top-right count or request label. */
  readonly badge?: string | undefined
  /** Top-right neutral flag, e.g. a retry ordinal. */
  readonly flag?: string | undefined
  /** Top-right failure flag. */
  readonly flagBad?: string | undefined
  /** Primary reading row. */
  readonly meta?: string | undefined
  /** Closing row, usually a consequence or an event-name count. */
  readonly last?: string | undefined
}

/** Card readings keyed by node; the reserved `sandbox` node has none. */
export type GraphCardReadings = Readonly<Partial<Record<GraphNodeId, GraphCardReading>>>

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

/**
 * Tool names with their call counts, in first-call order.
 * @param counts - Calls per tool name.
 * @returns e.g. `bash 31 · read 24`, empty when no tool ran.
 */
function toolDistribution(counts: GraphToolCounts): string {
  return Object.entries(counts).map(([name, count]) => `${name} ${count}`).join(' · ')
}

const TOOL_PREVIEW_CHARACTERS = 48

/**
 * One recorded tool invocation as a single-line card reading, e.g.
 * `grep {"pattern": "compactons", "path": ...}`. The name and arguments are
 * wire data kept verbatim; only the length is trimmed so the fixed card height
 * never has to grow.
 * @param preview - First tool-call name and arguments a step issued.
 * @returns the truncated invocation.
 */
function toolCallPreview(preview: GraphToolPreview): string {
  const args = preview.argsRaw.replace(/\s+/g, ' ').trim()
  const joined = args === '' ? preview.name : `${preview.name} ${args}`
  return joined.length > TOOL_PREVIEW_CHARACTERS
    ? `${joined.slice(0, TOOL_PREVIEW_CHARACTERS).trimEnd()}…`
    : joined
}

/**
 * Sampling options recorded for the scope's most recent ordinary request.
 * Field names are the recorded configuration keys, shown verbatim.
 * @param config - Request configuration, when one was recorded.
 * @returns e.g. `reasoningEffort high · maxTokens 256000`, empty when unrecorded.
 */
function optionsRow(config: GraphSnapshot['requestConfig']): string {
  if (config === undefined) return ''
  const parts: string[] = []
  if (config.reasoningEffort !== undefined) parts.push(`reasoningEffort ${config.reasoningEffort}`)
  if (config.thinking !== undefined) parts.push(`thinking ${config.thinking}`)
  if (config.temperature !== undefined) parts.push(`temperature ${config.temperature}`)
  if (config.maxTokens !== undefined) parts.push(`maxTokens ${config.maxTokens}`)
  return parts.join(' · ')
}

function haltBadge(halt: GraphTurnInfo['halt'], t: GraphTranslate): string {
  if (halt === 'error') return t('status.failed')
  if (halt === 'stopped') return t('halt.stopped')
  if (halt === 'max_tokens') return t('halt.maxTokens')
  return ''
}

function promptChangeRow(step: GraphStepInfo, t: GraphTranslate): string {
  const kind: RequestPromptKind | undefined = step.promptKind
  if (kind !== undefined) return t('card.promptChange', { change: t(CHANGE_KEYS[kind]) })
  if (step.incomingResults > 0) return t('card.promptResults')
  return t('card.promptUnchanged')
}

function requestBadge(
  scope: GraphScope,
  requestNumbers: readonly number[],
  t: GraphTranslate,
): string {
  const first = requestNumbers[0]
  const last = requestNumbers[requestNumbers.length - 1]
  if (first === undefined || last === undefined) return ''
  if (scope.kind === 'session') return t('request.count', { count: requestNumbers.length })
  if (first === last) return t('request.label', { request: first })
  return t('request.range', { from: first, to: last })
}

/**
 * Card readings for every node under one scope.
 *
 * Session and turn scopes report scope sums; a step scope reports that step and
 * switches the wording that depends on where the step sits in its turn.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @param t - Graph translator.
 * @returns readings keyed by node id.
 */
export function cardReadings(
  snapshot: GraphSnapshot,
  scope: GraphScope,
  t: GraphTranslate,
): GraphCardReadings {
  const totals = scopeTotals(snapshot, scope)
  const steps = stepsInScope(snapshot, scope)
  const step = scope.kind === 'step' ? steps[0] : undefined
  const turn = scope.kind === 'session'
    ? undefined
    : snapshot.turns.find(item => item.turn === scope.turn)
  const users = scope.kind === 'session'
    ? snapshot.users
    : snapshot.userTurns.filter(item => item === scope.turn).length
  const halt = scope.kind === 'session'
    ? snapshot.turns.find(item => item.halt !== undefined)?.halt
    : turn?.halt
  const firstStep = step !== undefined && step.step === 1
  const stepCount = Math.max(1, totals.steps)
  const resumed = Math.max(0, totals.steps - (scope.kind === 'session' ? snapshot.turns.length : 1))
  const distribution = toolDistribution(totals.toolCounts)
  const options = optionsRow(snapshot.requestConfig)
  const identity = [snapshot.model, snapshot.provider].filter(part => part !== undefined).join(' · ')
  const endedTurns = snapshot.turns.filter(item => item.ended).length
  const toolPreviewStep = step ?? [...steps].reverse().find(item => item.toolPreview !== undefined)
  const toolInvocation = toolPreviewStep?.toolPreview === undefined
    ? undefined
    : toolCallPreview(toolPreviewStep.toolPreview)
  const assistantPreviewStep = step ?? [...steps].reverse().find(item => item.assistantPreview !== undefined)
  const assistantInvocation = assistantPreviewStep?.assistantPreview

  return {
    input: {
      badge: step === undefined
        ? (users === 0 ? undefined : String(users))
        : (firstStep ? '1' : undefined),
      meta: step === undefined
        ? (users === 0 ? undefined : t('card.inputSourceCount', { count: users }))
        : (firstStep ? t('card.inputSource') : t('card.inputResumed')),
      last: step === undefined
        ? (resumed === 0 ? undefined : t('card.restResumed', { count: resumed }))
        : (firstStep
          ? (step.userText === undefined ? undefined : t('card.userQuote', { text: step.userText }))
          : t('card.wokenBy', { count: step.incomingResults })),
    },
    assemble: {
      badge: totals.inputTokens === 0
        ? undefined
        : compactTokens(
          step === undefined ? Math.round(totals.inputTokens / stepCount) : step.inputTokens,
          t,
        ),
      last: step !== undefined
        ? promptChangeRow(step, t)
        : (scope.kind === 'turn'
          ? t('card.assembleTurn', { count: totals.steps })
          : t('card.assembleSession', {
            compactions: snapshot.compactions,
            changes: snapshot.promptKinds.length,
          })),
    },
    request: {
      badge: requestBadge(scope, totals.requestNumbers, t),
      flag: step !== undefined
        ? (step.retry === undefined
          ? undefined
          : t('card.retry', { retry: step.retry, maximum: step.maxRetries ?? totals.maxRetries }))
        : (totals.retries === 0 ? undefined : t('card.retryCount', { count: totals.retries })),
      meta: totals.timedSteps === 0
        ? undefined
        : (step?.timing !== undefined
          ? t('card.timing', {
            ttft: durationSeconds(step.timing.ttftMs, t),
            generation: durationSeconds(step.timing.generationMs, t),
            total: durationSeconds(step.timing.ttftMs + step.timing.generationMs, t),
          })
          : t('card.timingAverage', {
            ttft: durationSeconds(totals.ttftMs / totals.timedSteps, t),
            generation: durationSeconds(totals.generationMs / totals.timedSteps, t),
          })),
      last: totals.inputTokens + totals.outputTokens === 0
        ? undefined
        : t('card.usage', {
          input: step === undefined
            ? compactTokens(totals.inputTokens, t)
            : exactTokens(totals.inputTokens, t),
          cached: step === undefined
            ? compactTokens(totals.cacheReadTokens, t)
            : exactTokens(totals.cacheReadTokens, t),
          output: step === undefined
            ? compactTokens(totals.outputTokens, t)
            : exactTokens(totals.outputTokens, t),
        }),
    },
    assistant: {
      badge: totals.messages === 0 ? undefined : String(totals.messages),
      meta: assistantInvocation ?? t('card.blocks', {
        think: totals.thinkBlocks,
        text: totals.textBlocks,
        call: totals.callBlocks,
      }),
      last: assistantInvocation === undefined
        ? (totals.messages === 0 ? undefined : t('card.messages', { count: totals.messages }))
        : t('card.blocks', {
          think: totals.thinkBlocks,
          text: totals.textBlocks,
          call: totals.callBlocks,
        }),
    },
    tool: {
      badge: totals.calls === 0 ? undefined : String(totals.calls),
      flagBad: totals.toolErrors === 0
        ? undefined
        : t('card.toolsFailed', { count: totals.toolErrors }),
      meta: toolInvocation
        ?? (step !== undefined ? t('card.toolsNone') : t('card.toolsIdle')),
      last: step !== undefined
        ? (step.isLast ? t('card.toolsLastStep') : t(STATUS_KEYS[step.status]))
        : (distribution === '' ? undefined : distribution),
    },
    log: {
      badge: totals.logEvents === 0 ? undefined : String(totals.logEvents),
      meta: t(
        step !== undefined ? 'card.logStep' : (scope.kind === 'turn' ? 'card.logTurn' : 'card.logSession'),
        { count: totals.logEvents },
      ),
    },
    turnend: {
      badge: haltBadge(halt, t),
      meta: step !== undefined
        ? (step.isLast
          ? (turn?.ended === true ? t('card.turnendFired') : t('card.turnendReady'))
          : t('card.turnendPending'))
        : (scope.kind === 'turn'
          ? (turn?.ended === true ? t('card.turnendFired') : t('card.turnendRunning'))
          : t('card.turnendSession', {
            ended: endedTurns,
            running: snapshot.turns.length - endedTurns,
          })),
    },
    llm: { meta: identity, last: options },
    workspace: {
      badge: totals.results === 0 ? undefined : String(totals.results),
      meta: distribution === ''
        ? (step === undefined ? undefined : t('card.workspaceIdle'))
        : Object.keys(totals.toolCounts).join(' · '),
    },
  }
}
