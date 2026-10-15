import Link from 'next/link'
import { useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { daysLeft } from '@/features/account/utils'

export default function SubscriptionBadge() {
  const subscription = useSelector((s) => s.account.subscription)
  if (!subscription) return null

  let label = null
  let tone = ''

  switch (subscription.status) {
    case 'trial': {
      const n = daysLeft(subscription.trial_ends_at)
      if (n === 0) {
        label = 'Trial ended'
        tone = 'badge-error'
      } else {
        label = `Trial: ${n} ${n === 1 ? 'day' : 'days'} left`
        tone = n <= 2 ? 'badge-warning' : 'badge-info badge-outline'
      }
      break
    }
    case 'expired':
      label = 'Trial ended'
      tone = 'badge-error'
      break
    case 'canceled':
      label = 'Subscription ended'
      tone = 'badge-error'
      break
    case 'past_due':
      label = 'Payment issue'
      tone = 'badge-warning'
      break
    default:
      return null // active: nothing to show
  }

  return (
    <Link href={ROUTES.ACCOUNT} className={`badge ${tone} whitespace-nowrap`}>
      {label}
    </Link>
  )
}
