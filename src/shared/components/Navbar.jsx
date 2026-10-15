import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { logout } from '@/features/auth/state/authSlice'
import { fetchSubscription } from '@/features/account/state/accountSlice'
import SubscriptionBadge from './SubscriptionBadge'

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-3 h-3 opacity-60"
    role="img"
    aria-label="Subscription required"
  >
    <path
      fillRule="evenodd"
      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
      clipRule="evenodd"
    />
  </svg>
)

// Center links. `audience` decides who sees each one.
const centerLinks = [
  {
    href: ROUTES.ABOUT,
    label: 'About',
    subtitle: 'Our story',
    audience: 'guest'
  },
  {
    href: ROUTES.HEXAGRAM,
    label: 'Hexagram',
    subtitle: 'Browse all 64',
    audience: 'member',
    gated: true
  },
  {
    href: ROUTES.CASTING,
    label: 'Casting',
    subtitle: 'Ask & cast',
    audience: 'member',
    gated: true
  },
  {
    href: ROUTES.ACCOUNT,
    label: 'Account',
    subtitle: 'Plan & billing',
    audience: 'member'
  },
  {
    href: ROUTES.JOURNEY,
    label: 'Journey',
    subtitle: 'Your progress',
    audience: 'member'
  }
]

export default function Navbar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized } = useSelector((s) => s.auth)
  const { subscription, subscriptionStatus } = useSelector((s) => s.account)
  const [menuOpen, setMenuOpen] = useState(false)

  // Load subscription state once per sign-in so the badge shows on every page.
  useEffect(() => {
    if (user && !subscription && subscriptionStatus === 'idle') {
      dispatch(fetchSubscription())
    }
  }, [user, subscription, subscriptionStatus, dispatch])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    const close = () => setMenuOpen(false)
    router.events.on('routeChangeStart', close)
    return () => router.events.off('routeChangeStart', close)
  }, [router.events])

  const handleLogout = () => {
    setMenuOpen(false)
    dispatch(logout())
    router.push(ROUTES.HOME)
  }

  const audience = user ? 'member' : 'guest'
  const visibleCenterLinks = centerLinks.filter((l) => l.audience === audience)
  const lapsed = Boolean(subscription) && !subscription.has_access

  return (
    <div className="navbar relative bg-base-100 border-b border-base-300 px-4">
      {/* Left: site name on mobile (links home), Home link on desktop */}
      <div className="navbar-start">
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold tracking-tight lg:hidden"
        >
          <span className="text-primary">Smart</span> I Ching
        </Link>

        <ul className="menu menu-horizontal hidden lg:flex">
          <li>
            <Link
              href={ROUTES.HOME}
              className={
                router.pathname === ROUTES.HOME ? 'active font-bold' : ''
              }
            >
              Home
            </Link>
          </li>
        </ul>
      </div>

      {/* Center (desktop only). Rendered only after the stored session has
          been checked, so the wrong set of links never flashes. */}
      <div className="navbar-center hidden lg:flex">
        {initialized && (
          <ul className="menu menu-horizontal gap-2">
            {visibleCenterLinks.map(({ href, label, subtitle, gated }) => {
              const isActive = router.pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex flex-col items-center leading-tight py-2 ${
                      isActive ? 'active font-bold' : ''
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {gated && lapsed && <LockIcon />}
                    </span>
                    {subtitle && (
                      <span className="text-xs opacity-60 font-normal">
                        {subtitle}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Right: trial badge, desktop auth, and the mobile Menu button */}
      <div className="navbar-end gap-2">
        {initialized && (
          <>
            {user && <SubscriptionBadge />}

            {/* Desktop auth */}
            {user ? (
              <ul className="menu menu-horizontal items-center gap-2 hidden lg:flex">
                <li>
                  <span className="text-sm opacity-70">
                    Hi, {user.first_name || 'there'}
                  </span>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Sign out
                  </button>
                </li>
              </ul>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href={ROUTES.SIGNIN} className="btn btn-ghost btn-sm">
                  Sign in
                </Link>
                <Link href={ROUTES.SIGNUP} className="btn btn-primary btn-sm">
                  Sign up
                </Link>
              </div>
            )}
          </>
        )}

        {/* Mobile menu button */}
        <button
          type="button"
          className="btn btn-outline btn-sm gap-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                menuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              }
            />
          </svg>
          Menu
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-30 border-b border-base-300 bg-base-100 shadow-lg lg:hidden">
          <ul className="menu w-full p-2">
            {user && (
              <li className="menu-title">Hi, {user.first_name || 'there'}</li>
            )}
            <li>
              <Link
                href={ROUTES.HOME}
                className={router.pathname === ROUTES.HOME ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            {initialized &&
              visibleCenterLinks.map(({ href, label, subtitle, gated }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={router.pathname === href ? 'active' : ''}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {gated && lapsed && <LockIcon />}
                    </span>
                    {subtitle && (
                      <span className="text-xs opacity-60">{subtitle}</span>
                    )}
                  </Link>
                </li>
              ))}
            {initialized && user && (
              <li>
                <button type="button" onClick={handleLogout}>
                  Sign out
                </button>
              </li>
            )}
            {initialized && !user && (
              <>
                <li>
                  <Link href={ROUTES.SIGNIN}>Sign in</Link>
                </li>
                <li>
                  <Link href={ROUTES.SIGNUP}>Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
