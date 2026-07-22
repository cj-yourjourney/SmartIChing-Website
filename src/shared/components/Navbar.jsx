import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTES } from '@/shared/constants/routes'

const links = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.HEXAGRAM, label: 'Hexagram' }
]

export default function Navbar() {
  const router = useRouter()

  return (
    <div className="navbar bg-base-100 border-b border-base-300 justify-center">
      <ul className="menu menu-horizontal gap-2">
        {links.map(({ href, label }) => {
          const isActive = router.pathname === href
          return (
            <li key={href}>
              <Link href={href} className={isActive ? 'active font-bold' : ''}>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
