import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Card from '@/shared/components/layout/Card'
import ErrorAlert from '@/shared/components/feedback/ErrorAlert'
import HexagramGlyph from '@/shared/components/hexagram/HexagramGlyph'
import { hexagramPattern } from '@/shared/utils/hexagram'

export default function HexagramPicker({
  hexagrams,
  selectedNumber,
  hasSelection,
  onSelect,
  listLoading,
  listError
}) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return hexagrams
    return hexagrams.filter((h) => {
      if (/^\d+$/.test(q)) return String(h.number) === q
      return [h.pinyin_name, h.english_name]
        .filter(Boolean)
        .some((text) => text.toLowerCase().includes(q))
    })
  }, [hexagrams, query])

  return (
    <Card
      title="Choose a hexagram"
      description="All 64, in King Wen order. Pick one to read it."
    >
      <label className="input w-full">
        <Search className="size-4 opacity-50" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by number or name"
          aria-label="Search hexagrams"
        />
      </label>

      {listError && <ErrorAlert message={listError} className="mt-4" />}

      <div className="mt-4 max-h-80 overflow-y-auto pr-1 lg:max-h-[calc(100vh-18rem)]">
        {listLoading && hexagrams.length === 0 ? (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="skeleton h-20 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-6 text-center text-sm opacity-70">
            No hexagrams match your search.
          </p>
        ) : (
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
            {filtered.map((h) => {
              const active = hasSelection && h.number === selectedNumber
              const name = `${h.number}. ${h.pinyin_name} · ${h.english_name}`
              return (
                <li key={h.number}>
                  <button
                    type="button"
                    onClick={() => onSelect(h.number)}
                    aria-pressed={active}
                    aria-label={name}
                    title={name}
                    className={`flex w-full flex-col items-center gap-1.5 rounded-box border p-2 transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                      active
                        ? 'border-primary bg-primary/10'
                        : 'border-base-300 hover:border-primary/50'
                    }`}
                  >
                    <HexagramGlyph
                      pattern={hexagramPattern(h)}
                      size="sm"
                      label={h.english_name}
                    />
                    <span className="text-xs">{h.number}</span>
                    <span className="w-full truncate text-center text-[11px] opacity-60">
                      {h.pinyin_name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Card>
  )
}
