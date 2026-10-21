// Main content (2 of 3 columns) beside a side column (1 of 3).
// On phones everything is one column, in the order written here.
//   aside       the side column (a Card, a picker, a stack of Cards)
//   asideFirst  side column on the left, and first on phones
//   sticky      keep the side column in view while scrolling (desktop only)
export default function SplitLayout({
  aside,
  asideFirst = false,
  sticky = false,
  className = '',
  children
}) {
  const side = (
    <div className={`space-y-6 ${sticky ? 'lg:sticky lg:top-6' : ''}`}>
      {aside}
    </div>
  )

  return (
    <div className={`grid items-start gap-6 lg:grid-cols-3 ${className}`}>
      {asideFirst && side}
      <div className="min-w-0 space-y-6 lg:col-span-2">{children}</div>
      {!asideFirst && side}
    </div>
  )
}
