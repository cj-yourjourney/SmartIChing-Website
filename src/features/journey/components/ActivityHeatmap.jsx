import { useMemo } from 'react'
import {
  buildHeatmapCells,
  formatDuration,
  formatShortDate,
  heatLevel,
  parseDateKey
} from '../utils'

const LEVEL_CLASSES = [
  'bg-base-300',
  'bg-primary/25',
  'bg-primary/50',
  'bg-primary/75',
  'bg-primary'
]

const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

// Shows every day we have, one column per week. Colour = time on site.
export default function ActivityHeatmap({ daily }) {
  const { weeks, monthLabels } = useMemo(() => {
    const cells = buildHeatmapCells(daily)
    const weeks = []
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

    let prevMonth = -1
    const monthLabels = weeks.map((week) => {
      const first = week.find(Boolean)
      if (!first) return ''
      const date = parseDateKey(first.date)
      if (date.getMonth() === prevMonth) return ''
      prevMonth = date.getMonth()
      return date.toLocaleDateString('en-US', { month: 'short' })
    })
    return { weeks, monthLabels }
  }, [daily])

  const activeDays = daily.filter((d) => d.minutes > 0).length

  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 className="font-serif text-2xl">Your practice calendar</h2>
      <p className="text-sm opacity-70">
        You showed up on {activeDays} of the last {daily.length} days.
      </p>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="inline-flex gap-1">
          <div className="flex flex-col gap-1 pr-1">
            <div className="h-4" />
            {WEEKDAY_LABELS.map((label, i) => (
              <div key={i} className="h-3.5 text-xs leading-none opacity-60">
                {label}
              </div>
            ))}
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              <div className="h-4 whitespace-nowrap text-xs leading-none opacity-60">
                {monthLabels[wi]}
              </div>
              {Array.from({ length: 7 }, (_, di) => {
                const cell = week[di]
                if (!cell) return <div key={di} className="size-3.5" />
                const level = heatLevel(cell.minutes)
                const title = cell.minutes
                  ? `${formatShortDate(cell.date)}: ${formatDuration(cell.minutes)}, ${cell.castings} casting${cell.castings === 1 ? '' : 's'}`
                  : `${formatShortDate(cell.date)}: no activity`
                return (
                  <div
                    key={di}
                    title={title}
                    className={`size-3.5 rounded-[4px] ${LEVEL_CLASSES[level]}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 text-xs opacity-70">
        <span>Less</span>
        {LEVEL_CLASSES.map((cls) => (
          <div key={cls} className={`size-3.5 rounded-[4px] ${cls}`} />
        ))}
        <span>More</span>
      </div>
    </section>
  )
}
