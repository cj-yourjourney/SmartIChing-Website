import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Clock } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import { daysLeft } from '@/features/account/utils'
import StatusBadge from './StatusBadge'

export default function SubscriptionBadge() {
  const subscription = useSelector((s) => s.account.subscription)
  if (!subscription) return null

  let label = null
  let tone = 'info'
  let icon

  switch (subscription.status) {
    case 'trial': {
      const n = daysLeft(subscription.trial_ends_at)
      if (n === 0) {
        label = 'Trial ended'
        tone = 'error'
      } else {
        label = `Trial: ${n} ${n === 1 ? 'day' : 'days'} left`
        tone = n <= 2 ? 'warning' : 'info'
        icon = Clock
      }
      break
    }
    case 'expired':
      label = 'Trial ended'
      tone = 'error'
      break
    case 'canceled':
      label = 'Subscription ended'
      tone = 'error'
      break
    case 'past_due':
      label = 'Payment issue'
      tone = 'warning'
      break
    default:
      return null // active: nothing to show
  }

  return (
    <Link href={ROUTES.ACCOUNT}>
      <StatusBadge tone={tone} icon={icon}>
        {label}
      </StatusBadge>
    </Link>
  )
}
