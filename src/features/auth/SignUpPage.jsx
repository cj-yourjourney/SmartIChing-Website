import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { AFTER_AUTH_ROUTE } from './constants'
import { clearAuthError, registerUser } from './state/authSlice'

function FieldError({ children }) {
  if (!children) return null
  return <p className="mt-1 text-sm text-error">{children}</p>
}

export default function SignUpPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized, status, error, fieldErrors } = useSelector(
    (s) => s.auth
  )

  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')
  const loading = status === 'loading'

  // Drop any stale error left over from the sign in page
  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  // Already signed in (or just signed up) -> leave this page
  useEffect(() => {
    if (initialized && user) router.replace(AFTER_AUTH_ROUTE)
  }, [initialized, user, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return

    // The backend has no confirm-password field; this is checked here only.
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.')
      return
    }
    setLocalError('')

    dispatch(registerUser({ first_name: firstName.trim(), email, password }))
  }

  const hasFieldErrors = Object.keys(fieldErrors).length > 0
  const emailExists = (fieldErrors.email || '').includes('already exists')

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form className="card-body gap-4" onSubmit={handleSubmit}>
          <h1 className="card-title text-2xl">Create your account</h1>
          <p className="text-sm opacity-70">
            Sign up to start casting and exploring the hexagrams.
          </p>

          {error && !hasFieldErrors && (
            <div role="alert" className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="first_name"
              className="mb-1 block text-sm font-medium"
            >
              First name
            </label>
            <input
              id="first_name"
              type="text"
              className="input input-bordered w-full"
              autoComplete="given-name"
              maxLength={30}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <FieldError>{fieldErrors.first_name}</FieldError>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FieldError>{fieldErrors.email}</FieldError>
            {emailExists && (
              <p className="mt-1 text-sm">
                <Link href={ROUTES.SIGNIN} className="link link-primary">
                  Go to sign in
                </Link>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input input-bordered w-full"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FieldError>{fieldErrors.password}</FieldError>
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="mb-1 block text-sm font-medium"
            >
              Confirm password
            </label>
            <input
              id="confirm_password"
              type="password"
              className="input input-bordered w-full"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FieldError>{localError}</FieldError>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link href={ROUTES.SIGNIN} className="link link-primary">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
