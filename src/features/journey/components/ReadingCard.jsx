import { ArrowRight } from 'lucide-react'
import HexagramGlyph from '../../../shared/components/HexagramGlyph'
import { formatReadingDate } from '../utils'

export default function ReadingCard({ reading, onSelect }) {
  const { question, primary, relating, changingLines, castAt } = reading

  return (
    <button
      type="button"
      onClick={() => onSelect(reading)}
      className="flex w-full items-center gap-5 rounded-box border border-base-300 bg-base-100 p-4 text-left transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <HexagramGlyph
          pattern={primary.lines_pattern}
          changing={changingLines}
          label={primary.english_name}
        />
        {relating && (
          <>
            <ArrowRight className="size-4 opacity-40" aria-hidden="true" />
            <HexagramGlyph
              pattern={relating.lines_pattern}
              label={relating.english_name}
            />
          </>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-serif text-xl leading-tight">
          {primary.number}. {primary.pinyin_name}
          <span className="ml-2 font-sans text-sm opacity-60">
            {primary.english_name}
          </span>
        </div>
        <div className="mt-1 line-clamp-1 text-sm opacity-80">
          {question || 'No question asked'}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="opacity-60">{formatReadingDate(castAt)}</span>
          {changingLines.length > 0 && (
            <span className="badge badge-secondary badge-soft badge-sm">
              {changingLines.length} changing{' '}
              {changingLines.length === 1 ? 'line' : 'lines'}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
