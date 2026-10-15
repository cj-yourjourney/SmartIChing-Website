import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import Link from 'next/link'
import {
  clearAccountError,
  fetchPayments,
  fetchSubscription
} from './state/accountSlice'
import SubscriptionCard from './components/SubscriptionCard'
import PlanCards from './components/PlanCards'
import PaymentHistoryList from './components/PaymentHistoryList'


const MAX_POLLS = 10 // x 2s: how long we wait for Stripe's webhook after checkout

export default function AccountPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized } = useSelector((s) => s.auth)
  const { subscription, subscriptionStatus, payments, paymentsStatus, error } =
    useSelector((s) => s.account)

  const checkoutResult = router.isReady ? router.query.checkout : undefined
  const polls = useRef(0)
  const [timedOut, setTimedOut] = useState(false)

  // Members only.
  useEffect(() => {
    if (initialized && !user) router.replace(ROUTES.SIGNIN)
  }, [initialized, user, router])

  // Initial load.
  useEffect(() => {
    if (!user) return
    dispatch(fetchSubscription())
    dispatch(fetchPayments())
  }, [user, dispatch])

  // After Stripe redirects back, the subscription is activated by a webhook that
  // can land a moment after the redirect: poll briefly until it shows as active.
  useEffect(() => {
    if (!user || checkoutResult !== 'success') return
    if (subscription?.status === 'active') return
    if (polls.current >= MAX_POLLS) {
      setTimedOut(true)
      return
    }
    const timer = setTimeout(() => {
      polls.current += 1
      dispatch(fetchSubscription())
    }, 2000)
    return () => clearTimeout(timer)
  }, [user, checkoutResult, subscription, dispatch])

  // Once active after checkout, load the new payment (twice: the invoice
  // webhook can trail the subscription webhook by a moment).
  const isActive = subscription?.status === 'active'
  useEffect(() => {
    if (checkoutResult !== 'success' || !isActive) return
    dispatch(fetchPayments())
    const timer = setTimeout(() => dispatch(fetchPayments()), 3000)
    return () => clearTimeout(timer)
  }, [checkoutResult, isActive, dispatch])

  const dismissBanner = () =>
    router.replace(ROUTES.ACCOUNT, undefined, { shallow: true })

  if (!initialized || !user) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <div className="skeleton h-40 w-full" />
      </main>
    )
  }

  const status = subscription?.status
  const showPlans = subscription && !['active', 'past_due'].includes(status)

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="opacity-70">
          {user.first_name ? `${user.first_name} · ` : ''}
          {user.email}
        </p>
      </header>

      {checkoutResult === 'success' && (
        <div
          role="alert"
          className={`alert ${isActive ? 'alert-success' : 'alert-info'}`}
        >
          <span>
            {isActive
              ? "You're subscribed. Thank you!"
              : timedOut
                ? 'Your payment went through, but activation is taking longer than usual. Refresh this page in a minute.'
                : 'Payment received. Activating your subscription…'}
          </span>
          {(isActive || timedOut) && (
            <div className="flex gap-2">
              {isActive && (
                <Link href={ROUTES.CASTING} className="btn btn-sm btn-primary">
                  Start casting
                </Link>
              )}
              <button
                type="button"
                className="btn btn-sm"
                onClick={dismissBanner}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}

      {checkoutResult === 'canceled' && (
        <div role="alert" className="alert">
          <span>Checkout was canceled. You haven't been charged.</span>
          <button type="button" className="btn btn-sm" onClick={dismissBanner}>
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div role="alert" className="alert alert-error">
          <span>{error}</span>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => dispatch(clearAccountError())}
          >
            Dismiss
          </button>
        </div>
      )}

      {!subscription && subscriptionStatus !== 'failed' ? (
        <div className="skeleton h-32 w-full" />
      ) : subscription ? (
        <>
          <SubscriptionCard subscription={subscription} />
          {showPlans && (
            <PlanCards
              title={status === 'trial' ? 'Subscribe now' : 'Choose a plan'}
            />
          )}
        </>
      ) : null}

      <PaymentHistoryList payments={payments} status={paymentsStatus} />
    </main>
  )
}
