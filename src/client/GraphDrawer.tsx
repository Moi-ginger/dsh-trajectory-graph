/** Details drawer: collapsible groups of Trajectory-backed rows. */

import { useState, type ReactNode } from 'react'
import css from './GraphView.module.css'
import type { GraphTranslate } from './format.ts'
import type { GraphDrawerGroup, GraphDrawerRow } from './inspect.ts'

/** Props for the architecture-graph details drawer. */
export interface GraphDrawerProps {
  readonly title: string
  readonly groups: readonly GraphDrawerGroup[]
  readonly onClose: () => void
  readonly onOpen: (callId: string) => void
  readonly t: GraphTranslate
}

function Row({
  row, onOpen,
}: {
  row: GraphDrawerRow
  onOpen: (callId: string) => void
}): ReactNode {
  const callId = row.callId
  const body = (
    <>
      {row.segment !== undefined && (
        <i className={css.rowSwatch} data-seg={row.segment} aria-hidden="true" />
      )}
      <span className={css.rowLead}>{row.lead}</span>
      <span className={css.rowBody}>{row.body}</span>
      {row.trailing !== undefined && <span className={css.rowTrail}>{row.trailing}</span>}
      {row.ok !== undefined && (
        <i className={row.ok ? css.rowOk : css.rowBad} aria-hidden="true" />
      )}
    </>
  )
  if (callId === undefined) {
    return <li className={row.muted === true ? `${css.drawerRow} ${css.rowMuted}` : css.drawerRow}>{body}</li>
  }
  return (
    <li>
      <button
        type="button"
        className={css.drawerRow}
        onClick={() => { onOpen(callId) }}
      >
        {body}
      </button>
    </li>
  )
}

/**
 * Right-hand details list. A row with a tool `callId` opens Trajectory.
 * @param props - Title, groups, close and open-view callbacks, locale.
 * @returns a complementary region of collapsible groups.
 */
export function GraphDrawer({
  title, groups, onClose, onOpen, t,
}: GraphDrawerProps): ReactNode {
  const [closed, setClosed] = useState<ReadonlySet<string>>(new Set())
  return (
    <aside className={css.drawer} role="complementary" aria-label={t('drawer.aria')}>
      <div className={css.drawerHead}>
        <span>{title}</span>
        <button type="button" className={css.drawerClose} onClick={onClose}>
          {t('drawer.close')}
        </button>
      </div>
      {groups.length === 0 ? (
        <p className={css.drawerEmpty}>{t('drawer.empty')}</p>
      ) : (
        <div className={css.drawerGroups}>
          {groups.map((item) => {
            const open = item.open !== closed.has(item.id)
            return (
              <section key={item.id} className={css.drawerGroup}>
                <button
                  type="button"
                  className={css.groupHead}
                  aria-expanded={open}
                  onClick={() => {
                    setClosed((current) => {
                      const next = new Set(current)
                      if (!next.delete(item.id)) next.add(item.id)
                      return next
                    })
                  }}
                >
                  <span className={css.groupName}>{item.title}</span>
                  <span className={css.groupCount}>{item.rows.length}</span>
                  {item.total !== undefined && (
                    <span className={css.groupTotal}>{item.total}</span>
                  )}
                </button>
                {open && (
                  <ul className={css.drawerList}>
                    {item.rows.map(row => (
                      <Row key={row.id} row={row} onOpen={onOpen} />
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>
      )}
    </aside>
  )
}
