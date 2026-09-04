/** Timeline projection: domain, laid-out spans, turn ticks, and scope mapping. */

import type { GraphScope, GraphTimelineSpan } from './project.ts'

/**
 * Horizontal projection of the timeline domain, matching the Trajectory
 * timeline's equal-width and recorded-time projections.
 */
export type GraphTimelineMode = 'actual' | 'sequence'

/** Half-open interval in projected domain units. */
export interface GraphTimelineBand {
  readonly start: number
  readonly end: number
}

/** One span placed in the projected domain. */
export interface GraphPlacedSpan {
  readonly span: GraphTimelineSpan
  /** Projected domain start. */
  readonly start: number
  /** Projected domain end; always greater than `start`. */
  readonly end: number
}

/** Turn boundary tick at its first span's projected start. */
export interface GraphTurnTick {
  readonly turn: number
  readonly at: number
}

/** Everything the timeline draws for one span set under one mode. */
export interface GraphTimelineModel {
  readonly start: number
  readonly end: number
  readonly spans: readonly GraphPlacedSpan[]
  readonly turnTicks: readonly GraphTurnTick[]
}

/**
 * Place spans in the projected domain.
 *
 * `actual` keeps recorded timestamps, so idle gaps stay visible. `sequence`
 * gives every span one equal-width slot in recorded order, which is the only
 * readable projection once one operation dominates the wall clock.
 * @param spans - Projected timeline spans, in any order.
 * @param mode - Horizontal projection.
 * @returns the model, or `null` when nothing has been recorded.
 */
export function deriveGraphTimeline(
  spans: readonly GraphTimelineSpan[],
  mode: GraphTimelineMode,
): GraphTimelineModel | null {
  if (spans.length === 0) return null
  const ordered = [...spans].sort((left, right) => (
    left.start - right.start || left.id.localeCompare(right.id)
  ))
  const placed: GraphPlacedSpan[] = mode === 'sequence'
    ? ordered.map((span, index) => ({ span, start: index, end: index + 1 }))
    : ordered.map(span => ({ span, start: span.start, end: Math.max(span.end, span.start + 1) }))
  const start = placed.reduce((low, item) => Math.min(low, item.start), Number.POSITIVE_INFINITY)
  const end = placed.reduce((high, item) => Math.max(high, item.end), Number.NEGATIVE_INFINITY)
  const turnTicks: GraphTurnTick[] = []
  for (const item of placed) {
    const turn = item.span.turn
    if (turn === null || turnTicks.some(tick => tick.turn === turn)) continue
    turnTicks.push({ turn, at: item.start })
  }
  return { start, end: Math.max(end, start + 1), spans: placed, turnTicks }
}

/**
 * Whether a span belongs to the inspection scope.
 * @param span - One projected span.
 * @param scope - Active inspection scope.
 * @returns true when the scope covers it.
 */
export function spanInScope(span: GraphTimelineSpan, scope: GraphScope): boolean {
  if (scope.kind === 'session') return true
  if (span.turn !== scope.turn) return false
  if (scope.kind === 'turn') return true
  return span.step === scope.step
}

/**
 * Projected extent of the active scope, drawn as the highlight band.
 * @param model - Placed timeline model.
 * @param scope - Active inspection scope.
 * @returns the band, or `null` when the scope covers no recorded span.
 */
export function scopeBand(
  model: GraphTimelineModel,
  scope: GraphScope,
): GraphTimelineBand | null {
  const covered = model.spans.filter(item => spanInScope(item.span, scope))
  const first = covered[0]
  if (first === undefined) return null
  return {
    start: covered.reduce((low, item) => Math.min(low, item.start), first.start),
    end: covered.reduce((high, item) => Math.max(high, item.end), first.end),
  }
}

/**
 * Narrowest scope one span belongs to.
 * @param span - One projected span.
 * @returns the step it recorded, its turn, or the session when it has neither.
 */
export function spanScope(span: GraphTimelineSpan): GraphScope {
  if (span.turn === null) return { kind: 'session' }
  if (span.step === null) return { kind: 'turn', turn: span.turn }
  return { kind: 'step', turn: span.turn, step: span.step }
}

/**
 * Narrowest scope covering a brushed span set.
 *
 * One step keeps the step scope, one turn widens to the turn, and anything
 * broader — or a selection of spans no turn owns — falls back to the session.
 * @param spans - Spans the brush covered.
 * @returns the scope to apply, or `null` when the brush covered nothing.
 */
export function scopeForSpans(spans: readonly GraphTimelineSpan[]): GraphScope | null {
  const only = spans[0]
  if (only === undefined) return null
  if (spans.length === 1) return spanScope(only)
  const [turn, ...moreTurns] = new Set(spans.flatMap(span => span.turn === null ? [] : [span.turn]))
  if (turn === undefined || moreTurns.length > 0) return { kind: 'session' }
  const [step, ...moreSteps] = new Set(spans.flatMap(span => span.step === null ? [] : [span.step]))
  if (step === undefined || moreSteps.length > 0) return { kind: 'turn', turn }
  return { kind: 'step', turn, step }
}
