import PageShell from '@/shared/components/layout/PageShell'
import PageSkeleton from '@/shared/components/feedback/PageSkeleton'
import useAccessGate from '../useAccessGate'
import SubscriptionRequired from './SubscriptionRequired'

// Frame for pages that need a subscription. Use it instead of PageShell.
//   skeleton              PageSkeleton variant while access is being checked
//   subscriptionRequired  pass the slice's flag, so a 403 from the backend
//                         also blocks the page
// Blocked users still see the page, dimmed, with the paywall on top.
export default function GatedPage({
  skeleton = 'default',
  subscriptionRequired = false,
  className = '',
  children
}) {
  const gate = useAccessGate()

  if (gate === 'loading') return <PageSkeleton variant={skeleton} />

  const blocked = gate === 'blocked' || subscriptionRequired

  return (
    <PageShell
      blocked={blocked}
      overlay={<SubscriptionRequired />}
      className={className}
    >
      {children}
    </PageShell>
  )
}
