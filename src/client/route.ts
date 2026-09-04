/** Automatic orthogonal routing for the compile-time architecture-graph edges. */

import { nodeRect } from './layout.ts'
import {
  GRAPH_EDGES, GRAPH_NODES, type GraphEdgeId, type GraphEdgeSpec, type GraphNodeId,
  type GraphPoint, type GraphRect,
} from './topology.ts'

/** One side of a node rectangle. */
export type GraphSide = 't' | 'r' | 'b' | 'l'

/** Routed polyline plus static edge chrome. */
export interface RoutedGraphEdge {
  readonly spec: GraphEdgeSpec
  readonly points: readonly GraphPoint[]
  readonly labelAt: GraphPoint | null
  readonly labelVertical: boolean
  readonly stepAt: GraphPoint | null
}

const SIDES: readonly GraphSide[] = ['t', 'r', 'b', 'l']

const NORM: Readonly<Record<GraphSide, readonly [number, number]>> = {
  t: [0, -1],
  r: [1, 0],
  b: [0, 1],
  l: [-1, 0],
}

const DIRECTION_PENALTY = 130
const OCCUPANCY_PENALTY = 46
const COLLINEAR_CROSS = 0.5
const MIN_LABEL_LENGTH = 22
const SHORT_LABEL_LENGTH = 70

function hypot(dx: number, dy: number): number {
  return Math.hypot(dx, dy)
}

function anchorAt(rect: GraphRect, side: GraphSide, fraction: number): GraphPoint {
  if (side === 't') return { x: rect.x + rect.w * fraction, y: rect.y }
  if (side === 'b') return { x: rect.x + rect.w * fraction, y: rect.y + rect.h }
  if (side === 'l') return { x: rect.x, y: rect.y + rect.h * fraction }
  return { x: rect.x + rect.w, y: rect.y + rect.h * fraction }
}

function centre(rect: GraphRect): GraphPoint {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 }
}

function extend(point: GraphPoint, side: GraphSide, distance: number): GraphPoint {
  const normal = NORM[side]
  return { x: point.x + normal[0] * distance, y: point.y + normal[1] * distance }
}

function isVertical(side: GraphSide): boolean {
  return side === 't' || side === 'b'
}

function mergeCollinear(raw: readonly GraphPoint[]): GraphPoint[] {
  const merged: GraphPoint[] = []
  for (const [index, current] of raw.entries()) {
    const next = raw[index + 1]
    const previous = merged[merged.length - 1]
    if (next === undefined || previous === undefined) {
      merged.push(current)
      continue
    }
    const cross = (current.x - previous.x) * (next.y - previous.y)
      - (current.y - previous.y) * (next.x - previous.x)
    if (Math.abs(cross) > COLLINEAR_CROSS) merged.push(current)
  }
  return merged
}

/**
 * Build an orthogonal polyline between two side anchors.
 * @param start - Point on the source side.
 * @param fromSide - Source side.
 * @param end - Point on the target side.
 * @param toSide - Target side.
 * @returns merged orthogonal points including the anchors.
 */
export function orthogonalPath(
  start: GraphPoint,
  fromSide: GraphSide,
  end: GraphPoint,
  toSide: GraphSide,
): GraphPoint[] {
  const gap = hypot(end.x - start.x, end.y - start.y)
  const out = Math.max(9, Math.min(26, gap / 3))
  const first = extend(start, fromSide, out)
  const last = extend(end, toSide, out)
  const fromVertical = isVertical(fromSide)
  const toVertical = isVertical(toSide)
  let mid: GraphPoint[]
  if (fromVertical && toVertical) {
    const y = (first.y + last.y) / 2
    mid = [{ x: first.x, y }, { x: last.x, y }]
  } else if (!fromVertical && !toVertical) {
    const x = (first.x + last.x) / 2
    mid = [{ x, y: first.y }, { x, y: last.y }]
  } else if (fromVertical) {
    mid = [{ x: first.x, y: last.y }]
  } else {
    mid = [{ x: last.x, y: first.y }]
  }
  const raw = [start, first, ...mid, last, end].filter((point, index, points) => {
    if (index === 0) return true
    const prev = points[index - 1] as GraphPoint
    return hypot(point.x - prev.x, point.y - prev.y) > 1
  })
  return mergeCollinear(raw)
}

function longestSegment(points: readonly GraphPoint[]): {
  length: number
  start: GraphPoint
  end: GraphPoint
} {
  let best: { length: number; start: GraphPoint; end: GraphPoint } | undefined
  let prev: GraphPoint | undefined
  for (const end of points) {
    if (prev !== undefined) {
      const length = hypot(end.x - prev.x, end.y - prev.y)
      if (best === undefined || length > best.length) best = { length, start: prev, end }
    }
    prev = end
  }
  return best as { length: number; start: GraphPoint; end: GraphPoint }
}

