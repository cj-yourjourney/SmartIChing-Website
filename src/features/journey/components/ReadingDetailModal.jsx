import { useEffect } from 'react'
import { ArrowRight, X } from 'lucide-react'
import HexagramGlyph from './HexagramGlyph'
import { formatReadingDate } from '../utils'

function describeLines(lines) {
  if (lines.length === 0) return 'No changing lines. This reading holds steady.'
  if (lines.length === 1) return `Line ${lines[0]} is changing.`
  const head = lines.slice(0, -1).join(', ')
  return `Lines ${head} and ${lines[lines.length - 1]} are changing.`
}

export default function ReadingDetailModal({ reading, onClose }) {
  useEffect(() => {
    if (!reading) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [reading, onClose])

  if (!reading) return null
  const { question, primary, relating, changingLines, castAt, summary } = reading

  return (
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reading-title"
    >
      <div className="modal-box max-w-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
        >
          <X className="size-4" />
        </button>

        <p className="text-sm opacity-60">{formatReadingDate(castAt)}</p>
        <h3 id="reading-title" className="mt-1 font-serif text-3xl">
          {question || 'Open reading'}
        </h3>
        {!question && (
          <p className="text-sm opacity-60">You did not ask a question for this cast.</p>
        )}

        <div className="mt-8 flex items-center justify-center gap-8">
          <figure className="flex flex-col items-center gap-3">
            <HexagramGlyph
              pattern={primary.lines_pattern}
              changing={changingLines}
              size="lg"
              label={primary.english_name}
            />
            <figcaption className="text-center">
              <div className="font-serif text-xl">
                {primary.number}. {primary.pinyin_name}
              </div>
              <div className="text-sm opacity-60">{primary.english_name}</div>
            </figcaption>
          </figure>

          {relating && (
            <>
              <ArrowRight className="size-5 opacity-40" aria-hidden="true" />
              <figure className="flex flex-col items-center gap-3">
                <HexagramGlyph
                  pattern={relating.lines_pattern}
                  size="lg"
                  label={relating.english_name}
                />
                <figcaption className="text-center">
                  <div className="font-serif text-xl">
                    {relating.number}. {relating.pinyin_name}
                  </div>
                  <div className="text-sm opacity-60">{relating.english_name}</div>
                </figcaption>
              </figure>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm opacity-70">
          {describeLines(changingLines)}
        </p>

        <div className="mt-6 rounded-box bg-base-200 p-4">
          <p className="max-w-prose">{summary}</p>
        </div>

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop cursor-default" onClick={onClose} />
    </div>
  )
}
