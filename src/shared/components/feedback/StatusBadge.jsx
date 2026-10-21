import { Check, Info, TriangleAlert, X } from 'lucide-react'

const TONES = {
  success: { className: 'badge-success', Icon: Check },
  warning: { className: 'badge-warning', Icon: TriangleAlert },
  error: { className: 'badge-error', Icon: X },
  info: { className: 'badge-info', Icon: Info }
}

// A status (Active, Paid, Payment issue...) as a solid colored badge with an
// icon, so it is easy to spot and does not rely on color alone.
//   tone  'success' | 'warning' | 'error' | 'info'
//   icon  optional lucide icon to use instead of the tone's default
export default function StatusBadge({
  tone = 'info',
  icon,
  className = '',
  children
}) {
  const { className: toneClass, Icon: DefaultIcon } = TONES[tone] || TONES.info
  const Icon = icon || DefaultIcon

  return (
    <span className={`badge gap-1 whitespace-nowrap ${toneClass} ${className}`}>
      <Icon className="size-4" aria-hidden="true" />
      {children}
    </span>
  )
}
