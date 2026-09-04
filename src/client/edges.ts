/** Edge stroke widths recomputed from the active scope's readings. */

import {
  ASSEMBLE_SEGMENTS, scopeTotals, stepsInScope,
  type GraphScope, type GraphSnapshot,
} from './project.ts'
import { GRAPH_EDGES, type GraphEdgeId, type GraphEdgeWidth } from './topology.ts'

/**
 * What an edge's stroke width encodes. `calls` counts the times traffic crossed
 * the edge; `tokens` weighs the material it carried.
 */
export type GraphEdgeWeightMode = 'calls' | 'tokens'

/** Load per edge in one mode's own unit. */
export type GraphEdgeLoads = Readonly<Record<GraphEdgeId, number>>

/**
 * The three heavier stroke bands with the share of the scope's heaviest edge
 * each one starts at, widest first. Anything lighter takes {@link THINNEST}.
 * The topology allows only these four widths; a width outside the set would
 * break the arrowheads' fixed `userSpaceOnUse` sizing.
 */
const WIDTH_BANDS = [
  { floor: 0.75, width: 3.4 },
  { floor: 0.4, width: 2.7 },
  { floor: 0.15, width: 2 },
] as const

const THINNEST: GraphEdgeWidth = 1.5

function bandFor(load: number, heaviest: number): GraphEdgeWidth {
  const share = load <= 0 ? 0 : load / heaviest
  for (const band of WIDTH_BANDS) {
    if (share >= band.floor) return band.width
  }
  return THINNEST
}

/**
 * Traffic counts per edge under one scope.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @returns how many times each edge carried traffic.
 */
export function callLoads(snapshot: GraphSnapshot, scope: GraphScope): GraphEdgeLoads {
  const totals = scopeTotals(snapshot, scope)
  const turn = scope.kind === 'session'
    ? undefined
    : snapshot.turns.find(item => item.turn === scope.turn)
  const users = scope.kind === 'session'
    ? snapshot.users
    : snapshot.userTurns.filter(item => item === scope.turn).length
  const openedTurns = scope.kind === 'session' ? snapshot.turns.length : 1
  const ended = scope.kind === 'session'
    ? snapshot.turns.filter(item => item.ended).length
    : (turn?.ended === true ? 1 : 0)
  return {
    e_in: users,
    e_req: totals.steps,
    e_llm: totals.steps,
    e_msg: totals.messages,
    e_call: totals.calls,
    e_gate: totals.calls,
    e_ws: totals.calls,
    e_logA: totals.messages,
    e_logT: totals.results,
    // Every step past its turn's first was re-derived from the session log.
    e_derive: Math.max(0, totals.steps - openedTurns),
    e_end: ended,
  }
}

/**
 * Token volume per edge under one scope.
 *
 * Providers report one input-token total per request and never a per-source
 * split, so material measured in model-visible characters is scaled by that
 * total. Edges whose payload the projection does not measure — the control edge
 * that ends a turn — report zero and take the thinnest band.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @returns attributed tokens per edge.
 */
export function tokenLoads(snapshot: GraphSnapshot, scope: GraphScope): GraphEdgeLoads {
  const totals = scopeTotals(snapshot, scope)
  const steps = stepsInScope(snapshot, scope)
  let promptChars = 0
  let userChars = 0
  let callChars = 0
  let resultChars = 0
  let derivedChars = 0
  for (const step of steps) {
    for (const id of ASSEMBLE_SEGMENTS) promptChars += step.segmentChars[id]
    userChars += step.userChars
    callChars += step.callChars
    resultChars += step.ownResultChars
    derivedChars += step.segmentChars.history + step.segmentChars.results
  }
  const factor = promptChars === 0 ? 0 : totals.inputTokens / promptChars
  return {
    e_in: userChars * factor,
    e_req: totals.inputTokens,
    e_llm: totals.inputTokens,
    e_msg: totals.outputTokens,
    e_call: callChars * factor,
    e_gate: callChars * factor,
    e_ws: callChars * factor,
    e_logA: totals.outputTokens,
    e_logT: resultChars * factor,
    e_derive: derivedChars * factor,
    e_end: 0,
  }
}

/**
 * Stroke width per edge, banded against the scope's heaviest edge.
 *
 * A scope with no recorded traffic keeps the compile-time widths, so the graph
 * still reads as designed before the first request.
 * @param snapshot - Session-wide index.
 * @param scope - Active inspection scope.
 * @param mode - What the width encodes.
 * @returns one of the four allowed widths per edge.
 */
export function edgeWidths(
  snapshot: GraphSnapshot,
  scope: GraphScope,
  mode: GraphEdgeWeightMode,
): Readonly<Record<GraphEdgeId, GraphEdgeWidth>> {
  const loads = mode === 'calls' ? callLoads(snapshot, scope) : tokenLoads(snapshot, scope)
  const heaviest = Object.values(loads).reduce((high, load) => Math.max(high, load), 0)
  return Object.fromEntries(GRAPH_EDGES.map(spec => [
    spec.id,
    heaviest === 0 ? spec.width : bandFor(loads[spec.id], heaviest),
  ])) as Readonly<Record<GraphEdgeId, GraphEdgeWidth>>
}
