import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { AFTER_AUTH_ROUTE } from './constants'
import {
  logout,
  refreshVerification,
  resendVerification
} from './state/authSlice'

const RESEND_COOLDOWN_SECONDS = 60

export default function CheckEmailPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized, emailVerified, verificationEmailSent } =
    useSelector((s) => s.auth)

  const [sending, setSending] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [notice, setNotice] = useState('')
  const [resendError, setResendError] = useState('')
  const leaving = useRef(false)

  // Not signed in -> nothing to verify here
  useEffect(() => {
    if (leaving.current) return
    if (initialized && !user) router.replace(ROUTES.SIGNIN)
  }, [initialized, user, router])

  // Verified (here or in another tab/device) -> on to casting
  useEffect(() => {
    if (user && emailVerified === true) router.replace(AFTER_AUTH_ROUTE)
  }, [user, emailVerified, router])

  // The link may have been clicked in another tab or on a phone: re-check
  // whenever the user comes back to this tab.
  useEffect(() => {
    if (!user || emailVerified !== false) return undefined
    const onFocus = () => dispatch(refreshVerification())
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [dispatch, user, emailVerified])

  // Resend cooldown tick
  useEffect(() => {
    if (cooldown <= 0) return undefined
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  const handleResend = async () => {
    if (sending || cooldown > 0) return
    setSending(true)
    setNotice('')
    setResendError('')
    try {
      const result = await dispatch(resendVerification()).unwrap()
      if (!result.alreadyVerified) {
        setNotice('Verification email sent. It can take a minute to arrive.')
        setCooldown(RESEND_COOLDOWN_SECONDS)
      }
    } catch (err) {
      setResendError(
        err?.message || 'We could not send the email. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  const handleUseDifferentEmail = () => {
    leaving.current = true
    dispatch(logout())
    router.replace(ROUTES.SIGNUP)
  }

  if (!initialized || !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </main>
    )
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body gap-4">
          <h1 className="card-title text-2xl">Check your email</h1>
          <p className="text-sm">
            We sent a verification link to{' '}
            <span className="font-semibold">{user.email}</span>. Click it to
            activate your account and start casting.
          </p>

          {!verificationEmailSent && !notice && (
            <div role="alert" className="alert alert-warning text-sm">
              <span>
                We could not send the email automatically. Use the button below
                to try again.
              </span>
            </div>
          )}

          {notice && (
            <div role="status" className="alert alert-success text-sm">
              <span>{notice}</span>
            </div>
          )}

          {resendError && (
            <div role="alert" className="alert alert-error text-sm">
              <span>{resendError}</span>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={handleResend}
            disabled={sending || cooldown > 0}
          >
            {sending
              ? 'Sending...'
              : cooldown > 0
                ? `Resend email in ${cooldown}s`
                : 'Resend email'}
          </button>

          <p className="text-xs opacity-60">
            Can&apos;t find it? Check your spam folder. The link expires after
            24 hours.
          </p>

          <button
            type="button"
            className="link link-primary text-center text-sm"
            onClick={handleUseDifferentEmail}
          >
            Use a different email
          </button>
        </div>
      </div>
    </main>
  )
}
