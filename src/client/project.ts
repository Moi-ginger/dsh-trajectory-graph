/** Incremental TrajectorySnapshot → architecture-graph index. */

import type {
  AssistantBlock, AssistantMessageNode, AssistantRequestConfig, ConversationLocation,
  ConversationNode,
} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { TrajectorySnapshot } from '@deepseek-ai/dsh-client-ui-trajectory/client'
import type { ObservableSnapshot } from '@deepseek-ai/dsh-client-store'
import type { ContentBlock } from '@deepseek-ai/dsh-llm/types'
import type { GraphEdgeId, GraphNodeId } from './topology.ts'

/** Empty Trajectory snapshot used when the target has not published yet. */
export const EMPTY_TRAJECTORY: TrajectorySnapshot = {
  eventNodes: [],
  eventLocations: new Map(),
  requests: [],
  callSchemas: new Map(),
  partial: null,
  runningCalls: [],
}

/** Three-level inspection scope for readings and edge traffic. */
export type GraphScope =
  | { readonly kind: 'session' }
  | { readonly kind: 'turn'; readonly turn: number }
  | { readonly kind: 'step'; readonly turn: number; readonly step: number }

/** Named focus set that dims nodes outside the set. */
export type GraphViewMode = 'panorama' | 'request' | 'context'

/** One segment of the prompt-assembly bar. */
export type AssembleSegmentId = 'system' | 'tools' | 'context' | 'history' | 'results'

/** Prompt-assembly sources in bar order. */
export const ASSEMBLE_SEGMENTS: readonly AssembleSegmentId[] = [
  'system', 'tools', 'context', 'history', 'results',
]

/**
 * Recorded prompt material per assembly source, measured in characters of the
 * model-visible text. Providers report one input-token total per request and
 * never a per-source split, so the bar scales these measured shares by that
 * total instead of claiming provider-reported per-source token counts.
 */
export type GraphSegmentChars = Readonly<Record<AssembleSegmentId, number>>

/**
 * Calls per tool name. String keys keep their insertion order, so iterating the
 * record yields the tools in the order they were first invoked.
 */
export type GraphToolCounts = Readonly<Record<string, number>>

/** Recorded first-token and decoding latency for one step. */
export interface GraphStepTiming {
  readonly ttftMs: number
  readonly generationMs: number
}

/** First tool-call name and arguments a step issued, shown on the tool card. */
export interface GraphToolPreview {
  readonly name: string
  readonly argsRaw: string
}

/** One agent-loop step inside a turn. */
export interface GraphStepInfo {
  readonly turn: number
  readonly step: number
  readonly requestNumber: number
  readonly calls: number
  readonly results: number
  /** Tool results the previous step recorded, which this step's prompt admits. */
  readonly incomingResults: number
  readonly toolErrors: number
  /** Summed `tool/call` → `tool/result` durations for results whose call is in window. */
  readonly toolMs: number
  /** Calls per tool name, keyed in first-call order. */
  readonly toolCounts: GraphToolCounts
  readonly thinkBlocks: number
  readonly textBlocks: number
  readonly callBlocks: number
  /** Assistant messages recorded for this step. */
  readonly messages: number
  /** SessionEvent-backed nodes located in this step. */
  readonly logEvents: number
  readonly isLast: boolean
  readonly status: 'running' | 'complete' | 'error'
  readonly promptKind?: RequestPromptKind
  readonly inputTokens: number
  readonly outputTokens: number
  readonly cacheReadTokens: number
  /** Absent when the recorded step/chunk/message boundaries do not span a latency. */
  readonly timing?: GraphStepTiming
  /** Retry ordinal scheduled after this step's request failed. */
  readonly retry?: number
  readonly maxRetries?: number
  /** First user-message preview admitted by this step, when one was. */
  readonly userText?: string
  /** Model-visible characters of the user messages this step admitted. */
  readonly userChars: number
  /** Model-visible characters of the tool-call arguments this step issued. */
  readonly callChars: number
  /** Model-visible characters of the tool results this step recorded. */
  readonly ownResultChars: number
  /** First tool call this step issued, for the tool card's live reading. */
  readonly toolPreview?: GraphToolPreview
  /** First text or reasoning block this step produced, truncated. */
  readonly assistantPreview?: string
  readonly segmentChars: GraphSegmentChars
}

/** One compaction request occupying the shared request-number sequence. */
export interface GraphCompactionInfo {
  readonly requestNumber: number
  readonly turn: number | null
}

