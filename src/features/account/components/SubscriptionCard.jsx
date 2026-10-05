import { useDispatch, useSelector } from 'react-redux'
import { openBillingPortal } from '../state/accountSlice'
import { PLAN_LABELS } from '../constants'

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : ''

const daysLeft = (iso) =>
  iso ? Math.max(0, Math.ceil((new Date(iso) - Date.now()) / 86400000)) : 0

const BADGES = {
  trial: { className: 'badge-info', label: 'Free trial' },
  active: { className: 'badge-success', label: 'Active' },
  past_due: { className: 'badge-warning', label: 'Payment issue' },
  expired: { className: 'badge-error', label: 'Trial ended' },
  canceled: { className: 'badge-error', label: 'Canceled' }
}

function describe(sub) {
  const plan = PLAN_LABELS[sub.plan] || ''
  switch (sub.status) {
    case 'trial': {
      const n = daysLeft(sub.trial_ends_at)
      return `Your free trial ends on ${formatDate(sub.trial_ends_at)} (${n} day${n === 1 ? '' : 's'} left).`
    }
    case 'active':
      return sub.cancel_at_period_end
        ? `Your ${plan} plan is canceled and stays active until ${formatDate(sub.current_period_end)}.`
        : `Your ${plan} plan renews on ${formatDate(sub.current_period_end)}.`
    case 'past_due':
      return `We couldn't process your last payment. You keep access until ${formatDate(sub.current_period_end)}; please update your card.`
    case 'canceled':
      return 'Your subscription has ended. Choose a plan below to continue.'
    default:
      return 'Your free trial has ended. Choose a plan below to continue.'
  }
}

export default function SubscriptionCard({ subscription }) {
  const dispatch = useDispatch()
  const portalLoading = useSelector((s) => s.account.portalLoading)
  const badge = BADGES[subscription.status] || BADGES.expired

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body">
        <div className="flex items-center justify-between gap-3">
          <h2 className="card-title">Subscription</h2>
          <span className={`badge ${badge.className}`}>{badge.label}</span>
        </div>

        <p className="opacity-80">{describe(subscription)}</p>

        {subscription.has_billing_account && (
          <div className="card-actions justify-end mt-2">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => dispatch(openBillingPortal())}
              disabled={portalLoading}
            >
              {portalLoading ? 'Opening…' : 'Manage billing'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
