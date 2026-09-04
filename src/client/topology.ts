/** Compile-time architecture-graph topology: ten nodes and eleven edges. */

/** One node in the fixed agent-loop graph. */
export type GraphNodeId =
  | 'input'
  | 'assemble'
  | 'request'
  | 'assistant'
  | 'tool'
  | 'log'
  | 'turnend'
  | 'llm'
  | 'sandbox'
  | 'workspace'

/** Visual kind used to bind a node to a semantic accent token. */
export type GraphNodeKind =
  | 'session'
  | 'core'
  | 'llm'
  | 'tools'
  | 'storage'
  | 'external'
  | 'security'

/** Locale key for a node's product title. */
export type GraphNodeTitleKey =
  | 'node.input'
  | 'node.assemble'
  | 'node.request'
  | 'node.assistant'
  | 'node.tool'
  | 'node.log'
  | 'node.turnend'
  | 'node.llm'
  | 'node.sandbox'
  | 'node.workspace'

/** Locale key for a node's kind chip. */
export type GraphNodeKindKey =
  | 'kind.session'
  | 'kind.core'
  | 'kind.llm'
  | 'kind.tools'
  | 'kind.storage'
  | 'kind.external'
  | 'kind.security'

/** Stroke width band for a static edge. */
export type GraphEdgeWidth = 1.5 | 2 | 2.7 | 3.4

/** Locale key for an edge label that reads as prose rather than an event name. */
export type GraphEdgeLabelKey = 'edge.derive' | 'edge.end'

/** One edge in the fixed agent-loop graph. */
export type GraphEdgeId =
  | 'e_in'
  | 'e_req'
  | 'e_llm'
  | 'e_msg'
  | 'e_call'
  | 'e_gate'
  | 'e_ws'
  | 'e_logA'
  | 'e_logT'
  | 'e_derive'
  | 'e_end'

/** Default canvas rectangle for one node. */
export interface GraphNodeSpec {
  readonly id: GraphNodeId
  readonly x: number
  readonly y: number
  readonly w: number
  readonly h: number
  readonly kind: GraphNodeKind
  readonly titleKey: GraphNodeTitleKey
  readonly kindKey: GraphNodeKindKey
  /** Event names or `ctx` keys, shown verbatim. */
  readonly source: string
  readonly reserved?: true
}

/** Default canvas edge. */
export interface GraphEdgeSpec {
  readonly id: GraphEdgeId
  readonly from: GraphNodeId
  readonly to: GraphNodeId
  readonly width: GraphEdgeWidth
  /** Event name shown verbatim; prose labels use {@link GraphEdgeSpec.labelKey} instead. */
  readonly label?: string
  /** Dictionary key for a prose label, resolved by the view. */
  readonly labelKey?: GraphEdgeLabelKey
  readonly step?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  readonly both?: true
  readonly dash?: true
  readonly emph?: true
}

/** Design canvas width that fit-scaling preserves. */
export const GRAPH_CANVAS_WIDTH = 1240

/** Design canvas height that fit-scaling preserves. */
export const GRAPH_CANVAS_HEIGHT = 760

/** Drag snap in canvas pixels. */
export const GRAPH_SNAP_GRID = 10

/** Canvas point in design pixels. */
export interface GraphPoint {
  readonly x: number
  readonly y: number
}

/** Axis-aligned rectangle in design pixels. */
export interface GraphRect {
  readonly x: number
  readonly y: number
  readonly w: number
  readonly h: number
}

