import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Lock, Menu, X } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import { logout } from '@/features/auth/state/authSlice'
import { fetchSubscription } from '@/features/account/state/accountSlice'
import SubscriptionBadge from './SubscriptionBadge'

// Links in the bar, in order. `audience` decides who sees each one;
// `gated` links show a lock when the subscription has lapsed.
const NAV_LINKS = [
  { href: ROUTES.ABOUT, label: 'About', audience: 'guest' },
  { href: ROUTES.HEXAGRAM, label: 'Hexagram', audience: 'member', gated: true },
  { href: ROUTES.CASTING, label: 'Casting', audience: 'member', gated: true },
  { href: ROUTES.JOURNEY, label: 'Journey', audience: 'member' },
  { href: ROUTES.ACCOUNT, label: 'Account', audience: 'member' }
]

// Soft highlight for the current page: light brand tint, not a solid fill.
const ACTIVE_CLASS = 'bg-primary/10 font-medium text-primary'

function NavLabel({ label, locked }) {
  return (
    <span className="flex items-center gap-1">
      {label}
      {locked && (
        <Lock
          className="size-4 opacity-60"
          role="img"
          aria-label="Subscription required"
        />
      )}
    </span>
  )
}

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
  const visibleLinks = NAV_LINKS.filter((l) => l.audience === audience)
  const lapsed = Boolean(subscription) && !subscription.has_access
  const greeting = `Hi, ${user?.first_name || 'there'}`

  return (
    <header className="relative border-b border-base-300 bg-base-100 px-4">
      {/* Same width as the page content, so the edges line up. */}
      <div className="navbar mx-auto max-w-6xl px-0">
        {/* Left: the site name links home on every screen size */}
        <div className="navbar-start">
          <Link href={ROUTES.HOME} className="font-serif text-3xl">
            <span className="text-primary">Smart</span> I Ching
          </Link>
        </div>

        {/* Center (desktop only). Rendered only after the stored session has
            been checked, so the wrong set of links never flashes. */}
        <div className="navbar-center hidden lg:flex">
          {initialized && (
            <nav aria-label="Main">
              <ul className="menu menu-horizontal gap-1 text-base">
                {visibleLinks.map(({ href, label, gated }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={router.pathname === href ? ACTIVE_CLASS : ''}
                    >
                      <NavLabel label={label} locked={gated && lapsed} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Right: subscription badge, desktop auth, and the mobile menu button */}
        <div className="navbar-end gap-2">
          {initialized && (
            <>
              {user && <SubscriptionBadge />}

              {/* Desktop auth */}
              {user ? (
                <div className="hidden items-center gap-2 lg:flex">
                  <span className="text-base opacity-70">{greeting}</span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-2 lg:flex">
                  <Link href={ROUTES.SIGNIN} className="btn btn-ghost btn-sm">
                    Sign in
                  </Link>
                  <Link href={ROUTES.SIGNUP} className="btn btn-outline btn-sm">
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
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
            Menu
          </button>
        </div>
      </div>

      {/* Mobile menu panel: a floating layer, so it may have a shadow */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full z-30 border-b border-base-300 bg-base-100 shadow-lg lg:hidden"
        >
          <ul className="menu w-full p-2 text-base">
            {user && <li className="menu-title">{greeting}</li>}
            {initialized &&
              visibleLinks.map(({ href, label, gated }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={router.pathname === href ? ACTIVE_CLASS : ''}
                  >
                    <NavLabel label={label} locked={gated && lapsed} />
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
        </nav>
      )}
    </header>
  )
}
