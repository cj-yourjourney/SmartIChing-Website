import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { AFTER_AUTH_ROUTE } from './constants'
import { verifyEmail } from './state/authSlice'

// The emailed link opens /verify-email?token=...; this page sends the token to
// the backend, which verifies the profile and returns tokens, so the user
// lands on the casting page already signed in.
export default function VerifyEmailPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((s) => s.auth.user)

  const [result, setResult] = useState({ status: 'verifying', message: '' })
  // The token is consumed once. Guards against React strict mode running the
  // effect twice in development.
  const started = useRef(false)

  useEffect(() => {
    if (!router.isReady || started.current) return
    started.current = true

    const raw = router.query.token
    const token = Array.isArray(raw) ? raw[0] : raw
    if (!token) {
      setResult({
        status: 'error',
        message: 'This verification link is incomplete.'
      })
      return
    }

    dispatch(verifyEmail(token))
      .unwrap()
      .then((res) => {
        // Replayed link while signed out (or into another account): nothing to
        // sign in with, so ask the user to sign in.
        if (res.alreadyVerified && !(res.user && res.emailVerified)) {
          setResult({ status: 'already', message: '' })
        } else {
          setResult({ status: 'success', message: '' })
        }
      })
      .catch((err) => {
        setResult({
          status: 'error',
          message: err?.message || 'We could not verify this link.'
        })
      })
  }, [router.isReady, router.query.token, dispatch])

  useEffect(() => {
    if (result.status !== 'success') return undefined
    const id = setTimeout(() => router.replace(AFTER_AUTH_ROUTE), 1200)
    return () => clearTimeout(id)
  }, [result.status, router])

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center gap-4 text-center">
          {result.status === 'verifying' && (
            <>
              <span className="loading loading-spinner loading-lg" />
              <h1 className="card-title text-2xl">Verifying your email...</h1>
            </>
          )}

          {result.status === 'success' && (
            <>
              <h1 className="card-title text-2xl">Email verified</h1>
              <p className="text-sm opacity-70">Taking you to casting...</p>
              <Link href={AFTER_AUTH_ROUTE} className="btn btn-primary w-full">
                Continue to casting
              </Link>
            </>
          )}

          {result.status === 'already' && (
            <>
              <h1 className="card-title text-2xl">Already verified</h1>
              <p className="text-sm opacity-70">
                This email is already verified. Sign in to continue.
              </p>
              <Link href={ROUTES.SIGNIN} className="btn btn-primary w-full">
                Sign in
              </Link>
            </>
          )}

          {result.status === 'error' && (
            <>
              <h1 className="card-title text-2xl">Link not valid</h1>
              <div role="alert" className="alert alert-error text-sm">
                <span>{result.message}</span>
              </div>
              {user ? (
                <Link
                  href={ROUTES.CHECK_EMAIL}
                  className="btn btn-primary w-full"
                >
                  Get a new link
                </Link>
              ) : (
                <>
                  <p className="text-sm opacity-70">
                    Sign in to request a new verification link.
                  </p>
                  <Link href={ROUTES.SIGNIN} className="btn btn-primary w-full">
                    Sign in
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
