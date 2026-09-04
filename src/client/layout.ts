/** Canvas fit, snap, overlap, and rectangle helpers for the architecture graph. */

import {
  GRAPH_CANVAS_HEIGHT, GRAPH_CANVAS_WIDTH, GRAPH_DEFAULT_POSITIONS, GRAPH_NODE_BY_ID,
  GRAPH_NODES, GRAPH_SNAP_GRID, type GraphNodeId, type GraphPoint, type GraphRect,
} from './topology.ts'

/** Uniform scale and pre-scale translation that fit the design canvas. */
export interface GraphCanvasFit {
  readonly scale: number
  readonly offsetX: number
  readonly offsetY: number
}

/**
 * Snap a scalar onto the drag grid.
 * @param value - Unsnapped canvas coordinate.
 * @returns the nearest grid multiple.
 */
export function snapToGrid(value: number): number {
  return Math.round(value / GRAPH_SNAP_GRID) * GRAPH_SNAP_GRID
}

/**
 * Snap a point onto the drag grid.
 * @param point - Unsnapped canvas point.
 * @returns a new snapped point.
 */
export function snapPoint(point: GraphPoint): GraphPoint {
  return { x: snapToGrid(point.x), y: snapToGrid(point.y) }
}

/**
 * Clone of the compile-time default top-lefts.
 * @returns a mutable position map independent of `GRAPH_DEFAULT_POSITIONS`.
 */
export function cloneDefaultPositions(): Record<GraphNodeId, GraphPoint> {
  return Object.fromEntries(
    GRAPH_NODES.map(node => [node.id, { x: node.x, y: node.y }]),
  ) as Record<GraphNodeId, GraphPoint>
}

/**
 * Rectangle occupied by a node at a given top-left.
 * @param id - Node id.
 * @param position - Current top-left.
 * @returns the node's axis-aligned rectangle.
 */
export function nodeRect(id: GraphNodeId, position: GraphPoint): GraphRect {
  const spec = GRAPH_NODE_BY_ID[id]
  return { x: position.x, y: position.y, w: spec.w, h: spec.h }
}

/**
 * Whether two axis-aligned rectangles share interior or boundary area.
 * @param left - First rectangle.
 * @param right - Second rectangle.
 * @returns true when the rectangles overlap.
 */
export function rectsOverlap(left: GraphRect, right: GraphRect): boolean {
  return left.x < right.x + right.w
    && right.x < left.x + left.w
    && left.y < right.y + right.h
    && right.y < left.y + left.h
}

/**
 * Default-layout overlap pairs.
 * @param positions - Top-left per node.
 * @returns every overlapping node-id pair, each listed once with id order.
 */
export function overlappingNodePairs(
  positions: Readonly<Record<GraphNodeId, GraphPoint>>,
): readonly (readonly [GraphNodeId, GraphNodeId])[] {
  const pairs: (readonly [GraphNodeId, GraphNodeId])[] = []
  for (const [index, left] of GRAPH_NODES.entries()) {
    for (const right of GRAPH_NODES.slice(index + 1)) {
      if (rectsOverlap(nodeRect(left.id, positions[left.id]), nodeRect(right.id, positions[right.id]))) {
        pairs.push([left.id, right.id])
      }
    }
  }
  return pairs
}

/**
 * Whether any node position differs from the compile-time default.
 * @param positions - Current top-lefts.
 * @returns true when the user has moved at least one node.
 */
export function hasCustomLayout(
  positions: Readonly<Record<GraphNodeId, GraphPoint>>,
): boolean {
  return GRAPH_NODES.some((node) => {
    const placed = positions[node.id]
    const origin = GRAPH_DEFAULT_POSITIONS[node.id]
    return placed.x !== origin.x || placed.y !== origin.y
  })
}

/**
 * Uniform scale that keeps the design canvas undistorted inside a viewport.
 * @param clientWidth - Viewport width in CSS pixels.
 * @param clientHeight - Viewport height in CSS pixels.
 * @returns scale in `[0.5, 1]` and the translate applied before scaling.
 */
export function computeCanvasFit(clientWidth: number, clientHeight: number): GraphCanvasFit {
  const scale = clientWidth <= 0
    ? 1
    : Math.max(0.5, Math.min(1, (clientWidth - 32) / GRAPH_CANVAS_WIDTH))
  const pad = clientHeight <= 0
    ? 12
    : Math.max(12, (clientHeight - GRAPH_CANVAS_HEIGHT * scale) / 2)
  return {
    scale,
    offsetX: 16 / scale,
    offsetY: pad / scale,
  }
}

/**
 * Fit from a canvas element's current CSS box, or the empty-viewport fit.
 * @param element - The scrolling canvas, or `null` before the ref attaches.
 * @returns the same values `computeCanvasFit` would produce for that box.
 */
export function fitFromElement(element: HTMLElement | null): GraphCanvasFit {
  if (element === null) return computeCanvasFit(0, 0)
  return computeCanvasFit(element.clientWidth, element.clientHeight)
}

/**
 * Whether an orthogonal segment enters a rectangle's open interior.
 * Endpoints that sit on the border do not count as interior.
 * @param start - Segment start.
 * @param end - Segment end (sharing start's x or y).
 * @param rect - Node rectangle.
 * @returns true when the open segment crosses the open rectangle.
 */
export function orthogonalSegmentEntersInterior(
  start: GraphPoint,
  end: GraphPoint,
  rect: GraphRect,
): boolean {
  const epsilon = 0.5
  const left = rect.x
  const right = rect.x + rect.w
  const top = rect.y
  const bottom = rect.y + rect.h
  if (Math.abs(start.y - end.y) <= epsilon) {
    if (start.y <= top + epsilon || start.y >= bottom - epsilon) return false
    const minX = Math.min(start.x, end.x)
    const maxX = Math.max(start.x, end.x)
    return maxX > left + epsilon && minX < right - epsilon
  }
  if (start.x <= left + epsilon || start.x >= right - epsilon) return false
  const minY = Math.min(start.y, end.y)
  const maxY = Math.max(start.y, end.y)
  return maxY > top + epsilon && minY < bottom - epsilon
}

/**
 * Whether a polyline's interior crosses a node rectangle.
 * @param points - Orthogonal polyline, including border anchors.
 * @param rect - Endpoint node rectangle.
 * @returns true when some segment enters the open rectangle.
 */
export function polylineEntersRectInterior(
  points: readonly GraphPoint[],
  rect: GraphRect,
): boolean {
  const [first, ...rest] = points
  if (first === undefined) return false
  let start = first
  for (const end of rest) {
    if (orthogonalSegmentEntersInterior(start, end, rect)) return true
    start = end
  }
  return false
}
