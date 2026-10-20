import Link from 'next/link'

// Hexagram 56, The Wanderer (Fire over Mountain), listed bottom line to top line.
// true = yang (solid), false = yin (broken). Colors match the app's yang/yin bars.
const WANDERER = [false, false, true, true, false, true]
const YANG = '#60a5fa'
const YIN = '#ea580c'

function Hexagram({ lines }) {
  const topDown = [...lines].reverse()
  return (
    <div
      className="flex flex-col gap-3"
      role="img"
      aria-label="Hexagram 56, The Wanderer"
    >
      {topDown.map((isYang, i) =>
        isYang ? (
          <span
            key={i}
            className="block h-3 w-32 rounded-sm"
            style={{ background: YANG }}
          />
        ) : (
          <span key={i} className="flex w-32 justify-between">
            <span
              className="block h-3 w-[42%] rounded-sm"
              style={{ background: YIN }}
            />
            <span
              className="block h-3 w-[42%] rounded-sm"
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
    <main className="mx-auto flex min-h-[75vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <Hexagram lines={WANDERER} />

      <h1 className="mt-14 font-serif text-5xl font-semibold text-base-content sm:text-6xl">
        Page not found
      </h1>

      <p className="mt-5 text-xl text-base-content/60">
        There is nothing at this address.
      </p>

      <Link href="/" className="btn btn-primary btn-lg mt-10 px-10 text-lg">
        Back to home
      </Link>
    </main>
  )
}
