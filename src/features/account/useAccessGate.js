import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { fetchSubscription } from './state/accountSlice'

// Returns 'loading' | 'allowed' | 'blocked'.
// Redirects signed-out visitors to sign-in. If the subscription request
// itself fails, we fail open ('allowed') and let the backend's 403 decide.
export default function useAccessGate() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized } = useSelector((s) => s.auth)
  const { subscription, subscriptionStatus } = useSelector((s) => s.account)

  useEffect(() => {
    if (initialized && !user) router.replace(ROUTES.SIGNIN)
  }, [initialized, user, router])

  const needsFetch =
    Boolean(user) && !subscription && subscriptionStatus === 'idle'
  useEffect(() => {
    if (needsFetch) dispatch(fetchSubscription())
  }, [needsFetch, dispatch])

  if (!initialized || !user) return 'loading'
  if (!subscription)
    return subscriptionStatus === 'failed' ? 'allowed' : 'loading'
  return subscription.has_access ? 'allowed' : 'blocked'
}
