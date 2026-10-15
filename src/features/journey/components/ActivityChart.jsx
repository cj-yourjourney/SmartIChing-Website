import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { formatDuration, formatShortDate } from '../utils'

const METRICS = [
  { key: 'castings', label: 'Castings', color: 'var(--color-primary)' },
  { key: 'reviews', label: 'Reviews', color: 'var(--color-secondary)' },
  { key: 'minutes', label: 'Time on site', color: 'var(--color-accent)' }
]

function formatValue(metric, value) {
  if (metric.key === 'minutes') return formatDuration(value)
  return `${value} ${value === 1 ? metric.label.toLowerCase().replace(/s$/, '') : metric.label.toLowerCase()}`
}

function ChartTooltip({ active, payload, label, metric }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-box border border-base-300 bg-base-100 px-3 py-2 text-sm shadow-lg">
      <div className="font-medium">{label}</div>
      <div className="opacity-70">{formatValue(metric, payload[0].value)}</div>
    </div>
  )
}

// days: the daily rows inside the selected range.
export default function ActivityChart({ days }) {
  const [metricKey, setMetricKey] = useState('castings')
  const metric = METRICS.find((m) => m.key === metricKey)

  const data = useMemo(
    () =>
      days.map((d) => ({
        label: formatShortDate(d.date),
        castings: d.castings,
        reviews: d.reviewed.length,
        minutes: d.minutes
      })),
    [days]
  )

  const total = data.reduce((t, d) => t + d[metric.key], 0)

  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl">Activity over time</h2>
          <p className="text-sm opacity-70">
            {metric.key === 'minutes'
              ? `${formatDuration(total)} on the site`
              : `${total} ${metric.label.toLowerCase()}`}{' '}
            in this period
          </p>
        </div>
        <div role="tablist" className="tabs tabs-box tabs-sm">
          {METRICS.map((m) => (
            <button
              key={m.key}
              type="button"
              role="tab"
              aria-selected={m.key === metricKey}
              className={`tab ${m.key === metricKey ? 'tab-active' : ''}`}
              onClick={() => setMetricKey(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-72 w-full text-base-content">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id={`fill-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" style={{ stopColor: metric.color, stopOpacity: 0.35 }} />
                <stop offset="100%" style={{ stopColor: metric.color, stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--color-base-300)"
              strokeDasharray="3 4"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              minTickGap={28}
              interval="preserveStartEnd"
              tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.6 }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.6 }}
            />
            <Tooltip
              cursor={{ stroke: 'var(--color-base-300)' }}
              content={<ChartTooltip metric={metric} />}
            />
            <Area
              type="monotone"
              dataKey={metric.key}
              stroke={metric.color}
              strokeWidth={2.5}
              fill={`url(#fill-${metric.key})`}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
