import { useEffect, useRef, useState } from 'react'
import { Maximize2, X } from 'lucide-react'
import Card from '@/shared/components/layout/Card'
import HexagramGlyph from '@/shared/components/hexagram/HexagramGlyph'
import { hexagramPattern } from '@/shared/utils/hexagram'
import Section from './Section'
import Passage from './Passage'

// Wraps the opening sections with the card artwork beside them. The card
// opens in a large popup on click. Once the main card scrolls out of view, a
// small floating thumbnail keeps it one click away. With no card (not
// uploaded yet) or a failed image, the sections render at full width.
function WithCardArtwork({ url, alt, children }) {
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(true)
  const dialogRef = useRef(null)
  const figureRef = useRef(null)

  const hasCard = Boolean(url) && !failed

  useEffect(() => {
    const el = figureRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasCard])

  if (!hasCard) {
    return <div className="space-y-6">{children}</div>
  }

  const openDialog = () => dialogRef.current?.showModal()

  return (
    <>
      <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="order-first md:order-last">
          <figure
            ref={figureRef}
            className="mx-auto w-full max-w-[16rem] md:sticky md:top-20 md:max-w-none"
          >
            <button
              type="button"
              onClick={openDialog}
              aria-label="Enlarge card artwork"
              className="relative block w-full cursor-zoom-in overflow-hidden rounded-box border border-base-300 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <img
                src={url}
                alt={alt}
                width={971}
                height={1651}
                decoding="async"
                onError={() => setFailed(true)}
                className="block h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-base-100/85 shadow-sm"
              >
                <Maximize2 className="size-3.5" />
              </span>
            </button>
            <figcaption className="mt-2 text-center text-xs opacity-60">
              Tap to enlarge
            </figcaption>
          </figure>
        </div>

        <div className="min-w-0 space-y-6">{children}</div>
      </div>

      {/* Floating thumbnail: shown only after the main card scrolls away */}
      <button
        type="button"
        onClick={openDialog}
        aria-label="View card artwork"
        tabIndex={inView ? -1 : 0}
        aria-hidden={inView}
        className={`fixed bottom-4 right-4 z-30 w-16 overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-lg transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-20 ${
          inView
            ? 'pointer-events-none translate-y-2 opacity-0'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <img src={url} alt="" className="block h-auto w-full" />
      </button>

      <dialog ref={dialogRef} className="modal" aria-label={alt}>
        <div className="modal-box relative w-auto max-w-[92vw] p-2 sm:p-3">
          <img
            src={url}
            alt={alt}
            className="mx-auto block h-auto max-h-[78vh] w-auto max-w-full rounded-box"
          />
          <form method="dialog">
            <button
              className="btn btn-circle btn-sm absolute right-3 top-3"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close">close</button>
        </form>
      </dialog>
    </>
  )
}

export default function HexagramCard({ hexagram }) {
  if (!hexagram) return null

  const {
    number,
    chinese_name,
    pinyin_name,
    english_name,
    upper_trigram,
    lower_trigram,
    line_values,
    card_image_url,
    overall_meaning,
    name_and_structure,
    judgment_text,
    judgment_commentary,
    image_text,
    image_commentary,
    lines,
    sequence
  } = hexagram

  const cardUrl =
    typeof card_image_url === 'string' && card_image_url.trim()
      ? card_image_url
      : null

  const sortedLines = lines
    ? [...lines].sort((a, b) => a.line_number - b.line_number)
    : []

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <HexagramGlyph
            pattern={hexagramPattern({ number, line_values })}
            size="lg"
            label={english_name}
          />

          <div className="min-w-0 flex-1">
            <p className="text-sm opacity-60">Hexagram {number}</p>
            <h2 className="font-serif text-5xl">{pinyin_name}</h2>
            <p className="mt-1 text-lg opacity-70">{english_name}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {upper_trigram && (
                <span className="badge badge-soft h-auto whitespace-normal py-1 text-left">
                  Upper: {upper_trigram.pinyin} · {upper_trigram.meaning}
                </span>
              )}
              {lower_trigram && (
                <span className="badge badge-soft h-auto whitespace-normal py-1 text-left">
                  Lower: {lower_trigram.pinyin} · {lower_trigram.meaning}
                </span>
              )}
            </div>
          </div>

          <div
            lang="zh"
            className="font-serif text-8xl leading-none opacity-80 sm:ml-auto"
          >
            {chinese_name}
          </div>
        </div>
      </Card>

      {/* key resets the "failed" state when switching hexagrams */}
      <WithCardArtwork
        key={number}
        url={cardUrl}
        alt={`Card artwork for hexagram ${number}, ${english_name}`}
      >
        <Section title="Overall Meaning" text={overall_meaning} lead />
        <Section title="The Image & the Name" text={name_and_structure} />
        <Section title="How We Got Here" text={sequence} />
      </WithCardArtwork>

      <Passage
        title="The Judgment"
        text={judgment_text}
        commentary={judgment_commentary}
      />

      <Passage
        title="The Image"
        text={image_text}
        commentary={image_commentary}
      />

      {sortedLines.length > 0 && (
        <Card
          title="The Lines"
          description="Six stages of change, from the bottom line up."
        >
          <ol className="divide-y divide-base-300">
            {sortedLines.map((line) => {
              const yang = line_values
                ? Boolean(line_values[line.line_number - 1])
                : undefined
              return (
                <li
                  key={line.line_number}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex w-14 shrink-0 flex-col items-center gap-2 pt-1">
                    <span className="grid size-7 place-items-center rounded-full bg-base-200 text-xs">
                      {line.line_number}
                    </span>
                    {yang !== undefined && (
                      <HexagramGlyph
                        pattern={yang ? 'y' : 'n'}
                        size="md"
                        label={yang ? 'Solid line' : 'Broken line'}
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="font-medium">{line.line_name}</div>
                    <p className="mt-1 whitespace-pre-line font-serif text-lg">
                      {line.text}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm opacity-70">
                      {line.commentary}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </Card>
      )}
    </div>
  )
}
