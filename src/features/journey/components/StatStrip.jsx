import { Minus, TrendingDown, TrendingUp } from 'lucide-react'

function Trend({ value }) {
  if (value === null || value === undefined) return null
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-1">
        <Minus className="size-3.5" aria-hidden="true" />
        No change
      </span>
    )
  }
  const up = value > 0
  const Icon = up ? TrendingUp : TrendingDown
  return (
    <span
      className={`inline-flex items-center gap-1 ${up ? 'text-success' : 'text-error'}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {Math.abs(value)}%
    </span>
  )
}

// One connected strip rather than four separate cards: the numbers read as a
// single summary of the period.
// items: [{ key, icon, label, value, hint, trend }]
export default function StatStrip({ items, comparisonLabel }) {
  return (
    <div className="stats stats-vertical lg:stats-horizontal w-full border border-base-300 bg-base-100">
      {items.map(({ key, icon: Icon, label, value, hint, trend }) => (
        <div key={key} className="stat">
          <div className="stat-figure text-primary/70">
            <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div className="stat-title">{label}</div>
          <div className="stat-value font-serif font-normal">{value}</div>
          <div className="stat-desc flex flex-wrap items-center gap-x-2">
            <Trend value={trend} />
            {trend !== null && trend !== undefined && (
              <span className="opacity-70">{comparisonLabel}</span>
            )}
            {(trend === null || trend === undefined) && <span>{hint}</span>}
          </div>
          {trend !== null && trend !== undefined && hint && (
            <div className="stat-desc">{hint}</div>
          )}
        </div>
      ))}
    </div>
  )
}
