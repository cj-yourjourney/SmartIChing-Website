import { useDispatch, useSelector } from 'react-redux'
import { Clock } from 'lucide-react'
import Card from '@/shared/components/layout/Card'
import StatusBadge from '@/shared/components/feedback/StatusBadge'
import { openBillingPortal } from '../state/accountSlice'
import { PLAN_LABELS } from '../constants'
import { daysLeft, formatDate } from '../utils'

const BADGES = {
  trial: { tone: 'info', icon: Clock, label: 'Free trial' },
  active: { tone: 'success', label: 'Active' },
  past_due: { tone: 'warning', label: 'Payment issue' },
  expired: { tone: 'error', label: 'Trial ended' },
  canceled: { tone: 'error', label: 'Canceled' }
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
      return 'Your subscription has ended. Choose a plan to continue.'
    default:
      return 'Your free trial has ended. Choose a plan to continue.'
  }
}

export default function SubscriptionCard({ subscription }) {
  const dispatch = useDispatch()
  const portalLoading = useSelector((s) => s.account.portalLoading)
  const badge = BADGES[subscription.status] || BADGES.expired

  return (
    <Card
      title="Subscription"
      action={
        <StatusBadge tone={badge.tone} icon={badge.icon}>
          {badge.label}
        </StatusBadge>
      }
    >
      <p className="opacity-80">{describe(subscription)}</p>

      {subscription.has_billing_account && (
        <button
          type="button"
          className="btn btn-outline btn-sm mt-4"
          onClick={() => dispatch(openBillingPortal())}
          disabled={portalLoading}
        >
          {portalLoading && <span className="loading loading-spinner" />}
          {portalLoading ? 'Opening…' : 'Manage billing'}
        </button>
      )}
    </Card>
  )
}