/** One standalone compaction that ran between two turns. */
export interface GraphBetweenTurnCompaction {
  readonly requestNumber: number
  /** Turn the compaction follows; `null` before the first turn opened. */
  readonly afterTurn: number | null
}

/** One user-prompt turn. */
export interface GraphTurnInfo {
  readonly turn: number
  readonly steps: readonly GraphStepInfo[]
  readonly compactions: readonly GraphCompactionInfo[]
  readonly ended: boolean
  readonly halt?: 'error' | 'stopped' | 'max_tokens'
}

/** Sequence-mode timeline span. */
export interface GraphTimelineSpan {
  readonly id: string
  readonly lane: 0 | 1 | 2
  readonly turn: number | null
  readonly step: number | null
  /** Unix epoch ms when the represented operation started. */
  readonly start: number
  /** Unix epoch ms when it completed; equal to `start` for instants. */
  readonly end: number
  readonly callId?: string
  readonly isError?: true
  /** First-token latency inside the span, for the model lane's split fill. */
  readonly ttftMs?: number
  readonly generationMs?: number
}

/** Session-wide architecture-graph projection. */
export interface GraphSnapshot {
  readonly turns: readonly GraphTurnInfo[]
  readonly latestTurn: number | null
  readonly spans: readonly GraphTimelineSpan[]
  readonly betweenTurnCompactions: readonly GraphBetweenTurnCompaction[]
  readonly users: number
  readonly userTurns: readonly number[]
  readonly assistants: number
  readonly thinkBlocks: number
  readonly textBlocks: number
  readonly callBlocks: number
  readonly tools: number
  readonly toolErrors: number
  readonly retries: number
  readonly compactions: number
  readonly logEvents: number
  readonly inputTokens: number
  readonly outputTokens: number
  readonly provider?: string
  readonly model?: string
  /** Sampling options of the most recent ordinary request. */
  readonly requestConfig?: AssistantRequestConfig
  readonly running: boolean
  readonly promptKinds: readonly RequestPromptKind[]
}

/** Prompt-change kind copied from RequestPromptChange. */
export type RequestPromptKind = 'initial' | 'system' | 'tools' | 'system-and-tools'

interface UsageLike {
  readonly inputTokens?: number
  readonly outputTokens?: number
  readonly cacheReadTokens?: number
}

interface MutableStep {
  turn: number
  step: number
  requestNumber: number
  calls: number
  results: number
  toolErrors: number
  toolMs: number
  toolCounts: Record<string, number>
  thinkBlocks: number
  textBlocks: number
  callBlocks: number
  messages: number
  logEvents: number
  status: 'running' | 'complete' | 'error'
  promptKind?: RequestPromptKind
  inputTokens: number
  outputTokens: number
  cacheReadTokens: number
  timing?: GraphStepTiming
  retry?: number
  maxRetries?: number
  userText?: string
  userChars: number
  callChars: number
  systemChars: number
  toolsChars: number
  contextChars: number
  /** Material this step's own tool results contribute to the next step's prompt. */
  ownResultChars: number
  /** Running derived-history material recorded before this step opened. */
  historyChars: number
  historyKnown: boolean
  toolPreview?: GraphToolPreview
  assistantPreview?: string
}

interface MutableTurn {
  turn: number
  steps: Map<number, MutableStep>
  compactions: GraphCompactionInfo[]
  ended: boolean
  halt?: 'error' | 'stopped' | 'max_tokens'
}

const USER_PREVIEW_CHARACTERS = 60

function usageOf(value: unknown): { input: number; output: number; cacheRead: number } {
  if (typeof value !== 'object' || value === null) return { input: 0, output: 0, cacheRead: 0 }
  const usage = value as UsageLike
  return {
    input: usage.inputTokens ?? 0,
    output: usage.outputTokens ?? 0,
    cacheRead: usage.cacheReadTokens ?? 0,
  }
}

/**
 * Model-visible text of one content block.
 * @param block - Durable content block from a user, context, or tool-result node.
 * @returns the block's text, empty for blocks that carry no model-visible characters.
 */
function blockText(block: ContentBlock): string {
  if (block.type === 'text' || block.type === 'reasoning') return block.text
  if (block.type === 'tool-call') return block.arguments
  if (block.type === 'tool-result') return contentText(block.content)
  // Images and any later merge-extensible block kind: no measurable text.
  return ''
}

