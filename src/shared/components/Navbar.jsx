import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '@/shared/constants/routes'
import { logout } from '@/features/auth/state/authSlice'

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
    audience: 'member'
  },
  {
    href: ROUTES.CASTING,
    label: 'Casting',
    subtitle: 'Ask & cast',
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
            {visibleCenterLinks.map(({ href, label, subtitle }) => {
              const isActive = router.pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex flex-col items-center leading-tight py-2 ${
                      isActive ? 'active font-bold' : ''
                    }`}
                  >
                    <span>{label}</span>
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
                  <Link href={ROUTES.SIGNUP} className="btn btn-primary btn-sm">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
