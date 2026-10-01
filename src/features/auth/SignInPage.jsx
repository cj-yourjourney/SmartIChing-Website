import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { AFTER_AUTH_ROUTE } from './constants'
import { clearAuthError, loginUser } from './state/authSlice'

export default function SignInPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized, status, error } = useSelector((s) => s.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loading = status === 'loading'

  // Drop any stale error left over from the sign up page
  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  // Already signed in (or just signed in) -> leave this page
  useEffect(() => {
    if (initialized && user) router.replace(AFTER_AUTH_ROUTE)
  }, [initialized, user, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    dispatch(loginUser({ email, password }))
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form className="card-body gap-4" onSubmit={handleSubmit}>
          <h1 className="card-title text-2xl">Sign in</h1>
          <p className="text-sm opacity-70">
            Welcome back. Sign in to continue.
          </p>

          {error && (
            <div role="alert" className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}

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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-center text-sm">
            New here?{' '}
            <Link href={ROUTES.SIGNUP} className="link link-primary">
              Create an account
            </Link>
          </p>
          <p className="text-center text-xs opacity-60">
            Already have an AgentSmartly account? Use the same email and
            password.
          </p>
        </form>
      </div>
    </main>
  )
}
