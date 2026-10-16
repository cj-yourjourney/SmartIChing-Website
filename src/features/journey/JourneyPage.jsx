import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { BookOpen, CalendarCheck, Clock, Sparkles } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import ErrorAlert from '@/shared/components/ErrorAlert'
import PageHeader from '@/shared/components/PageHeader'
import PageShell from '@/shared/components/PageShell'
import PageSkeleton from '@/shared/components/PageSkeleton'
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

export default function JourneyPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized } = useSelector((s) => s.auth)
  const { range, status, loaded, daily, readings, error } = useSelector(
    (s) => s.journey
  )

  // Members only (same as the account page).
  useEffect(() => {
    if (initialized && !user) router.replace(ROUTES.SIGNIN)
  }, [initialized, user, router])

  // Refetch on every visit so new castings and reviews show up. The thunk's
  // `condition` skips the call if one is already in flight.
  useEffect(() => {
    if (user) dispatch(fetchJourney())
  }, [user, dispatch])

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

  if (!initialized || !user) return <PageSkeleton />

  // Only show the error screen if we have nothing to show yet. If a refresh
  // fails after a successful load, keep displaying the data we already have.
  if (status === 'failed' && !loaded) {
    return (
      <PageShell>
        <ErrorAlert message={error} onRetry={() => dispatch(fetchJourney())} />
      </PageShell>
    )
  }

  if (!loaded) return <PageSkeleton />

  const periodText =
    range === 'all' ? 'since you started' : `in the last ${range} days`
  const comparisonLabel = `vs previous ${range} days`
  const greeting = user.first_name ? `${user.first_name}, here` : 'Here'

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
    <PageShell>
      <PageHeader
        title="My Journey"
        description={`${greeting} is what you cast, studied and read ${periodText}.`}
        action={
          <RangeToggle value={range} onChange={(v) => dispatch(setRange(v))} />
        }
      />

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
    </PageShell>
  )
}
