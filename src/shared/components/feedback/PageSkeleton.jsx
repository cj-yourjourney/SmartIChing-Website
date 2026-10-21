import PageShell from '@/shared/components/layout/PageShell'
import SplitLayout from '@/shared/components/layout/SplitLayout'

// Full-page loading placeholder.
//   variant="default": title + two wide blocks
//   variant="split":   title + a narrow block beside a wide one
export default function PageSkeleton({ variant = 'default' }) {
  return (
    <PageShell>
      <div className="skeleton h-14 w-64" />
      {variant === 'split' ? (
        <SplitLayout
          asideFirst
          aside={<div className="skeleton h-96 w-full" />}
        >
          <div className="skeleton h-96 w-full" />
        </SplitLayout>
      ) : (
        <>
          <div className="skeleton h-28 w-full" />
          <div className="skeleton h-80 w-full" />
        </>
      )}
    </PageShell>
  )
}
