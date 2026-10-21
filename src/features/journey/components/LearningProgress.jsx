import Card from '@/shared/components/layout/Card'

const TOTAL = 64

// reviewed: hexagram numbers the user has studied (all time).
// The 8x8 map is the full set, numbered in King Wen order.
export default function LearningProgress({ reviewed }) {
  const seen = new Set(reviewed)
  const count = seen.size

  return (
    <Card
      title="Hexagrams studied"
      description={`${count} of ${TOTAL} reviewed so far.`}
    >
      <progress
        className="progress progress-primary h-2 w-full"
        value={count}
        max={TOTAL}
        aria-label="Hexagrams reviewed"
      />

      <div className="mt-5 grid grid-cols-8 gap-1.5">
        {Array.from({ length: TOTAL }, (_, i) => {
          const n = i + 1
          const done = seen.has(n)
          return (
            <div
              key={n}
              title={`Hexagram ${n}${done ? ' (reviewed)' : ''}`}
              className={`grid aspect-square place-items-center rounded-md text-[11px] leading-none ${
                done
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-200 text-base-content/40'
              }`}
            >
              {n}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
