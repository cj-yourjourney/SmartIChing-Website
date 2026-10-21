// The outer frame of every page: background, width and spacing between blocks.
// For pages the paywall can block, pass `blocked` and `overlay`: the content is
// dimmed and made inert, and the overlay is drawn on top.
export default function PageShell({
  children,
  blocked = false,
  overlay = null,
  className = ''
}) {
  return (
    <main className="relative min-h-screen bg-base-200 px-4 py-10">
      <div
        inert={blocked}
        aria-hidden={blocked || undefined}
        className={`mx-auto max-w-6xl space-y-6 ${className}`}
      >
        {children}
      </div>
      {blocked && overlay}
    </main>
  )
}