function contentText(blocks: readonly ContentBlock[]): string {
  return blocks.map(blockText).join('\n')
}

function assistantBlockText(block: AssistantBlock): string {
  if (block.kind === 'text' || block.kind === 'reasoning') return block.text
  if (block.kind === 'tool-call') return block.argsRaw
  // Images and `other` blocks carry no measurable text.
  return ''
}

function assistantText(node: AssistantMessageNode): string {
  return node.blocks.map(assistantBlockText).join('\n')
}

function previewOf(text: string): string {
  const compact = text.replace(/\s+/g, ' ').trim()
  return compact.length > USER_PREVIEW_CHARACTERS
    ? `${compact.slice(0, USER_PREVIEW_CHARACTERS).trimEnd()}…`
    : compact
}

function locationTurnStep(
  seq: number,
  locations: ReadonlyMap<number, ConversationLocation>,
): { turn: number; step: number } | null {
  const location = locations.get(seq)
  if (location === undefined) return null
  if (location.kind === 'step') return { turn: location.turn.turn, step: location.step.step }
  if (location.kind === 'turn') return { turn: location.turn.turn, step: 0 }
  return null
}

function countBlocks(node: AssistantMessageNode): { think: number; text: number; call: number } {
  let think = 0
  let text = 0
  let call = 0
  for (const block of node.blocks) {
    if (block.kind === 'reasoning') think += 1
    else if (block.kind === 'text') text += 1
    else if (block.kind === 'tool-call') call += 1
  }
  return { think, text, call }
}

function stepTiming(node: AssistantMessageNode): GraphStepTiming | null {
  const timing = node.timing
  if (timing === undefined) return null
  if (timing.stepStartTime === null || timing.firstTokenTime === null) return null
  return {
    ttftMs: timing.firstTokenTime - timing.stepStartTime,
    generationMs: timing.completedTime - timing.firstTokenTime,
  }
}

function ensureTurn(turns: Map<number, MutableTurn>, turn: number): MutableTurn {
  const existing = turns.get(turn)
  if (existing !== undefined) return existing
  const created: MutableTurn = { turn, steps: new Map(), compactions: [], ended: false }
  turns.set(turn, created)
  return created
}

function ensureStep(turn: MutableTurn, step: number, requestNumber: number): MutableStep {
  const existing = turn.steps.get(step)
  if (existing !== undefined) return existing
  const created: MutableStep = {
    turn: turn.turn, step, requestNumber, calls: 0, results: 0, toolErrors: 0, toolMs: 0,
    toolCounts: {}, thinkBlocks: 0, textBlocks: 0, callBlocks: 0, messages: 0, logEvents: 0,
    status: 'complete', inputTokens: 0, outputTokens: 0, cacheReadTokens: 0,
    userChars: 0, callChars: 0,
    systemChars: 0, toolsChars: 0, contextChars: 0, ownResultChars: 0,
    historyChars: 0, historyKnown: false,
  }
  turn.steps.set(step, created)
  return created
}

/**
 * Project a Trajectory snapshot into the architecture-graph index.
 * @param snapshot - Trajectory target snapshot, or `undefined` before first publish.
 * @returns a session-wide graph index.
 */
export function projectGraph(snapshot: TrajectorySnapshot | undefined): GraphSnapshot {
  return new GraphProjector().project(snapshot ?? EMPTY_TRAJECTORY)
}

/**
 * Cursor-based accumulator. Recomputes from scratch when `loadOlder` prepends.
 */
export class GraphProjector {
  private first: ConversationNode | undefined
  private snapshot: TrajectorySnapshot = EMPTY_TRAJECTORY

  /**
   * Ingest new tail events and rebuild derived request fields.
   * @param snapshot - Latest Trajectory snapshot.
   * @returns the session-wide graph index.
   */
  project(snapshot: TrajectorySnapshot): GraphSnapshot {
    const first = snapshot.eventNodes[0]
    if (first !== this.first) {
      this.first = first
    }
    this.snapshot = snapshot
    return this.build()
  }