/** Node specs in paint order; ids and geometry are compile-time constants. */
export const GRAPH_NODES: readonly GraphNodeSpec[] = [
  {
    id: 'input', x: 365, y: 36, w: 270, h: 104,
    kind: 'session', titleKey: 'node.input', kindKey: 'kind.session',
    source: 'agent/pre-step → step/start → user/message',
  },
  {
    id: 'assemble', x: 290, y: 178, w: 420, h: 124,
    kind: 'core', titleKey: 'node.assemble', kindKey: 'kind.core',
    source: 'system-prompt/assemble',
  },
  {
    id: 'request', x: 365, y: 348, w: 270, h: 104,
    kind: 'llm', titleKey: 'node.request', kindKey: 'kind.llm',
    source: 'agent/request → llm/stream',
  },
  {
    id: 'assistant', x: 365, y: 490, w: 270, h: 98,
    kind: 'session', titleKey: 'node.assistant', kindKey: 'kind.session',
    source: 'assistant/chunk* → assistant/message',
  },
  {
    id: 'tool', x: 365, y: 626, w: 270, h: 98,
    kind: 'tools', titleKey: 'node.tool', kindKey: 'kind.tools',
    source: 'tool/call → pre → execute → post → tool/result',
  },
  {
    id: 'log', x: 40, y: 348, w: 200, h: 104,
    kind: 'storage', titleKey: 'node.log', kindKey: 'kind.storage',
    source: 'ctx.sessions · append-only',
  },
  {
    id: 'turnend', x: 940, y: 486, w: 250, h: 98,
    kind: 'core', titleKey: 'node.turnend', kindKey: 'kind.core',
    source: 'agent/turn-stopping → turn/end',
  },
  {
    id: 'llm', x: 940, y: 342, w: 250, h: 118,
    kind: 'external', titleKey: 'node.llm', kindKey: 'kind.external',
    source: 'api.deepseek.com',
  },
  {
    id: 'sandbox', x: 740, y: 626, w: 170, h: 98,
    kind: 'security', titleKey: 'node.sandbox', kindKey: 'kind.security',
    source: 'ctx.sandbox', reserved: true,
  },
  {
    id: 'workspace', x: 940, y: 626, w: 250, h: 98,
    kind: 'external', titleKey: 'node.workspace', kindKey: 'kind.external',
    source: 'ctx.fs · ctx.shell',
  },
]

/** Edge specs in greedy routing order; ids and endpoints are compile-time constants. */
export const GRAPH_EDGES: readonly GraphEdgeSpec[] = [
  { id: 'e_in', from: 'input', to: 'assemble', width: 2, step: 1, label: 'user/message' },
  { id: 'e_req', from: 'assemble', to: 'request', width: 2.7, step: 2, label: 'agent/request' },
  { id: 'e_llm', from: 'request', to: 'llm', width: 2.7, step: 3, both: true, label: 'llm/stream' },
  { id: 'e_msg', from: 'request', to: 'assistant', width: 2.7, step: 4, label: 'assistant/chunk*' },
  { id: 'e_call', from: 'assistant', to: 'tool', width: 2.7, step: 5, label: 'tool/call' },
  { id: 'e_gate', from: 'tool', to: 'sandbox', width: 2, label: 'tools/pre-execute' },
  { id: 'e_ws', from: 'sandbox', to: 'workspace', width: 2, dash: true },
  { id: 'e_logA', from: 'assistant', to: 'log', width: 2, label: 'assistant/message' },
  { id: 'e_logT', from: 'tool', to: 'log', width: 2.7, step: 6, label: 'tool/result' },
  {
    id: 'e_derive', from: 'log', to: 'assemble', width: 3.4, step: 7, emph: true,
    labelKey: 'edge.derive',
  },
  { id: 'e_end', from: 'assistant', to: 'turnend', width: 2, dash: true, labelKey: 'edge.end' },
]

/** Node specs keyed by id. */
export const GRAPH_NODE_BY_ID: Readonly<Record<GraphNodeId, GraphNodeSpec>> = Object.fromEntries(
  GRAPH_NODES.map(node => [node.id, node]),
) as Readonly<Record<GraphNodeId, GraphNodeSpec>>

/** Default top-left positions keyed by id. */
export const GRAPH_DEFAULT_POSITIONS: Readonly<Record<GraphNodeId, GraphPoint>> = Object.fromEntries(
  GRAPH_NODES.map(node => [node.id, { x: node.x, y: node.y }]),
) as Readonly<Record<GraphNodeId, GraphPoint>>