function rectsOf(
  positions: Readonly<Record<GraphNodeId, GraphPoint>>,
): Readonly<Record<GraphNodeId, GraphRect>> {
  const rects = {} as Record<GraphNodeId, GraphRect>
  for (const spec of GRAPH_NODES) {
    rects[spec.id] = nodeRect(spec.id, positions[spec.id])
  }
  return rects
}

/**
 * Route every compile-time edge for the given node positions.
 * @param positions - Current top-left per node.
 * @returns one routed polyline per edge, in `GRAPH_EDGES` order.
 */
export function routeGraph(
  positions: Readonly<Record<GraphNodeId, GraphPoint>>,
): readonly RoutedGraphEdge[] {
  const rects = rectsOf(positions)
  const occupancy: Record<string, number> = {}
  const chosen = new Map<GraphEdgeId, { fromSide: GraphSide; toSide: GraphSide }>()
  for (const edge of GRAPH_EDGES) {
    const fromRect = rects[edge.from]
    const toRect = rects[edge.to]
    let best = { cost: Number.POSITIVE_INFINITY, fromSide: 't' as GraphSide, toSide: 't' as GraphSide }
    for (const fromSide of SIDES) {
      for (const toSide of SIDES) {
        const start = anchorAt(fromRect, fromSide, 0.5)
        const end = anchorAt(toRect, toSide, 0.5)
        const dx = end.x - start.x
        const dy = end.y - start.y
        const distance = hypot(dx, dy) || 1
        const ux = dx / distance
        const uy = dy / distance
        const fromNormal = NORM[fromSide]
        const toNormal = NORM[toSide]
        const fromPenalty = (1 - (fromNormal[0] * ux + fromNormal[1] * uy)) * DIRECTION_PENALTY
        const toPenalty = (1 - (toNormal[0] * -ux + toNormal[1] * -uy)) * DIRECTION_PENALTY
        const occupied = ((occupancy[`${edge.from}${fromSide}`] ?? 0)
          + (occupancy[`${edge.to}${toSide}`] ?? 0)) * OCCUPANCY_PENALTY
        const cost = distance + fromPenalty + toPenalty + occupied
        if (cost < best.cost) best = { cost, fromSide, toSide }
      }
    }
    chosen.set(edge.id, { fromSide: best.fromSide, toSide: best.toSide })
    occupancy[`${edge.from}${best.fromSide}`] = (occupancy[`${edge.from}${best.fromSide}`] ?? 0) + 1
    occupancy[`${edge.to}${best.toSide}`] = (occupancy[`${edge.to}${best.toSide}`] ?? 0) + 1
  }

  const assigned = Object.fromEntries(chosen) as Record<GraphEdgeId, { fromSide: GraphSide; toSide: GraphSide }>
  const buckets: Record<string, { edge: GraphEdgeSpec; end: 'from' | 'to' }[]> = {}
  for (const edge of GRAPH_EDGES) {
    const sides = assigned[edge.id]
    const fromKey = `${edge.from}|${sides.fromSide}`
    const toKey = `${edge.to}|${sides.toSide}`
    ;(buckets[fromKey] ??= []).push({ edge, end: 'from' })
    ;(buckets[toKey] ??= []).push({ edge, end: 'to' })
  }
  const fraction: Record<string, number> = {}
  for (const [key, list] of Object.entries(buckets)) {
    const side = key.split('|')[1] as GraphSide
    const axis = isVertical(side) ? 'x' : 'y'
    list.sort((left, right) => {
      const leftPeer = centre(rects[left.end === 'from' ? left.edge.to : left.edge.from])
      const rightPeer = centre(rects[right.end === 'from' ? right.edge.to : right.edge.from])
      return leftPeer[axis] - rightPeer[axis]
    })
    list.forEach((item, index) => {
      fraction[`${item.edge.id}${item.end}`] = (index + 1) / (list.length + 1)
    })
  }

  return GRAPH_EDGES.map((edge): RoutedGraphEdge => {
    const sides = assigned[edge.id]
    const start = anchorAt(rects[edge.from], sides.fromSide, fraction[`${edge.id}from`] as number)
    const end = anchorAt(rects[edge.to], sides.toSide, fraction[`${edge.id}to`] as number)
    const points = orthogonalPath(start, sides.fromSide, end, sides.toSide)
    const longest = longestSegment(points)
    const vertical = Math.abs(longest.end.x - longest.start.x) < 2
    const mid = {
      x: (longest.start.x + longest.end.x) / 2,
      y: (longest.start.y + longest.end.y) / 2,
    }
    const shortLift = longest.length < SHORT_LABEL_LENGTH ? 14 : 0
    return {
      spec: edge,
      points,
      labelAt: (edge.label ?? edge.labelKey) !== undefined && longest.length > MIN_LABEL_LENGTH
        ? {
          x: vertical ? mid.x + 12 : mid.x,
          y: vertical ? mid.y + 4 + shortLift : mid.y - 9,
        }
        : null,
      labelVertical: vertical,
      stepAt: edge.step !== undefined ? mid : null,
    }
  })
}
