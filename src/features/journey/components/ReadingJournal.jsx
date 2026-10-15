import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Search } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import ReadingCard from './ReadingCard'
import ReadingDetailModal from './ReadingDetailModal'

const PAGE_SIZE = 6

// readings: every casting, newest first (not limited by the range toggle).
export default function ReadingJournal({ readings }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all') // all | changing
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return readings.filter((r) => {
      if (filter === 'changing' && r.changingLines.length === 0) return false
      if (!q) return true
      return [
        r.question,
        r.primary.pinyin_name,
        r.primary.english_name,
        r.relating?.pinyin_name,
        r.relating?.english_name
      ]
        .filter(Boolean)
        .some((text) => text.toLowerCase().includes(q))
    })
  }, [readings, query, filter])

  const shown = filtered.slice(0, visible)

  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl">Reading journal</h2>
          <p className="text-sm opacity-70">
            Every hexagram you have cast, newest first.
          </p>
        </div>
        <div role="tablist" className="tabs tabs-box tabs-sm">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
            onClick={() => {
              setFilter('all')
              setVisible(PAGE_SIZE)
            }}
          >
            All
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'changing'}
            className={`tab ${filter === 'changing' ? 'tab-active' : ''}`}
            onClick={() => {
              setFilter('changing')
              setVisible(PAGE_SIZE)
            }}
          >
            With changing lines
          </button>
        </div>
      </div>

      <label className="input mt-5 w-full">
        <Search className="size-4 opacity-50" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setVisible(PAGE_SIZE)
          }}
          placeholder="Search by question or hexagram name"
          aria-label="Search readings"
        />
      </label>

      {readings.length === 0 ? (
        <div className="mt-8 rounded-box bg-base-200 p-8 text-center">
          <p className="font-serif text-xl">Your journal is empty</p>
          <p className="mt-1 text-sm opacity-70">
            Every reading you cast is saved here.
          </p>
          <Link href={ROUTES.CASTING} className="btn btn-primary btn-sm mt-4">
            Cast your first hexagram
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm opacity-70">
          No readings match your search. Try a different word or clear the filter.
        </p>
      ) : (
        <>
          <ul className="mt-5 space-y-3">
            {shown.map((reading) => (
              <li key={reading.id}>
                <ReadingCard reading={reading} onSelect={setSelected} />
              </li>
            ))}
          </ul>

          {filtered.length > visible && (
            <button
              type="button"
              className="btn btn-ghost mt-4 w-full"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              Show more
              <ChevronDown className="size-4" aria-hidden="true" />
            </button>
          )}
        </>
      )}

      <ReadingDetailModal reading={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
