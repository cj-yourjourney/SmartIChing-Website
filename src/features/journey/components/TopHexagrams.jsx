import { useMemo } from 'react'
import HexagramGlyph from './HexagramGlyph'

// readings: the castings inside the selected range.
export default function TopHexagrams({ readings }) {
  const top = useMemo(() => {
    const counts = new Map()
    readings.forEach(({ primary }) => {
      const entry = counts.get(primary.number) || { hexagram: primary, count: 0 }
      entry.count += 1
      counts.set(primary.number, entry)
    })
    return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 5)
  }, [readings])

  const max = top[0]?.count || 1

  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 className="font-serif text-2xl">Hexagrams you cast most</h2>

      {top.length === 0 ? (
        <p className="mt-4 text-sm opacity-70">
          No castings in this period. Cast a hexagram and it will show up here.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {top.map(({ hexagram, count }) => (
            <li key={hexagram.number} className="flex items-center gap-4">
              <HexagramGlyph
                pattern={hexagram.lines_pattern}
                size="sm"
                label={hexagram.english_name}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="truncate font-medium">
                    {hexagram.number}. {hexagram.pinyin_name}
                    <span className="ml-2 text-sm font-normal opacity-60">
                      {hexagram.english_name}
                    </span>
                  </div>
                  <div className="text-sm opacity-70">{count}×</div>
                </div>
                <progress
                  className="progress progress-primary mt-1 h-1.5 w-full"
                  value={count}
                  max={max}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
