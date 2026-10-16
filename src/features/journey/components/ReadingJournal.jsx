import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Search } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import Card from '@/shared/components/Card'
import EmptyState from '@/shared/components/EmptyState'
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
    <Card
      title="Reading journal"
      description="Every hexagram you have cast, newest first."
      action={
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
      }
    >
      <label className="input w-full">
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
        <EmptyState
          className="mt-6"
          title="Your journal is empty"
          description="Every reading you cast is saved here."
          action={
            <Link href={ROUTES.CASTING} className="btn btn-primary btn-sm">
              Cast your first hexagram
            </Link>
          }
        />
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm opacity-70">
          No readings match your search. Try a different word or clear the
          filter.
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

      <ReadingDetailModal
        reading={selected}
        onClose={() => setSelected(null)}
      />
    </Card>
  )
}
