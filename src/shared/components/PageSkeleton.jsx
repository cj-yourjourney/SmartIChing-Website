import PageShell from './PageShell'

// Full-page loading placeholder.
//   variant="default": title + two wide blocks
//   variant="split":   title + a narrow block beside a wide one
export default function PageSkeleton({ variant = 'default' }) {
  return (
    <PageShell>
      <div className="skeleton h-14 w-64" />
      {variant === 'split' ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="skeleton h-96 w-full" />
          <div className="skeleton h-96 w-full lg:col-span-2" />
        </div>
      ) : (
        <>
          <div className="skeleton h-28 w-full" />
          <div className="skeleton h-80 w-full" />
        </>
      )}
    </PageShell>
  )
}