  private build(): GraphSnapshot {
    const snapshot = this.snapshot
    const turns = new Map<number, MutableTurn>()
    const userTurns: number[] = []
    const betweenTurnCompactions: GraphBetweenTurnCompaction[] = []
    let users = 0
    let assistants = 0
    let thinkBlocks = 0
    let textBlocks = 0
    let callBlocks = 0
    let tools = 0
    let toolErrors = 0
    let retries = 0
    let compactions = 0
    let compactionNodes = 0
    let logEvents = 0
    const spans: GraphTimelineSpan[] = []

    const orderedRequests = [...snapshot.requests].sort((left, right) => left.startSeq - right.startSeq)

    for (const [index, request] of orderedRequests.entries()) {
      const number = index + 1
      if (request.purpose === 'compaction') {
        compactions += 1
        const turn = request.turn
        if (turn === null) {
          betweenTurnCompactions.push({ requestNumber: number, afterTurn: lastTurnNumber(turns) })
          continue
        }
        ensureTurn(turns, turn).compactions.push({ requestNumber: number, turn })
        continue
      }
      const acc = ensureTurn(turns, request.turn)
      const step = ensureStep(acc, request.step, number)
      step.status = request.status === 'error' ? 'error' : request.status
      if (request.promptChange !== undefined) step.promptKind = request.promptChange.kind
      if (request.retry !== undefined) step.retry = request.retry
      if (request.maxRetries !== undefined) step.maxRetries = request.maxRetries
      const usage = usageOf(request.usage)
      step.inputTokens += usage.input
      step.outputTokens += usage.output
      step.cacheReadTokens += usage.cacheRead
      const prompt = request.prompt
      if (prompt !== undefined) {
        step.systemChars = prompt.system.length
        step.toolsChars = JSON.stringify(prompt.tools).length
      }
    }

    let historyChars = 0
    for (const node of snapshot.eventNodes) {
      logEvents += 1
      const located = locationTurnStep(node.seq, snapshot.eventLocations)
      const owner = located === null || located.step === 0
        ? undefined
        : ensureStep(ensureTurn(turns, located.turn), located.step, 0)
      if (owner !== undefined) {
        owner.logEvents += 1
        if (!owner.historyKnown) {
          owner.historyChars = historyChars
          owner.historyKnown = true
        }
      }
      switch (node.kind) {
        case 'user': {
          users += 1
          const turn = located?.turn ?? 0
          userTurns.push(turn)
          if (turn > 0) ensureTurn(turns, turn)
          const text = contentText(node.content)
          historyChars += text.length
          if (owner !== undefined) {
            owner.userText = previewOf(text)
            owner.userChars += text.length
          }
          spans.push({
            id: `user-${node.seq}`, lane: 0, turn: turn === 0 ? null : turn, step: located?.step ?? 1,
            start: node.time, end: node.time,
          })
          break
        }
        case 'steering': {
          users += 1
          userTurns.push(located?.turn ?? 0)
          historyChars += contentText(node.content).length
          break
        }
        case 'context': {
          const text = contentText(node.content)
          historyChars += text.length
          if (owner !== undefined) owner.contextChars += text.length
          break
        }
        case 'assistant': {
          assistants += 1
          const blocks = countBlocks(node)
          thinkBlocks += blocks.think
          textBlocks += blocks.text
          callBlocks += blocks.call
          const acc = ensureTurn(turns, node.turn)
          const step = ensureStep(acc, node.step, 0)
          step.thinkBlocks += blocks.think
          step.textBlocks += blocks.text
          step.callBlocks += blocks.call
          step.calls += blocks.call
          step.messages += 1
          for (const block of node.blocks) {
            if (block.kind === 'tool-call') step.callChars += block.argsRaw.length
          }
          if (step.toolPreview === undefined) {
            const firstCall = node.blocks.find(block => block.kind === 'tool-call')
            if (firstCall?.kind === 'tool-call') {
              step.toolPreview = { name: firstCall.name, argsRaw: firstCall.argsRaw }
            }
          }
          if (step.assistantPreview === undefined) {
            const firstText = node.blocks.find(block =>
              block.kind === 'text' || block.kind === 'reasoning')
            if (firstText !== undefined) {
              step.assistantPreview = previewOf(firstText.text)
            }
          }
          const timing = stepTiming(node)
          if (timing !== null) step.timing = timing
          historyChars += assistantText(node).length
          if (node.interrupted === true) acc.halt = 'stopped'
          spans.push({
            id: `assistant-${node.seq}`, lane: 1, turn: node.turn, step: node.step,
            start: timing === null ? node.time : node.time - timing.ttftMs - timing.generationMs,
            end: node.time,
            ...(timing === null ? {} : { ttftMs: timing.ttftMs, generationMs: timing.generationMs }),
          })
          break
        }
        case 'tool-result': {
          tools += 1
          if (node.isError) toolErrors += 1
          const text = contentText(node.content)
          historyChars += text.length
          if (owner !== undefined) {
            owner.results += 1
            owner.ownResultChars += text.length
            if (node.isError) owner.toolErrors += 1
            if (node.callTime !== null) owner.toolMs += node.time - node.callTime
            const name = node.call?.name
            if (name !== undefined) owner.toolCounts[name] = (owner.toolCounts[name] ?? 0) + 1
          }
          spans.push({
            id: `tool-${node.seq}`, lane: 2, turn: located?.turn ?? null, step: located?.step ?? null,
            start: node.callTime ?? node.time, end: node.time, callId: node.callId,
            ...(node.isError ? { isError: true as const } : {}),
          })
          break
        }
        case 'model-retry': {
          retries += 1
          break
        }
        case 'turn-error': {
          ensureTurn(turns, node.turn).halt = 'error'
          ensureTurn(turns, node.turn).ended = true
          break
        }
        case 'turn-max-tokens': {
          ensureTurn(turns, node.turn).halt = 'max_tokens'
          ensureTurn(turns, node.turn).ended = true
          break
        }
        case 'compaction': {
          compactionNodes += 1
          break
        }
        default:
          break
      }
    }

    for (const call of snapshot.runningCalls) {
      const step = ensureStep(ensureTurn(turns, call.turn), call.step, 0)
      step.calls += 1
      step.status = 'running'
      step.toolCounts[call.name] = (step.toolCounts[call.name] ?? 0) + 1
      if (step.toolPreview === undefined) {
        step.toolPreview = { name: call.name, argsRaw: call.argsRaw }
      }
    }

    if (snapshot.partial !== null) {
      const acc = ensureTurn(turns, snapshot.partial.turn)
      const step = ensureStep(acc, snapshot.partial.step, 0)
      step.status = 'running'
    }

    let inputTokens = 0
    let outputTokens = 0
    let provider: string | undefined
    let model: string | undefined
    let requestConfig: AssistantRequestConfig | undefined
    const promptKinds: RequestPromptKind[] = []
    for (const request of orderedRequests) {
      const usage = usageOf(request.usage)
      inputTokens += usage.input
      outputTokens += usage.output
      if (request.purpose === 'assistant') {
        provider = request.provenance?.provider ?? provider
        model = request.provenance?.model ?? model
        requestConfig = request.requestConfig ?? request.prompt?.config ?? requestConfig
        if (request.promptChange !== undefined) promptKinds.push(request.promptChange.kind)
      }
    }

    const turnList: GraphTurnInfo[] = [...turns.values()]
      .sort((left, right) => left.turn - right.turn)
      .map((acc) => {
        const steps = [...acc.steps.values()]
          .filter(step => step.step > 0)
          .sort((left, right) => left.step - right.step)
        const lastStep = steps[steps.length - 1]?.step
        return {
          turn: acc.turn,
          steps: steps.map((step, index): GraphStepInfo => ({
            turn: step.turn,
            step: step.step,
            requestNumber: step.requestNumber,
            ...(step.promptKind === undefined ? {} : { promptKind: step.promptKind }),
            calls: step.calls,
            results: step.results,
            incomingResults: steps[index - 1]?.results ?? 0,
            toolErrors: step.toolErrors,
            toolMs: step.toolMs,
            toolCounts: step.toolCounts,
            thinkBlocks: step.thinkBlocks,
            textBlocks: step.textBlocks,
            callBlocks: step.callBlocks,
            messages: step.messages,
            logEvents: step.logEvents,
            isLast: step.step === lastStep,
            status: step.status,
            inputTokens: step.inputTokens,
            outputTokens: step.outputTokens,
            cacheReadTokens: step.cacheReadTokens,
            ...(step.timing === undefined ? {} : { timing: step.timing }),
            ...(step.retry === undefined ? {} : { retry: step.retry }),
            ...(step.maxRetries === undefined ? {} : { maxRetries: step.maxRetries }),
            ...(step.userText === undefined ? {} : { userText: step.userText }),
            userChars: step.userChars,
            callChars: step.callChars,
            ownResultChars: step.ownResultChars,
            ...(step.toolPreview === undefined ? {} : { toolPreview: step.toolPreview }),
            ...(step.assistantPreview === undefined ? {} : { assistantPreview: step.assistantPreview }),
            segmentChars: {
              system: step.systemChars,
              tools: step.toolsChars,
              context: step.contextChars,
              history: step.historyChars,
              results: steps[index - 1]?.ownResultChars ?? 0,
            },
          })),
          compactions: acc.compactions,
          ended: acc.ended || acc.halt !== undefined,
          ...(acc.halt === undefined ? {} : { halt: acc.halt }),
        }
      })

    const latest = turnList[turnList.length - 1]
    return {
      turns: turnList,
      latestTurn: latest === undefined ? null : latest.turn,
      spans,
      betweenTurnCompactions,
      users,
      userTurns,
      assistants,
      thinkBlocks,
      textBlocks,
      callBlocks,
      tools,
      toolErrors,
      retries,
      compactions: Math.max(compactions, compactionNodes),
      logEvents,
      inputTokens,
      outputTokens,
      ...(provider === undefined ? {} : { provider }),
      ...(model === undefined ? {} : { model }),
      ...(requestConfig === undefined ? {} : { requestConfig }),
      running: snapshot.partial !== null || snapshot.runningCalls.length > 0,
      promptKinds,
    }
  }
}

