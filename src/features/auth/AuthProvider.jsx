import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { loadSession } from './state/authSlice'

// Pages a signed-in but still-unverified user may visit. Everything else sends
// them to the "check your email" page until they click the emailed link.
const OPEN_TO_UNVERIFIED = new Set([
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.SIGNIN,
  ROUTES.SIGNUP,
  ROUTES.CHECK_EMAIL,
  ROUTES.VERIFY_EMAIL,
  '/404',
  '/_error'
])

export default function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user, initialized, emailVerified } = useSelector((s) => s.auth)

  useEffect(() => {
    dispatch(loadSession())
  }, [dispatch])

  useEffect(() => {
    if (!router.isReady || !initialized || !user) return
    if (emailVerified !== false) return
    if (OPEN_TO_UNVERIFIED.has(router.pathname)) return
    router.replace(ROUTES.CHECK_EMAIL)
  }, [router, initialized, user, emailVerified])

  return children
}
