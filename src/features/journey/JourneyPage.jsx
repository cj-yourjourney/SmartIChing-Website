import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { BookOpen, CalendarCheck, Clock, Sparkles } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import { fetchJourney, setRange } from './state/journeySlice'
import {
  computeStats,
  computeStreaks,
  formatDuration,
  getRangeDays,
  parseDateKey,
  toDateKey
} from './utils'
import RangeToggle from './components/RangeToggle'
import StatStrip from './components/StatStrip'
import ActivityChart from './components/ActivityChart'
import ActivityHeatmap from './components/ActivityHeatmap'
import StreakCard from './components/StreakCard'
import TopHexagrams from './components/TopHexagrams'
import LearningProgress from './components/LearningProgress'
import ReadingJournal from './components/ReadingJournal'

function JourneySkeleton() {
  return (
    <main className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="skeleton h-14 w-64" />
        <div className="skeleton h-28 w-full" />
        <div className="skeleton h-80 w-full" />
      </div>
    </main>
  )
}

export default function JourneyPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized } = useSelector((s) => s.auth)
  const { range, status, daily, readings, error } = useSelector(
    (s) => s.journey
  )

  // Members only (same as the account page).
  useEffect(() => {
    if (initialized && !user) router.replace(ROUTES.SIGNIN)
  }, [initialized, user, router])

  useEffect(() => {
    if (user && status === 'idle') dispatch(fetchJourney())
  }, [user, status, dispatch])

  const stats = useMemo(() => computeStats(daily, range), [daily, range])
  const rangeDays = useMemo(() => getRangeDays(daily, range), [daily, range])
  const streaks = useMemo(() => computeStreaks(daily), [daily])
  const reviewedAllTime = useMemo(
    () => [...new Set(daily.flatMap((d) => d.reviewed))],
    [daily]
  )
  const last7 = useMemo(
    () =>
      daily.slice(-7).map((d) => ({
        key: d.date,
        label: parseDateKey(d.date).toLocaleDateString('en-US', {
          weekday: 'short'
        }),
        active: d.minutes > 0
      })),
    [daily]
  )
  const readingsInRange = useMemo(() => {
    if (range === 'all' || !rangeDays.length) return readings
    const start = rangeDays[0].date // 'YYYY-MM-DD' strings sort correctly
    return readings.filter((r) => toDateKey(new Date(r.castAt)) >= start)
  }, [readings, range, rangeDays])

  if (!initialized || !user) return <JourneySkeleton />

  if (status === 'failed') {
    return (
      <main className="min-h-screen bg-base-200 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div role="alert" className="alert alert-error">
            <span>{error}</span>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => dispatch(fetchJourney())}
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (status !== 'succeeded') return <JourneySkeleton />

  const periodText =
    range === 'all' ? 'since you started' : `in the last ${range} days`
  const comparisonLabel = `vs previous ${range} days`

  const items = [
    {
      key: 'castings',
      icon: Sparkles,
      label: 'Hexagrams cast',
      value: stats.castings,
      hint: `${stats.activeDays} active days`,
      trend: stats.trends.castings
    },
    {
      key: 'reviews',
      icon: BookOpen,
      label: 'Hexagram reviews',
      value: stats.reviews,
      hint: `${stats.uniqueHexagrams} different hexagrams`,
      trend: stats.trends.reviews
    },
    {
      key: 'time',
      icon: Clock,
      label: 'Time on site',
      value: formatDuration(stats.minutes),
      hint: `About ${formatDuration(stats.avgSession)} per visit`,
      trend: stats.trends.minutes
    },
    {
      key: 'days',
      icon: CalendarCheck,
      label: 'Days active',
      value: stats.activeDays,
      hint: `Out of ${stats.days} days`,
      trend: stats.trends.activeDays
    }
  ]

  return (
    <main className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-5xl">My Journey</h1>
            <p className="mt-2 max-w-xl opacity-70">
              {user.first_name ? `${user.first_name}, here` : 'Here'} is what
              you cast, studied and read {periodText}.
            </p>
          </div>
          <RangeToggle value={range} onChange={(v) => dispatch(setRange(v))} />
        </header>

        <StatStrip items={items} comparisonLabel={comparisonLabel} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityChart days={rangeDays} />
          </div>
          <StreakCard streaks={streaks} last7={last7} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityHeatmap daily={daily} />
          </div>
          <TopHexagrams readings={readingsInRange} />
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ReadingJournal readings={readings} />
          </div>
          <LearningProgress reviewed={reviewedAllTime} />
        </div>
      </div>
    </main>
  )
}
