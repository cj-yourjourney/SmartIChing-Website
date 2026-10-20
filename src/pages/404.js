import Link from 'next/link'

// Hexagram 56, The Wanderer (Fire over Mountain), listed bottom line to top line.
// true = yang (solid), false = yin (broken). Colors match the app's yang/yin bars.
const WANDERER = [false, false, true, true, false, true]
const YANG = '#60a5fa'
const YIN = '#ea580c'

function Hexagram({ lines }) {
  // Render top line first, so reverse the bottom-to-top array.
  const topDown = [...lines].reverse()
  return (
    <div
      className="flex flex-col gap-2"
      role="img"
      aria-label="Hexagram 56, The Wanderer"
    >
      {topDown.map((isYang, i) =>
        isYang ? (
          <span
            key={i}
            className="block h-2.5 w-24 rounded-sm"
            style={{ background: YANG }}
          />
        ) : (
          <span key={i} className="flex w-24 justify-between">
            <span
              className="block h-2.5 w-[42%] rounded-sm"
              style={{ background: YIN }}
            />
            <span
              className="block h-2.5 w-[42%] rounded-sm"
              style={{ background: YIN }}
            />
          </span>
        )
      )}
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <Hexagram lines={WANDERER} />

      <h1 className="mt-10 font-serif text-3xl font-semibold text-base-content sm:text-4xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-base-content/70">
        There is nothing at this address. The link may be mistyped or the page
        may have moved.
      </p>

      <div className="mt-8">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>

      <p className="mt-10 font-serif text-sm italic text-base-content/50">
        Hexagram 56, The Wanderer
      </p>
    </main>
  )
}
