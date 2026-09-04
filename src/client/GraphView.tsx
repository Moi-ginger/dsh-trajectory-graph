/** Architecture-graph conversation view: ten node buttons and eleven routed edges. */

import type { ObservableSnapshot, SnapshotStore } from '@deepseek-ai/dsh-client-store'
import type { ConvViewProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { InjectFace, PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-trajectory/client'
import {
  useCallback, useEffect, useId, useMemo, useRef, useState,
  type PointerEvent as ReactPointerEvent, type ReactNode,
} from 'react'
import css from './GraphView.module.css'
import { cardReadings, type GraphCardReading } from './cards.ts'
import { edgeWidths, type GraphEdgeWeightMode } from './edges.ts'
import { compactTokens } from './format.ts'
import { GraphDrawer } from './GraphDrawer.tsx'
import { GraphRail } from './GraphRail.tsx'
import { GraphTimeline } from './GraphTimeline.tsx'
import { drawerGroups } from './inspect.ts'
import {
  cloneDefaultPositions, fitFromElement, hasCustomLayout, snapPoint,
} from './layout.ts'
import {
  assembleSegments, defaultScope, focusedNodes, inactiveEdges, stepsInScope,
  type GraphAssembleSegment, type GraphScope, type GraphSnapshot, type GraphViewMode,
} from './project.ts'
import { routeGraph, type RoutedGraphEdge } from './route.ts'
import {
  GRAPH_CANVAS_HEIGHT, GRAPH_CANVAS_WIDTH, GRAPH_EDGES,
  GRAPH_NODE_BY_ID, GRAPH_NODES,
  type GraphEdgeId, type GraphEdgeSpec, type GraphEdgeWidth, type GraphNodeId, type GraphNodeSpec,
  type GraphPoint,
} from './topology.ts'

/** Session-bound controls not already supplied by the conversation view slot. */
export interface GraphViewInjected {
  hooks: {
    /** Projected architecture-graph index for this Session. */
    graph: ObservableSnapshot<GraphSnapshot>
    /** User-wide persisted node positions. */
    layout: SnapshotStore<Record<GraphNodeId, GraphPoint>>
  }
  /**
   * Replace the persisted node positions.
   * @param positions - Next top-lefts keyed by node id.
   */
  setLayout: (positions: Readonly<Record<GraphNodeId, GraphPoint>>) => void
  /** Restore compile-time node placement. */
  resetLayout: () => void
  /**
   * Load one earlier history page into this Session.
   * @returns whether the Trajectory target gained earlier events.
   */
  loadOlder: () => Promise<boolean>
}

/** Conversation-view slot props consumed by the architecture-graph tab. */
export type GraphViewProps = ConvViewProps & PropsLocale<'graph'> & InjectFace<GraphViewInjected>

interface NodeDrag {
  readonly id: GraphNodeId
  readonly origin: GraphPoint
  readonly pointerId: number
  readonly pointerX: number
  readonly pointerY: number
  moved: boolean
}

const SEG_KEYS = {
  system: 'seg.system',
  tools: 'seg.tools',
  context: 'seg.context',
  history: 'seg.history',
  results: 'seg.results',
} as const

/** Locale-bound per-source labels for the assembly name row, in bar order. */
function segmentParts(
  segments: readonly GraphAssembleSegment[],
  t: GraphViewProps['t'],
): string[] {
  return segments.map(segment => t('seg.item', {
    name: t(SEG_KEYS[segment.id]),
    tokens: compactTokens(segment.tokens, t),
  }))
}

/**
 * Name row and proportional colour bar for the prompt-assembly card. A source
 * that contributed new material in the scope keeps its colour at full strength;
 * the rest stay dimmed, so the card reads as "what changed this step".
 * @param props - Projected segments and the graph translator.
 * @returns the two-row assembly readout.
 */
function AssembleBar({
  segments, t,
}: {
  segments: readonly GraphAssembleSegment[]
  t: GraphViewProps['t']
}): ReactNode {
  const parts = segmentParts(segments, t)
  return (
    <>
      <span className={css.segs} aria-hidden="true">
        {segments.map((segment, index) => (
          <span
            key={segment.id}
            className={segment.active ? css.segOn : css.segOff}
            data-seg={segment.id}
          >
            <i className={css.segSwatch} />
            {parts[index]}
          </span>
        ))}
      </span>
      <span className={css.segBar} aria-hidden="true">
        {segments.map(segment => (
          <i
            key={segment.id}
            className={segment.active ? css.segFillOn : css.segFill}
            data-seg={segment.id}
            style={{ flex: segment.weight }}
          />
        ))}
      </span>
    </>
  )
}

function pathD(points: readonly GraphPoint[]): string {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${Math.round(point.x)},${Math.round(point.y)}`)
    .join(' ')
}

function edgeLabel(
  spec: GraphEdgeSpec,
  t: GraphViewProps['t'],
  calls: number,
  results: number,
): string | undefined {
  const base = spec.labelKey === undefined ? spec.label : t(spec.labelKey)
  if (spec.id === 'e_call' && calls > 0) return `${base} ×${calls}`
  if (spec.id === 'e_logT' && results > 0) return `${base} ×${results}`
  return base
}

function GraphWires({
  routed, arrowId, arrowEmphId, dimmed, labels, widths,
}: {
  routed: readonly RoutedGraphEdge[]
  arrowId: string
  arrowEmphId: string
  dimmed: ReadonlySet<string>
  labels: Readonly<Partial<Record<string, string>>>
  widths: Readonly<Record<GraphEdgeId, GraphEdgeWidth>>
}): ReactNode {
  return (
    <svg
      className={css.wires}
      aria-hidden="true"
      viewBox={`0 0 ${GRAPH_CANVAS_WIDTH} ${GRAPH_CANVAS_HEIGHT}`}
      width={GRAPH_CANVAS_WIDTH}
      height={GRAPH_CANVAS_HEIGHT}
    >
      <defs>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX={8.5}
          refY={5}
          markerUnits="userSpaceOnUse"
          markerWidth={12}
          markerHeight={12}
          orient="auto-start-reverse"
        >
          <path d="M0,0.6 L9.4,5 L0,9.4 z" className={css.head} />
        </marker>
        <marker
          id={arrowEmphId}
          viewBox="0 0 10 10"
          refX={8.5}
          refY={5}
          markerUnits="userSpaceOnUse"
          markerWidth={12}
          markerHeight={12}
          orient="auto-start-reverse"
        >
          <path d="M0,0.6 L9.4,5 L0,9.4 z" className={css.headEmph} />
        </marker>
      </defs>
      {routed.map((edge) => {
        const marker = edge.spec.emph ? arrowEmphId : arrowId
        const wireClass = [
          css.wire,
          edge.spec.emph === true ? css.wireEmph : '',
          edge.spec.dash === true ? css.wireDash : '',
          dimmed.has(edge.spec.id) ? css.wireDim : '',
        ].filter(part => part !== '').join(' ')
        return (
          <g key={edge.spec.id}>
            <path
              d={pathD(edge.points)}
              className={wireClass}
              strokeWidth={widths[edge.spec.id]}
              markerEnd={`url(#${marker})`}
              markerStart={edge.spec.both === true ? `url(#${marker})` : undefined}
            />
            {!dimmed.has(edge.spec.id) && (
              <path
                d={pathD(edge.points)}
                className={edge.spec.emph === true ? css.flowEmph : css.flow}
                strokeWidth={widths[edge.spec.id]}
              />
            )}
            {edge.labelAt !== null && (
              <text
                className={edge.spec.emph === true ? `${css.tip} ${css.tipEmph}` : css.tip}
                x={Math.round(edge.labelAt.x)}
                y={Math.round(edge.labelAt.y)}
                textAnchor={edge.labelVertical ? 'start' : 'middle'}
              >
                {labels[edge.spec.id]}
              </text>
            )}
            {edge.stepAt !== null && (
              <g className={css.step}>
                <circle cx={Math.round(edge.stepAt.x)} cy={Math.round(edge.stepAt.y)} r={9} />
                <text x={Math.round(edge.stepAt.x)} y={Math.round(edge.stepAt.y) + 3.4}>
                  {edge.spec.step}
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/**
 * Whether a card reading has text to render.
 * @param value - One reading field.
 * @returns true when the scope produced a reading for it.
 */
function isSet(value: string | undefined): value is string {
  return value !== undefined && value !== ''
}

/**
 * Accessible name for one node button. The card's computed readings are folded
 * into the label so a screen reader hears the live values, not only the title.
 * @param spec - Compile-time node identity.
 * @param reading - Scope readings for the node.
 * @param segments - Prompt-assembly segments, for the assemble card.
 * @param t - Graph translator.
 * @returns the full accessible label.
 */
function nodeAriaLabel(
  spec: GraphNodeSpec,
  reading: GraphCardReading,
  segments: readonly GraphAssembleSegment[],
  t: GraphViewProps['t'],
): string {
  const parts = [t('node.aria', { title: t(spec.titleKey), source: spec.source })]
  for (const value of [reading.badge, reading.flag, reading.flagBad]) {
    if (isSet(value)) parts.push(value)
  }
  if (spec.id === 'assemble') {
    parts.push(t('seg.aria', { parts: segmentParts(segments, t).join(' · ') }))
  }
  for (const value of [reading.meta, reading.last]) {
    if (isSet(value)) parts.push(value)
  }
  return parts.join(' · ')
}

function mergePositions(
  stored: Readonly<Partial<Record<GraphNodeId, GraphPoint>>>,
): Record<GraphNodeId, GraphPoint> {
  const merged = cloneDefaultPositions()
  for (const spec of GRAPH_NODES) {
    const point = stored[spec.id]
    if (point !== undefined) merged[spec.id] = point
  }
  return merged
}

function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Conversation view for the architecture-graph tab.
 * @param props - session-scoped conversation view shares plus graph inject hooks.
 * @returns a region containing the turn rail, timeline, graph, and details drawer.
 */
export function GraphView({
  t, useGraph, useLayout, useSession, useTrajectory, openView, setLayout, resetLayout, loadOlder,
}: GraphViewProps): ReactNode {
  const snapshot = useGraph(value => value)
  const stored = useLayout(value => value)
  const trajectory = useTrajectory(value => value)
  const hasEarlier = useSession(value => value.hasMore)
  const loadingEarlier = useSession(value => value.loadingOlder)
  const positions = useMemo(() => mergePositions(stored), [stored])
  const [scopeChoice, setScopeChoice] = useState<GraphScope | null>(null)
  const scope = scopeChoice ?? defaultScope(snapshot)
  // A user-driven scope change stops an in-flight replay so the two cannot
  // fight over the selected step; the replay's own ticks call setScopeChoice.
  const selectScope = useCallback((next: GraphScope) => {
    setReplaying(false)
    setScopeChoice(next)
  }, [])
  const [selected, setSelected] = useState<GraphNodeId | null>(null)
  const [mode, setMode] = useState<GraphViewMode>('panorama')
  const [weight, setWeight] = useState<GraphEdgeWeightMode>('calls')
  const [expanded, setExpanded] = useState(false)
  const [replaying, setReplaying] = useState(false)
  const [fit, setFit] = useState(() => fitFromElement(null))
  const [draggingId, setDraggingId] = useState<GraphNodeId | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef(fit.scale)
  scaleRef.current = fit.scale
  const dragRef = useRef<NodeDrag | null>(null)
  const snapshotRef = useRef(snapshot)
  snapshotRef.current = snapshot
  const scopeRef = useRef(scope)
  scopeRef.current = scope
  const replayIndex = useRef(0)
  const uid = useId().replace(/:/g, '')
  const arrowId = `graph-arrow-${uid}`
  const arrowEmphId = `graph-arrow-emph-${uid}`
  const readings = useMemo(() => cardReadings(snapshot, scope, t), [snapshot, scope, t])
  const dimmed = useMemo(() => inactiveEdges(snapshot, scope), [snapshot, scope])
  const focus = useMemo(() => focusedNodes(mode), [mode])
  const segments = useMemo(() => assembleSegments(snapshot, scope), [snapshot, scope])
  const scopedSteps = useMemo(() => stepsInScope(snapshot, scope), [snapshot, scope])
  const calls = scopedSteps.reduce((sum, step) => sum + step.calls, 0)
  const results = scopedSteps.reduce((sum, step) => sum + step.results, 0)
  const routed = useMemo(() => routeGraph(positions), [positions])
  const widths = useMemo(() => edgeWidths(snapshot, scope, weight), [snapshot, scope, weight])
  const labels = useMemo(() => {
    const next: Partial<Record<string, string>> = {}
    for (const spec of GRAPH_EDGES) {
      const label = edgeLabel(spec, t, calls, results)
      if (label !== undefined) next[spec.id] = label
    }
    return next
  }, [calls, results, t])
  const custom = hasCustomLayout(positions)
  const groups = selected === null ? [] : drawerGroups(selected, snapshot, trajectory, scope, t)

  const applyFit = useCallback(() => {
    setFit(fitFromElement(canvasRef.current))
  }, [])

  useEffect(() => {
    applyFit()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(applyFit)
    observer.observe(canvasRef.current as HTMLDivElement)
    return () => { observer.disconnect() }
  }, [applyFit])

  useEffect(() => {
    if (!replaying) return
    const current = snapshotRef.current
    const currentScope = scopeRef.current
    const turnNo = currentScope.kind === 'session' ? current.latestTurn : currentScope.turn
    const steps = current.turns.find(turn => turn.turn === turnNo)?.steps ?? []
    if (steps.length === 0) {
      setReplaying(false)
      return
    }
    const reduced = prefersReducedMotion()
    const applyIndex = (index: number): boolean => {
      const step = steps[index]
      if (step === undefined) return false
      setScopeChoice({ kind: 'step', turn: step.turn, step: step.step })
      replayIndex.current = index
      return true
    }
    applyIndex(0)
    if (reduced) {
      setReplaying(false)
      return
    }
    const timer = window.setInterval(() => {
      const next = replayIndex.current + 1
      if (!applyIndex(next)) {
        window.clearInterval(timer)
        setReplaying(false)
      }
    }, 800)
    return () => { window.clearInterval(timer) }
  }, [replaying])

  const onNodePointerDown = (id: GraphNodeId, event: ReactPointerEvent<HTMLButtonElement>): void => {
    if (event.button !== 0) return
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    dragRef.current = {
      id,
      origin: positions[id],
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      moved: false,
    }
    setDraggingId(id)
  }

  const onNodePointerMove = (event: ReactPointerEvent<HTMLButtonElement>): void => {
    const drag = dragRef.current
    if (drag === null || drag.pointerId !== event.pointerId) return
    const dx = (event.clientX - drag.pointerX) / scaleRef.current
    const dy = (event.clientY - drag.pointerY) / scaleRef.current
    if (!drag.moved && Math.hypot(dx, dy) < 4) return
    drag.moved = true
    setLayout({
      ...positions,
      [drag.id]: snapPoint({ x: drag.origin.x + dx, y: drag.origin.y + dy }),
    })
  }

  const onNodePointerUp = (event: ReactPointerEvent<HTMLButtonElement>): void => {
    const drag = dragRef.current
    if (drag === null || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    setDraggingId(null)
    if (drag.moved) return
    setSelected(current => current === drag.id ? null : drag.id)
  }

  const openTrajectory = (callId: string): void => {
    openView('trajectory', callId)
  }

  return (
    <div className={css.root} role="region" aria-label={t('view.graph')}>
      <div className={css.toolbar}>
        <div className={css.modes} role="group">
          {([
            ['panorama', 'mode.panorama'],
            ['request', 'mode.request'],
            ['context', 'mode.context'],
          ] as const).map(([id, key]) => (
            <button
              key={id}
              type="button"
              className={css.mode}
              aria-pressed={mode === id}
              onClick={() => { setMode(id) }}
            >
              {t(key)}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={css.mode}
          aria-pressed={replaying}
          onClick={() => { setReplaying(value => !value) }}
        >
          {t('replay.label')}
        </button>
        {custom && (
          <button type="button" className={css.reset} onClick={() => { resetLayout() }}>
            {t('layout.reset')}
          </button>
        )}
        <span className={css.spacer} />
        <span className={css.note}>{t('toolbar.weight')}</span>
        <div className={css.modes} role="group">
          {([['calls', 'weight.calls'], ['tokens', 'weight.tokens']] as const).map(([id, key]) => (
            <button
              key={id}
              type="button"
              className={css.mode}
              aria-pressed={weight === id}
              onClick={() => { setWeight(id) }}
            >
              {t(key)}
            </button>
          ))}
        </div>
      </div>
      <GraphTimeline
        spans={snapshot.spans}
        scope={scope}
        onScope={selectScope}
        hasEarlier={hasEarlier}
        onLoadEarlier={() => { void loadOlder() }}
        loadingEarlier={loadingEarlier}
        t={t}
      />
      <div className={css.body}>
        <GraphRail
          snapshot={snapshot}
          scope={scope}
          expanded={expanded}
          onScope={selectScope}
          onExpand={() => { setExpanded(true) }}
          t={t}
        />
        <div ref={canvasRef} className={css.canvas}>
          <div
            className={css.scaler}
            style={{
              transform: `scale(${fit.scale}) translate(${fit.offsetX}px, ${fit.offsetY}px)`,
              width: GRAPH_CANVAS_WIDTH * fit.scale,
              height: GRAPH_CANVAS_HEIGHT * fit.scale + fit.offsetY * fit.scale * 2,
            }}
          >
            <div
              className={css.stage}
              style={{ width: GRAPH_CANVAS_WIDTH, height: GRAPH_CANVAS_HEIGHT }}
            >
              <GraphWires
                routed={routed}
                arrowId={arrowId}
                arrowEmphId={arrowEmphId}
                dimmed={dimmed}
                labels={labels}
                widths={widths}
              />
              {GRAPH_NODES.map((spec) => {
                const position = positions[spec.id]
                const faded = focus.size > 0 && !focus.has(spec.id)
                const nodeClass = [
                  css.node,
                  spec.reserved === true ? css.reserved : '',
                  draggingId === spec.id ? css.nodeDragging : '',
                  faded ? css.nodeFaded : '',
                ].filter(part => part !== '').join(' ')
                const reading: GraphCardReading = readings[spec.id] ?? {}
                return (
                  <button
                    key={spec.id}
                    type="button"
                    className={nodeClass}
                    data-kind={spec.kind}
                    data-node={spec.id}
                    aria-pressed={selected === spec.id}
                    aria-label={nodeAriaLabel(spec, reading, segments, t)}
                    style={{
                      left: position.x,
                      top: position.y,
                      width: spec.w,
                      height: spec.h,
                    }}
                    onPointerDown={(event) => { onNodePointerDown(spec.id, event) }}
                    onPointerMove={onNodePointerMove}
                    onPointerUp={onNodePointerUp}
                    onPointerCancel={onNodePointerUp}
                  >
                    <span className={css.headRow}>
                      <span className={css.dot} aria-hidden="true" />
                      <span className={css.title}>{t(spec.titleKey)}</span>
                      <span className={css.kind} aria-hidden="true">{t(spec.kindKey)}</span>
                      {isSet(reading.flag) && <span className={css.flag}>{reading.flag}</span>}
                      {isSet(reading.flagBad) && <span className={css.flagBad}>{reading.flagBad}</span>}
                      {isSet(reading.badge) && <span className={css.badge}>{reading.badge}</span>}
                    </span>
                    <span className={css.source}>{spec.source}</span>
                    {spec.id === 'assemble' && (
                      <AssembleBar segments={segments} t={t} />
                    )}
                    {isSet(reading.meta) && <span className={css.meta}>{reading.meta}</span>}
                    {isSet(reading.last) && <span className={css.last}>{reading.last}</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        {selected !== null && (
          <GraphDrawer
            title={t(GRAPH_NODE_BY_ID[selected].titleKey)}
            groups={groups}
            onClose={() => { setSelected(null) }}
            onOpen={openTrajectory}
            t={t}
          />
        )}
      </div>
    </div>
  )
}