// Turns are inserted in request order, so the last key is the turn a
// standalone compaction ran after.
function lastTurnNumber(turns: ReadonlyMap<number, MutableTurn>): number | null {
  const opened = [...turns.keys()]
  return opened[opened.length - 1] ?? null
}

/**
 * Steps visible under a scope, in turn then step order.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @returns the matching steps.
 */
export function stepsInScope(snapshot: GraphSnapshot, scope: GraphScope): readonly GraphStepInfo[] {
  if (scope.kind === 'session') return snapshot.turns.flatMap(turn => turn.steps)
  if (scope.kind === 'turn') {
    const turn = snapshot.turns.find(item => item.turn === scope.turn)
    return turn === undefined ? [] : turn.steps
  }
  const turn = snapshot.turns.find(item => item.turn === scope.turn)
  const step = turn?.steps.find(item => item.step === scope.step)
  return step === undefined ? [] : [step]
}

/** Summed step readings for one scope. */
export interface GraphScopeTotals {
  readonly steps: number
  readonly calls: number
  readonly results: number
  readonly toolErrors: number
  readonly toolMs: number
  readonly toolCounts: GraphToolCounts
  readonly thinkBlocks: number
  readonly textBlocks: number
  readonly callBlocks: number
  readonly messages: number
  readonly logEvents: number
  readonly inputTokens: number
  readonly outputTokens: number
  readonly cacheReadTokens: number
  readonly ttftMs: number
  readonly generationMs: number
  /** Steps whose recorded boundaries produced a latency. */
  readonly timedSteps: number
  readonly retries: number
  readonly maxRetries: number
  readonly requestNumbers: readonly number[]
}

