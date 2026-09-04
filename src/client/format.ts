/** Locale-independent number and duration labels shared by the graph readings. */

import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'

/** Namespace-bound translator threaded through architecture-graph presentation code. */
export type GraphTranslate = PropsLocale<'graph'>['t']

const THOUSAND = 1000

/**
 * Group an integer with commas without consulting the host locale.
 * @param value - Non-negative integer.
 * @returns the grouped digits, e.g. `83,148`.
 */
export function grouped(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Compact token reading for a card badge or bar label.
 * @param value - Token count.
 * @param t - Graph translator.
 * @returns `4.2k` at or above one thousand, the plain count below it.
 */
export function compactTokens(value: number, t: GraphTranslate): string {
  if (value < THOUSAND) return String(Math.round(value))
  return t('unit.tokensCompact', {
    value: (value / THOUSAND).toFixed(1).replace(/\.0$/, ''),
  })
}

/**
 * Exact token reading with its unit.
 * @param value - Token count.
 * @param t - Graph translator.
 * @returns e.g. `83,148 tok`.
 */
export function exactTokens(value: number, t: GraphTranslate): string {
  return t('unit.tokens', { value: grouped(value) })
}

/**
 * Elapsed duration in seconds.
 * @param milliseconds - Non-negative duration.
 * @param t - Graph translator.
 * @returns e.g. `1.24 秒`, with trailing fraction zeros trimmed.
 */
export function durationSeconds(milliseconds: number, t: GraphTranslate): string {
  return t('unit.seconds', {
    value: (milliseconds / THOUSAND).toFixed(2).replace(/\.?0+$/, ''),
  })
}

/**
 * Wall-clock time of a recorded instant as a fixed `HH:MM:SS.mmm` string.
 * The digits are assembled directly rather than through `toLocaleTimeString`
 * so the label stays identical regardless of the host locale (a European locale
 * would otherwise render a comma before the fraction, or word-based fields).
 * @param timestamp - Unix epoch milliseconds.
 * @returns the local-clock time to the millisecond, e.g. `12:34:56.789`.
 */
export function clockTime(timestamp: number): string {
  const date = new Date(timestamp)
  const pad = (value: number, width: number): string => String(value).padStart(width, '0')
  return `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}.${pad(date.getMilliseconds(), 3)}`
}

/**
 * Elapsed duration in whole milliseconds.
 * @param milliseconds - Non-negative duration.
 * @param t - Graph translator.
 * @returns e.g. `8,600 毫秒`.
 */
export function durationMillis(milliseconds: number, t: GraphTranslate): string {
  return t('unit.milliseconds', { value: grouped(milliseconds) })
}
