import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { logout } from '@/features/auth/state/authSlice'
import { useEffect } from 'react'
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
  }
]

export default function Navbar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized } = useSelector((s) => s.auth)

  const handleLogout = () => {
    dispatch(logout())
    router.push(ROUTES.HOME)
  }

  const audience = user ? 'member' : 'guest'
  const visibleCenterLinks = centerLinks.filter((l) => l.audience === audience)

  const { subscription, subscriptionStatus } = useSelector((s) => s.account)

  // Load subscription state once per sign-in so the badge shows on every page.
  useEffect(() => {
    if (user && !subscription && subscriptionStatus === 'idle') {
      dispatch(fetchSubscription())
    }
  }, [user, subscription, subscriptionStatus, dispatch])

  const lapsed = Boolean(subscription) && !subscription.has_access

  return (
    <div className="navbar bg-base-100 border-b border-base-300">
      {/* Far left: Home */}
      <div className="navbar-start">
        <ul className="menu menu-horizontal">
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

      {/* Center: About for guests, Hexagram + Casting for signed-in users.
          Rendered only after the stored session has been checked, so the
          wrong set of links never flashes. */}
      <div className="navbar-center">
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

      
      {/* Far right: auth */}
      <div className="navbar-end">
        {initialized && (
          <div className="flex items-center gap-2">
            {user && <SubscriptionBadge />}
            <ul className="menu menu-horizontal items-center gap-2">
              {user ? (
                <>
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
                </>
              ) : (
                <>
                  <li>
                    <Link href={ROUTES.SIGNIN}>Sign in</Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.SIGNUP}
                      className="btn btn-primary btn-sm"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
