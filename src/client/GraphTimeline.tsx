/**
 * Three-lane timeline over the graph's spans. Gestures follow the Trajectory
 * timeline: left-drag brushes a range, the wheel zooms around the pointer,
 * right-drag pans a zoomed viewport, and double-click or Escape resets it.
 */

import {
  useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode,
} from 'react'
import { Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './GraphView.module.css'
import { clockTime, durationMillis, type GraphTranslate } from './format.ts'
import type { GraphScope, GraphTimelineSpan } from './project.ts'
import {
  deriveGraphTimeline, scopeBand, scopeForSpans, spanInScope, spanScope,
  type GraphTimelineBand, type GraphTimelineMode,
} from './timeline.ts'

const MINIMUM_DRAG_PX = 3
const MINIMUM_ZOOM_OPERATIONS = 4
const MINIMUM_ZOOM_MS = 20
const TIMELINE_TOOLTIP_DELAY_MS = 500
const ZOOM_RATE = 0.0015
const EDGE_PAN_ZONE_FRACTION = 0.08
const EDGE_PAN_STEP_FRACTION = 0.025
const MAXIMUM_EDGE_PAN_PX = 32

type LaneKey = 'column.input' | 'column.model' | 'column.tools'

function laneKey(lane: 0 | 1 | 2): LaneKey {
  if (lane === 0) return 'column.input'
  if (lane === 1) return 'column.model'
  return 'column.tools'
}

/** Props for the architecture-graph timeline. */
export interface GraphTimelineProps {
  readonly spans: readonly GraphTimelineSpan[]
  readonly scope: GraphScope
  readonly onScope: (scope: GraphScope) => void
  /** Whether the Session still holds unloaded earlier history. */
  readonly hasEarlier: boolean
  /** Load one earlier history page; absent when the view cannot page. */
  readonly onLoadEarlier?: (() => void) | undefined
  /** Whether an earlier-history load is in flight. */
  readonly loadingEarlier: boolean
  readonly t: GraphTranslate
}

function clampFraction(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function orderedBand(left: number, right: number): GraphTimelineBand {
  return left <= right ? { start: left, end: right } : { start: right, end: left }
}

function spanTooltip(
  span: GraphTimelineSpan,
  t: GraphTranslate,
): string {
  const heading = t(laneKey(span.lane))
  const range = t('timeline.range', { from: clockTime(span.start), to: clockTime(span.end) })
  const total = t('timeline.total', { duration: durationMillis(span.end - span.start, t) })
  const split = span.ttftMs === undefined || span.generationMs === undefined
    ? null
    : t('timeline.ttftDecoding', {
      ttft: durationMillis(span.ttftMs, t),
      decoding: durationMillis(span.generationMs, t),
    })
  return [`${heading} ${range}`, [total, split].filter(part => part !== null).join(' · ')].join('\n')
}

/**
 * Scoped three-lane timeline.
 *
 * Clicking a span narrows the scope to the turn and step that recorded it;
 * brushing a range widens to the narrowest scope covering the brushed spans.
 * @param props - Projected spans, current scope, history paging, and locale.
 * @returns a labeled region with a mode switch and a gesture-driven track.
 */
export function GraphTimeline({
  spans, scope, onScope, hasEarlier, onLoadEarlier, loadingEarlier, t,
}: GraphTimelineProps): ReactNode {
  const [mode, setMode] = useState<GraphTimelineMode>('sequence')
  const [viewport, setViewport] = useState<GraphTimelineBand | null>(null)
  const [draft, setDraft] = useState<GraphTimelineBand | null>(null)
  const [hover, setHover] = useState<{ fraction: number; overSpan: boolean } | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; anchor: number; clientX: number } | null>(null)
  const panRef = useRef<{ pointerId: number; clientX: number; start: number } | null>(null)
  const brushedRef = useRef(false)
  const model = useMemo(() => deriveGraphTimeline(spans, mode), [spans, mode])

  const fullStart = model?.start ?? 0
  const fullDuration = Math.max(1, (model?.end ?? 1) - fullStart)
  const domainDuration = viewport === null
    ? fullDuration
    : Math.min(fullDuration, Math.max(1, viewport.end - viewport.start))
  const domainStart = viewport === null
    ? fullStart
    : Math.min(Math.max(viewport.start, fullStart), fullStart + fullDuration - domainDuration)

  // The wheel listener is native so it can refuse the page's own scroll; React's
  // synthetic wheel handler is passive and cannot.
  useEffect(() => {
    const track = trackRef.current
    /* v8 ignore next -- the track ref is attached before this effect runs. */
    if (track === null) return
    const onWheel = (event: WheelEvent): void => {
      event.preventDefault()
      const rect = track.getBoundingClientRect()
      const anchor = clampFraction((event.clientX - rect.left) / Math.max(1, rect.width))
      const floor = Math.min(
        mode === 'sequence' ? MINIMUM_ZOOM_OPERATIONS : MINIMUM_ZOOM_MS,
        fullDuration,
      )
      const next = Math.min(
        fullDuration,
        Math.max(floor, domainDuration * Math.exp(event.deltaY * ZOOM_RATE)),
      )
      if (next >= fullDuration) {
        setViewport(null)
        return
      }
      const anchored = domainStart + anchor * domainDuration
      const start = Math.min(
        Math.max(anchored - anchor * next, fullStart),
        fullStart + fullDuration - next,
      )
      setViewport({ start, end: start + next })
    }
    track.addEventListener('wheel', onWheel, { passive: false })
    return () => { track.removeEventListener('wheel', onWheel) }
  }, [domainDuration, domainStart, fullDuration, fullStart, mode])

  const fractionAt = (event: PointerEvent<HTMLDivElement>): number => {
    const rect = event.currentTarget.getBoundingClientRect()
    return clampFraction((event.clientX - rect.left) / Math.max(1, rect.width))
  }

  const overSpan = (event: PointerEvent<HTMLDivElement>): boolean => {
    const target = event.target instanceof HTMLElement ? event.target : null
    return target?.closest<HTMLElement>('[data-span]') !== null
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (event.button === 2) {
      // Panning only means something once a viewport narrower than the domain exists.
      if (viewport === null) return
      panRef.current = { pointerId: event.pointerId, clientX: event.clientX, start: domainStart }
      return
    }
    if (event.button !== 0) return
    const anchor = domainStart + fractionAt(event) * domainDuration
    dragRef.current = { pointerId: event.pointerId, anchor, clientX: event.clientX }
    setDraft({ start: anchor, end: anchor })
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    setHover({ fraction: fractionAt(event), overSpan: overSpan(event) })
    const pan = panRef.current
    if (pan !== null && pan.pointerId === event.pointerId) {
      const rect = event.currentTarget.getBoundingClientRect()
      const delta = (event.clientX - pan.clientX) / Math.max(1, rect.width)
      const start = Math.min(
        Math.max(pan.start - delta * domainDuration, fullStart),
        fullStart + fullDuration - domainDuration,
      )
      setViewport({ start, end: start + domainDuration })
      return
    }
    const drag = dragRef.current
    if (drag === null || drag.pointerId !== event.pointerId) return
    let nextDomainStart = domainStart
    if (viewport !== null) {
      // A zoomed viewport pans itself while the brush reaches its left or right
      // edge, matching the Trajectory timeline's edge pan.
      const rect = event.currentTarget.getBoundingClientRect()
      const localX = event.clientX - rect.left
      const edgeWidth = Math.min(
        MAXIMUM_EDGE_PAN_PX,
        Math.max(1, rect.width * EDGE_PAN_ZONE_FRACTION),
      )
      const direction = localX < edgeWidth
        ? -1
        : localX > rect.width - edgeWidth ? 1 : 0
      if (direction !== 0) {
        const edgeDistance = direction < 0
          ? edgeWidth - localX
          : localX - (rect.width - edgeWidth)
        const strength = clampFraction(edgeDistance / edgeWidth)
        const desiredStart = domainStart
          + direction * domainDuration * EDGE_PAN_STEP_FRACTION
          * Math.max(0.2, strength)
        nextDomainStart = Math.min(
          Math.max(desiredStart, fullStart),
          fullStart + fullDuration - domainDuration,
        )
        if (nextDomainStart !== domainStart) {
          setViewport({ start: nextDomainStart, end: nextDomainStart + domainDuration })
        }
      }
    }
    const pointTime = nextDomainStart + fractionAt(event) * domainDuration
    setDraft(orderedBand(drag.anchor, pointTime))
  }

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>): void => {
    const pan = panRef.current
    if (pan !== null && pan.pointerId === event.pointerId) {
      panRef.current = null
      return
    }
    const drag = dragRef.current
    if (drag === null || drag.pointerId !== event.pointerId) return
    const band = orderedBand(drag.anchor, domainStart + fractionAt(event) * domainDuration)
    dragRef.current = null
    setDraft(null)
    // Under the drag threshold the gesture is a click, which the span button
    // under the pointer answers on its own.
    if (Math.abs(event.clientX - drag.clientX) < MINIMUM_DRAG_PX) return
    brushedRef.current = true
    const covered = (model?.spans ?? [])
      .filter(item => item.end >= band.start && item.start <= band.end)
      .map(item => item.span)
    const next = scopeForSpans(covered)
    if (next !== null) onScope(next)
  }

  const onPointerCancel = (): void => {
    dragRef.current = null
    panRef.current = null
    setDraft(null)
    setHover(null)
  }

  const resetViewport = (): void => { setViewport(null) }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'Escape') return
    event.preventDefault()
    resetViewport()
  }

  const band = model === null ? null : scopeBand(model, scope)
  const selection = draft ?? band
  const percent = (value: number): number => (value - domainStart) / domainDuration * 100

  return (
    <div className={css.timeline} role="region" aria-label={t('timeline.aria')}>
      <div className={css.tlHead}>
        <div className={css.modes} role="group">
          {([['actual', 'timeline.actual'], ['sequence', 'timeline.sequence']] as const).map(
            ([id, key]) => (
              <button
                key={id}
                type="button"
                className={css.mode}
                aria-pressed={mode === id}
                onClick={() => { setMode(id); setViewport(null) }}
              >
                {t(key)}
              </button>
            ),
          )}
        </div>
      </div>
      <div className={css.tlPlot}>
        <div className={css.tlLabels} aria-hidden="true">
          {([0, 1, 2] as const).map(lane => (
            <span key={lane}>{t(laneKey(lane))}</span>
          ))}
        </div>
        <div
          ref={trackRef}
          className={css.tlBody}
          data-timeline-track=""
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerCancel}
          onPointerLeave={() => {
            if (dragRef.current === null && panRef.current === null) setHover(null)
          }}
          onDoubleClick={(event) => { event.preventDefault(); resetViewport() }}
          onContextMenu={(event) => { event.preventDefault() }}
          onClickCapture={(event) => {
            // Swallow the click that closes a brush so it cannot also select a span.
            if (!brushedRef.current) return
            brushedRef.current = false
            event.stopPropagation()
          }}
        >
          {hasEarlier && (
            <Tooltip
              label={loadingEarlier ? t('history.loadingEarlier') : t('history.loadEarlier')}
              side="right"
              delayMs={TIMELINE_TOOLTIP_DELAY_MS}
            >
              <button
                type="button"
                className={css.tlEarlier}
                aria-label={loadingEarlier ? t('history.loadingEarlier') : t('history.loadEarlier')}
                aria-disabled={loadingEarlier || onLoadEarlier === undefined}
                onClick={onLoadEarlier}
                onPointerDown={(event) => { event.stopPropagation() }}
              >
                …
              </button>
            </Tooltip>
          )}
          {hover !== null && !hover.overSpan && draft === null && (
            <div
              className={css.tlHover}
              aria-hidden="true"
              style={{ left: `${hover.fraction * 100}%` }}
            />
          )}
          {selection !== null && (
            <>
              <div
                className={draft === null ? css.tlBand : css.tlBrush}
                aria-hidden="true"
                style={{
                  left: `${percent(selection.start)}%`,
                  width: `${(selection.end - selection.start) / domainDuration * 100}%`,
                }}
              />
              <div
                className={css.tlEdge}
                aria-hidden="true"
                style={{ left: `${percent(selection.start)}%` }}
              />
              <div
                className={css.tlEdge}
                aria-hidden="true"
                style={{ left: `${percent(selection.end)}%` }}
              />
            </>
          )}
          {model?.turnTicks.map(tick => (
            <span
              key={tick.turn}
              className={css.tlTick}
              data-turn={tick.turn}
              aria-hidden="true"
              style={{ left: `${percent(tick.at)}%` }}
            />
          ))}
          {(model?.spans ?? [])
            .filter(item => item.end >= domainStart && item.start <= domainStart + domainDuration)
            .map((item, index) => {
              const selected = spanInScope(item.span, scope)
              return (
                <Tooltip
                  key={item.span.id}
                  label={() => spanTooltip(item.span, t)}
                  side="bottom"
                  delayMs={TIMELINE_TOOLTIP_DELAY_MS}
                >
                  <button
                    type="button"
                    className={selected ? `${css.tlSpan} ${css.tlSpanSel}` : css.tlSpan}
                    data-lane={item.span.lane}
                    data-span={item.span.id}
                    data-error={item.span.isError}
                    aria-pressed={selected}
                    aria-label={t('timeline.spanAria', {
                      lane: t(laneKey(item.span.lane)),
                      index: index + 1,
                    })}
                    style={{
                      left: `${percent(item.start)}%`,
                      width: `${Math.max(0.6, (item.end - item.start) / domainDuration * 100)}%`,
                      top: `${4 + item.span.lane * 14}px`,
                    }}
                    onClick={() => { onScope(spanScope(item.span)) }}
                  />
                </Tooltip>
              )
            })}
        </div>
      </div>
    </div>
  )
}
