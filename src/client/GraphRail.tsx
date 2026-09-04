/** Turn rail: turns in ascending order, their steps, and a session footer. */

import type { ReactNode } from 'react'
import css from './GraphView.module.css'
import type { GraphTranslate } from './format.ts'
import {
  railSteps, type GraphScope, type GraphSnapshot, type GraphStepInfo, type GraphTurnInfo,
} from './project.ts'

/** Props for the architecture-graph turn rail. */
export interface GraphRailProps {
  readonly snapshot: GraphSnapshot
  readonly scope: GraphScope
  readonly expanded: boolean
  readonly onScope: (scope: GraphScope) => void
  readonly onExpand: () => void
  readonly t: GraphTranslate
}

function stepLabel(step: GraphStepInfo, t: GraphTranslate): string {
  if (step.requestNumber > 0) {
    return `${t('request.label', { request: step.requestNumber })} ｜ ${t('group.step', { step: step.step })}`
  }
  return t('group.step', { step: step.step })
}

function haltLabel(turn: GraphTurnInfo, t: GraphTranslate): string {
  if (turn.halt === 'error') return t('status.failed')
  if (turn.halt === 'stopped') return t('halt.stopped')
  if (turn.halt === 'max_tokens') return t('halt.maxTokens')
  return ''
}

function turnSummary(turn: GraphTurnInfo, t: GraphTranslate): string {
  const steps = turn.steps.length
  const calls = turn.steps.reduce((sum, step) => sum + step.calls, 0)
  return t('rail.summary', {
    steps: t(steps === 1 ? 'summary.steps.one' : 'summary.steps.other', { count: steps }),
    toolCalls: t(calls === 1 ? 'summary.toolCalls.one' : 'summary.toolCalls.other', { count: calls }),
  })
}

/**
 * Compactions that ran between turns rather than inside one.
 * @param snapshot - Session-wide index.
 * @param afterTurn - Turn the compaction follows; `null` before the first turn.
 * @param t - Graph translator.
 * @returns one separator row per standalone compaction.
 */
function BetweenTurns({
  snapshot, afterTurn, t,
}: {
  snapshot: GraphSnapshot
  afterTurn: number | null
  t: GraphTranslate
}): ReactNode {
  return snapshot.betweenTurnCompactions
    .filter(item => item.afterTurn === afterTurn)
    .map(item => (
      <span key={`btc-${item.requestNumber}`} className={css.railBetween}>
        {t('request.compaction', { section: t('section.betweenTurns') })}
      </span>
    ))
}

/**
 * Left-hand turn rail for three-level graph scope.
 *
 * Turns read in the order they ran, so the session button sits in a footer
 * rather than above the first turn.
 * @param props - Session index, current scope, and locale.
 * @returns a navigation region of turn and step buttons.
 */
export function GraphRail({
  snapshot, scope, expanded, onScope, onExpand, t,
}: GraphRailProps): ReactNode {
  const selectedTurn = scope.kind === 'session' ? null : scope.turn
  return (
    <nav className={css.rail} aria-label={t('rail.aria')}>
      <div className={css.railList}>
        <BetweenTurns snapshot={snapshot} afterTurn={null} t={t} />
        {snapshot.turns.map((turn) => {
          const pressed = selectedTurn === turn.turn && scope.kind !== 'session'
          const halt = haltLabel(turn, t)
          const folded = pressed ? railSteps(turn.steps, expanded) : undefined
          return (
            <div key={turn.turn}>
              <button
                type="button"
                className={css.railTurn}
                aria-pressed={scope.kind === 'turn' && scope.turn === turn.turn}
                onClick={() => { onScope({ kind: 'turn', turn: turn.turn }) }}
              >
                <span className={css.railTurnHead}>
                  <span>{t('turn.label', { turn: turn.turn })}</span>
                  {halt !== '' && <span className={css.railHalt}>{halt}</span>}
                </span>
                <span className={css.railSub}>{turnSummary(turn, t)}</span>
              </button>
              {folded !== undefined && (
                <div className={css.railSteps}>
                  {folded.shown.map(step => (
                    <button
                      key={step.step}
                      type="button"
                      className={css.railStep}
                      aria-pressed={scope.kind === 'step' && scope.step === step.step}
                      onClick={() => { onScope({ kind: 'step', turn: turn.turn, step: step.step }) }}
                    >
                      {stepLabel(step, t)}
                    </button>
                  ))}
                  {turn.compactions.map(item => (
                    <span key={`c-${item.requestNumber}`} className={css.railCompaction}>
                      {t('request.labelCompaction', { request: item.requestNumber })}
                    </span>
                  ))}
                  {folded.hidden > 0 && (
                    <button type="button" className={css.railMore} onClick={onExpand}>
                      {t('rail.expand')}
                    </button>
                  )}
                </div>
              )}
              <BetweenTurns snapshot={snapshot} afterTurn={turn.turn} t={t} />
            </div>
          )
        })}
      </div>
      <div className={css.railFoot}>
        <button
          type="button"
          className={css.railTurn}
          aria-pressed={scope.kind === 'session'}
          onClick={() => { onScope({ kind: 'session' }) }}
        >
          {t('scope.session')}
        </button>
      </div>
    </nav>
  )
}
