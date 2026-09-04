/** Plugin-scoped persisted node positions for the architecture graph. */

import { createSnapshotStore, type SnapshotStore } from '@deepseek-ai/dsh-client-store'
import { cloneDefaultPositions } from './layout.ts'
import type { GraphNodeId, GraphPoint } from './topology.ts'

/** localStorage key for the user-wide graph layout overlay. */
export const GRAPH_LAYOUT_PERSIST = 'dsh.graph.layout'

/**
 * Create the browser-wide architecture-graph layout source.
 * Positions persist per user, not per session.
 * @returns a persisted source shared by every session view in one plugin lifecycle.
 */
export function createGraphLayoutStore(): SnapshotStore<Record<GraphNodeId, GraphPoint>> {
  return createSnapshotStore(cloneDefaultPositions(), {
    persist: { name: GRAPH_LAYOUT_PERSIST },
  })
}
