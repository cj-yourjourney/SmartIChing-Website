export const RANGE_OPTIONS = [
  { value: 7, label: '7 days' },
  { value: 30, label: '30 days' },
  { value: 90, label: '90 days' },
  { value: 'all', label: 'All time' }
]

const pad = (n) => String(n).padStart(2, '0')

// Local-time 'YYYY-MM-DD' key. Daily activity is bucketed by this.
export function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function parseDateKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatShortDate(key) {
  return parseDateKey(key).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

export function formatReadingDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export function formatDuration(totalMinutes) {
  const m = Math.round(totalMinutes)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  const rem = m % 60
  return rem ? `${h}h ${rem}m` : `${h}h`
}

// Days inside the selected range, plus the equally long window before it
// (used for "vs previous period" trends).
function windowFor(daily, range) {
  if (range === 'all') return { current: daily, previous: [] }
  const current = daily.slice(-range)
  const previous = daily.slice(-range * 2, -range)
  // Not enough history for a fair comparison -> no trend.
  return { current, previous: previous.length === range ? previous : [] }
}

export function getRangeDays(daily, range) {
  return windowFor(daily, range).current
}

const sum = (list, pick) => list.reduce((t, d) => t + pick(d), 0)

function totals(list) {
  return {
    castings: sum(list, (d) => d.castings),
    reviews: sum(list, (d) => d.reviewed.length),
    minutes: sum(list, (d) => d.minutes),
    sessions: sum(list, (d) => d.sessions),
    activeDays: list.filter((d) => d.minutes > 0).length,
    uniqueHexagrams: new Set(list.flatMap((d) => d.reviewed)).size
  }
}

function trend(cur, prev) {
  if (!prev) return null
  return Math.round(((cur - prev) / prev) * 100)
}

export function computeStats(daily, range) {
  const { current, previous } = windowFor(daily, range)
  const cur = totals(current)
  const prev = previous.length ? totals(previous) : null
  return {
    ...cur,
    days: current.length,
    avgSession: cur.sessions ? cur.minutes / cur.sessions : 0,
    trends: {
      castings: prev ? trend(cur.castings, prev.castings) : null,
      reviews: prev ? trend(cur.reviews, prev.reviews) : null,
      minutes: prev ? trend(cur.minutes, prev.minutes) : null,
      activeDays: prev ? trend(cur.activeDays, prev.activeDays) : null
    }
  }
}

export function computeStreaks(daily) {
  let longest = 0
  let run = 0
  for (const d of daily) {
    if (d.minutes > 0) {
      run += 1
      longest = Math.max(longest, run)
    } else {
      run = 0
    }
  }
  let i = daily.length - 1
  if (i >= 0 && daily[i].minutes === 0) i -= 1 // today isn't over yet
  let current = 0
  while (i >= 0 && daily[i].minutes > 0) {
    current += 1
    i -= 1
  }
  return { current, longest }
}

// Heatmap layout: columns are weeks (Sunday first). Leading nulls align the
// first day with its weekday row.
export function buildHeatmapCells(daily) {
  if (!daily.length) return []
  const lead = parseDateKey(daily[0].date).getDay()
  return [...Array(lead).fill(null), ...daily]
}

export function heatLevel(minutes) {
  if (minutes <= 0) return 0
  if (minutes < 15) return 1
  if (minutes < 30) return 2
  if (minutes < 50) return 3
  return 4
}