/**
 * Sum every step reading inside a scope.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @returns totals used by the node cards and the details drawer.
 */
export function scopeTotals(snapshot: GraphSnapshot, scope: GraphScope): GraphScopeTotals {
  const steps = stepsInScope(snapshot, scope)
  const toolCounts: Record<string, number> = {}
  const requestNumbers: number[] = []
  let calls = 0
  let results = 0
  let toolErrors = 0
  let toolMs = 0
  let thinkBlocks = 0
  let textBlocks = 0
  let callBlocks = 0
  let messages = 0
  let logEvents = 0
  let inputTokens = 0
  let outputTokens = 0
  let cacheReadTokens = 0
  let ttftMs = 0
  let generationMs = 0
  let timedSteps = 0
  let retries = 0
  let maxRetries = 0
  for (const step of steps) {
    calls += step.calls
    results += step.results
    toolErrors += step.toolErrors
    toolMs += step.toolMs
    thinkBlocks += step.thinkBlocks
    textBlocks += step.textBlocks
    callBlocks += step.callBlocks
    messages += step.messages
    logEvents += step.logEvents
    inputTokens += step.inputTokens
    outputTokens += step.outputTokens
    cacheReadTokens += step.cacheReadTokens
    if (step.timing !== undefined) {
      ttftMs += step.timing.ttftMs
      generationMs += step.timing.generationMs
      timedSteps += 1
    }
    if (step.retry !== undefined) retries += step.retry
    if (step.maxRetries !== undefined) maxRetries = Math.max(maxRetries, step.maxRetries)
    if (step.requestNumber > 0) requestNumbers.push(step.requestNumber)
    for (const [name, count] of Object.entries(step.toolCounts)) {
      toolCounts[name] = (toolCounts[name] ?? 0) + count
    }
  }
  return {
    steps: steps.length,
    calls,
    results,
    toolErrors,
    toolMs,
    toolCounts,
    thinkBlocks,
    textBlocks,
    callBlocks,
    messages,
    logEvents,
    inputTokens,
    outputTokens,
    cacheReadTokens,
    ttftMs,
    generationMs,
    timedSteps,
    retries,
    maxRetries,
    requestNumbers,
  }
}

