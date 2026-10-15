import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { fetchSubscription } from '../state/accountSlice'
import PlanCards from './PlanCards'

const TITLES = {
  expired: 'Your free trial has ended',
  canceled: 'Your subscription has ended'
}

const BENEFITS = [
  'Browse all 64 hexagrams in depth',
  'Cast readings with a personalized interpretation of your question'
]

// Render inside a `relative` container: it covers that container only
// (not the Navbar) and dims whatever sits behind it.
export default function SubscriptionRequired() {
  const dispatch = useDispatch()
  const subscription = useSelector((s) => s.account.subscription)

  // Refresh so the message reflects the server's view, not a stale cache.
  useEffect(() => {
    dispatch(fetchSubscription())
  }, [dispatch])

  const title = TITLES[subscription?.status] || 'Subscription required'

  return (
    <div
      role="dialog"
      aria-labelledby="subscription-required-title"
      className="absolute inset-0 z-20 flex items-start justify-center bg-base-300/50 px-4 pt-12"
    >
      <div className="card h-fit w-full max-w-xl overflow-hidden border border-base-300 bg-base-100 shadow-2xl">
        <div className="flex items-center gap-2 bg-warning/20 px-6 py-3">
          <span aria-hidden="true">⚡</span>
          <h2 id="subscription-required-title" className="font-semibold">
            {title}
          </h2>
        </div>

        <div className="space-y-5 p-6">
          <p className="opacity-80">
            Subscribe to keep using Hexagram and Casting.
          </p>

          <ul className="space-y-1 text-sm">
            {BENEFITS.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-success">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <PlanCards title="Pick a plan" />

          <p className="text-center text-sm opacity-70">
            <Link href={ROUTES.ACCOUNT} className="link">
              Go to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
