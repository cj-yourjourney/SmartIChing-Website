const TOTAL = 64

// reviewed: hexagram numbers the user has studied (all time).
// The 8x8 map is the full set, numbered in King Wen order.
export default function LearningProgress({ reviewed }) {
  const seen = new Set(reviewed)
  const count = seen.size

  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 className="font-serif text-2xl">Hexagrams studied</h2>
      <p className="text-sm opacity-70">
        {count} of {TOTAL} reviewed so far.
      </p>

      <progress
        className="progress progress-primary mt-4 h-2 w-full"
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
    </section>
  )
}