/**
 * Edges that carried no traffic in the active scope.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @returns edge ids to dim.
 */
export function inactiveEdges(snapshot: GraphSnapshot, scope: GraphScope): ReadonlySet<GraphEdgeId> {
  const dimmed = new Set<GraphEdgeId>()
  const steps = stepsInScope(snapshot, scope)
  if (steps.length === 0) {
    return new Set<GraphEdgeId>([
      'e_in', 'e_req', 'e_llm', 'e_msg', 'e_call', 'e_gate', 'e_ws', 'e_logA', 'e_logT', 'e_derive', 'e_end',
    ])
  }
  // Tool edges dim only when no step in the scope issued a call; the previous
  // implementation looked at the last step alone, so a session or turn whose
  // final step was tool-free dimmed edges that earlier steps had traversed.
  if (!steps.some(step => step.calls > 0)) {
    dimmed.add('e_call')
    dimmed.add('e_gate')
    dimmed.add('e_ws')
    dimmed.add('e_logT')
  }
  if (scope.kind === 'step') {
    const step = steps[0]
    /* v8 ignore next -- `steps` is non-empty after the length guard. */
    if (step === undefined) return dimmed
    // Only a turn's first step is opened by a fresh user message.
    if (step.step > 1) dimmed.add('e_in')
    // A non-final step never ends the turn; a final step never re-derives.
    if (!step.isLast) dimmed.add('e_end')
    else dimmed.add('e_derive')
    return dimmed
  }
  // The log→assemble edge carries traffic only once a step re-derived history.
  if (!steps.some(step => step.step > 1)) dimmed.add('e_derive')
  // The natural-stop edge carries traffic only once a turn ended.
  const ended = scope.kind === 'session'
    ? snapshot.turns.some(turn => turn.ended)
    : snapshot.turns.find(turn => turn.turn === scope.turn)?.ended ?? false
  if (!ended) dimmed.add('e_end')
  return dimmed
}

const REQUEST_FOCUS: readonly GraphNodeId[] = [
  'input', 'assemble', 'request', 'llm', 'assistant', 'tool',
]
const CONTEXT_FOCUS: readonly GraphNodeId[] = [
  'assemble', 'log', 'request', 'llm', 'tool',
]

/**
 * Nodes that stay at full opacity in a named view mode.
 * @param mode - Named focus set.
 * @returns node ids in focus; empty means panorama (all nodes).
 */
export function focusedNodes(mode: GraphViewMode): ReadonlySet<GraphNodeId> {
  if (mode === 'panorama') return new Set()
  if (mode === 'request') return new Set(REQUEST_FOCUS)
  return new Set(CONTEXT_FOCUS)
}

/**
 * Default scope: latest turn when any turn exists, otherwise the full session.
 * @param snapshot - Session-wide index.
 * @returns the default inspection scope.
 */
export function defaultScope(snapshot: GraphSnapshot): GraphScope {
  if (snapshot.latestTurn === null) return { kind: 'session' }
  return { kind: 'turn', turn: snapshot.latestTurn }
}

/**
 * Halt recorded for the active scope, if any.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @returns the halt discriminator, or `undefined`.
 */
export function scopeHalt(
  snapshot: GraphSnapshot,
  scope: GraphScope,
): GraphTurnInfo['halt'] | undefined {
  if (scope.kind === 'session') {
    const found = snapshot.turns.find(turn => turn.halt !== undefined)
    return found?.halt
  }
  return snapshot.turns.find(turn => turn.turn === scope.turn)?.halt
}

/** One prompt-assembly bar segment with its measured share of the scope's input. */
export interface GraphAssembleSegment {
  readonly id: AssembleSegmentId
  /** Whether this source contributed new material inside the scope. */
  readonly active: boolean
  /** Input tokens attributed to this source by its measured material share. */
  readonly tokens: number
  /** Bar flex weight in whole percent; at least 1 so every source stays visible. */
  readonly weight: number
}

