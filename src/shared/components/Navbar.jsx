import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTES } from '@/shared/constants/routes'

const links = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.HEXAGRAM, label: 'Hexagram', subtitle: 'Browse all 64' },
  { href: ROUTES.CASTING, label: 'Casting', subtitle: 'Ask & cast' }
]

export default function Navbar() {
  const router = useRouter()

  return (
    <div className="navbar bg-base-100 border-b border-base-300 justify-center">
      <ul className="menu menu-horizontal gap-2">
        {links.map(({ href, label, subtitle }) => {
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
    </div>
  )
}
