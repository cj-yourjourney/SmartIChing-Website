import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { fetchSubscription } from '../state/accountSlice'

const REASONS = {
  expired: 'Your free trial has ended.',
  canceled: 'Your subscription has ended.'
}

export default function SubscriptionRequired() {
  const dispatch = useDispatch()
  const subscription = useSelector((s) => s.account.subscription)

  // Refresh so the message reflects the server's view, not a stale cache.
  useEffect(() => {
    dispatch(fetchSubscription())
  }, [dispatch])

  const reason =
    REASONS[subscription?.status] ||
    'An active subscription or free trial is required.'

  return (
    <div className="max-w-xl mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Subscription required</h2>
          <p className="opacity-80">
            {reason} Subscribe to keep using Hexagram and Casting.
          </p>
          <Link href={ROUTES.ACCOUNT} className="btn btn-primary mt-2">
            View plans
          </Link>
        </div>
      </div>
    </div>
  )
}