/**
 * Prompt-assembly bar segments for the active scope.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @returns five named segments with activity, attributed tokens, and bar weight.
 */
export function assembleSegments(
  snapshot: GraphSnapshot,
  scope: GraphScope,
): readonly GraphAssembleSegment[] {
  const steps = stepsInScope(snapshot, scope)
  const kinds = new Set(steps.flatMap(step => step.promptKind === undefined ? [] : [step.promptKind]))
  const system = kinds.has('initial') || kinds.has('system') || kinds.has('system-and-tools')
  const tools = kinds.has('initial') || kinds.has('tools') || kinds.has('system-and-tools')
  const laterStep = steps.some(step => step.step > 1)
  const laterTurn = scope.kind === 'session'
    ? snapshot.turns.some(turn => turn.turn > 1)
    : scope.turn > 1
  const chars = { system: 0, tools: 0, context: 0, history: 0, results: 0 }
  let inputTokens = 0
  for (const step of steps) {
    for (const id of ASSEMBLE_SEGMENTS) chars[id] += step.segmentChars[id]
    inputTokens += step.inputTokens
  }
  const active: Readonly<Record<AssembleSegmentId, boolean>> = {
    system,
    tools,
    context: kinds.size > 0,
    history: laterTurn || laterStep,
    // A step's own tool results reach the model through the next step's
    // assembly, so what a step admits decides this segment rather than the
    // calls the scope itself issued.
    results: steps.some(step => step.incomingResults > 0),
  }
  const total = ASSEMBLE_SEGMENTS.reduce((sum, id) => sum + chars[id], 0)
  return ASSEMBLE_SEGMENTS.map(id => ({
    id,
    active: active[id],
    tokens: total === 0 ? 0 : Math.round(inputTokens * chars[id] / total),
    weight: total === 0 ? 1 : Math.max(1, Math.round(chars[id] / total * 100)),
  }))
}

const RAIL_HEAD = 3
const RAIL_TAIL = 2
const RAIL_FOLD = 7

/**
 * Steps shown on the turn rail, folding long lists until expanded.
 * @param steps - Steps of the selected turn.
 * @param expanded - Whether the caller asked to show every step.
 * @returns visible steps and how many remain folded.
 */
export function railSteps(
  steps: readonly GraphStepInfo[],
  expanded: boolean,
): { shown: readonly GraphStepInfo[]; hidden: number } {
  if (expanded || steps.length <= RAIL_FOLD) return { shown: steps, hidden: 0 }
  const head = steps.slice(0, RAIL_HEAD)
  const tail = steps.slice(steps.length - RAIL_TAIL)
  return { shown: [...head, ...tail], hidden: steps.length - RAIL_HEAD - RAIL_TAIL }
}

/**
 * Whether a located event belongs to the active scope.
 * @param location - Trajectory location for one event seq.
 * @param scope - Active inspection scope.
 * @returns true when the event is in scope.
 */
export function locationInScope(
  location: ConversationLocation | undefined,
  scope: GraphScope,
): boolean {
  if (scope.kind === 'session') return true
  if (location === undefined) return false
  if (location.kind === 'session' || location.kind === 'unresolved') return false
  if (location.turn.turn !== scope.turn) return false
  if (scope.kind === 'turn') return true
  return location.kind === 'step' && location.step.step === scope.step
}

/**
 * Identity-stable graph index over a Trajectory target.
 * Recomputes when the target publishes a new snapshot object, including
 * `loadOlder` prepends whose first event identity changes.
 * @param target - Conversation `trajectory` target, possibly unpublished.
 * @returns a source whose snapshot is a `GraphSnapshot`.
 */
export function createGraphSource(
  target: ObservableSnapshot<TrajectorySnapshot | undefined>,
): ObservableSnapshot<GraphSnapshot> {
  const projector = new GraphProjector()
  let last: TrajectorySnapshot | undefined
  let cached: GraphSnapshot | undefined
  return {
    getSnapshot: () => {
      const traj = target.getSnapshot() ?? EMPTY_TRAJECTORY
      if (cached === undefined || traj !== last) {
        last = traj
        cached = projector.project(traj)
      }
      return cached
    },
    subscribe: listener => target.subscribe(listener),
  }
}
