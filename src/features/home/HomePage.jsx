import { ROUTES } from '@/shared/constants/routes'

// Swap `src` for a real image when ready, e.g. '/images/home/hexagrams.webp'
// (served from the CloudFront images/* behavior). With no src, a placeholder shows.
const IMAGES = {
  hexagrams: {
    src: '/images/home/hexagrams.webp',
    label: 'Hexagram page',
    alt: 'A hexagram page showing its meaning, judgment, image, and six lines'
  },
  casting: {
    src: '/images/home/casting.webp',
    label: 'Casting result',
    alt: 'A casting result with the hexagram, changing lines, and an AI reading'
  }
}

const STATS = [
  { value: '64', label: 'hexagrams' },
  { value: '384', label: 'lines' },
  { value: '3,000+', label: 'years of wisdom' }
]

// Same yang/yin colors used on the hexagram and casting pages
const YANG = '#60a5fa'
const YIN = '#ea580c'

// Hexagram 11, Peace. Top line first. true = yang (solid), false = yin (broken)
const HERO_LINES = [false, false, false, true, true, true]

function HexagramMark({ lines, className = '' }) {
  return (
    <div
      className={`flex flex-col gap-2.5 ${className}`}
      role="img"
      aria-label="A hexagram"
    >
      {lines.map((yang, i) =>
        yang ? (
          <div
            key={i}
            className="h-2.5 rounded-full"
            style={{ backgroundColor: YANG }}
          />
        ) : (
          <div key={i} className="flex gap-3">
            <div
              className="h-2.5 flex-1 rounded-full"
              style={{ backgroundColor: YIN }}
            />
            <div
              className="h-2.5 flex-1 rounded-full"
              style={{ backgroundColor: YIN }}
            />
          </div>
        )
      )}
    </div>
  )
}

function FeatureImage({ src, label, alt }) {
  return (
    <div className="rounded-2xl bg-base-200 p-2 shadow-lg ring-1 ring-base-content/10">
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full aspect-[4/3] rounded-xl object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder image: ${label}`}
          className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-base-content/20 bg-base-100 flex flex-col items-center justify-center gap-3 text-base-content/40"
        >
          <span className="text-6xl leading-none" aria-hidden="true">
            ䷀
          </span>
          <span className="text-sm">{label}</span>
        </div>
      )}
    </div>
  )
}

function Reason({ title, children }) {
  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body p-7">
        <h3 className="card-title text-xl font-serif">{title}</h3>
        <p className="text-base-content/70 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function Feature({ title, text, cta, href, image, flip }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      <div className={flip ? 'md:order-2' : ''}>
        <h3 className="text-3xl font-serif font-bold tracking-tight mb-4">
          {title}
        </h3>
        <p className="text-lg text-base-content/70 leading-relaxed mb-7 max-w-md">
          {text}
        </p>
        <a href={href} className="btn btn-outline rounded-full">
          {cta}
        </a>
      </div>
      <div className={flip ? 'md:order-1' : ''}>
        <FeatureImage {...image} />
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-base-100 text-base-content px-6">
      {/* Hero */}
      <section className="flex flex-col items-center text-center max-w-2xl pt-20 md:pt-28 pb-14">
        <HexagramMark lines={HERO_LINES} className="w-20 mb-10" />
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Smart I Ching
        </h1>
        <p className="text-xl text-base-content/70 mt-6 leading-relaxed max-w-xl">
          Ancient Chinese wisdom in plain words, with an AI I Ching master to
          cast and interpret your questions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <a
            href={ROUTES.CASTING}
            className="btn btn-primary btn-lg rounded-full"
          >
            Cast Your Hexagram
          </a>
          <a
            href={ROUTES.HEXAGRAMS}
            className="btn btn-ghost btn-lg rounded-full"
          >
            Browse Hexagrams
          </a>
        </div>
      </section>

      {/* Numbers */}
      <section className="max-w-3xl w-full pb-24">
        <dl className="grid grid-cols-3 divide-x divide-base-content/10 rounded-2xl bg-base-200 py-6 shadow-sm">
          {STATS.map((s) => (
            <div key={s.label} className="px-3 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-3xl md:text-4xl font-serif font-bold">
                  {s.value}
                </span>
                <span className="block text-sm text-base-content/60 mt-1">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Why use Smart I Ching */}
      <section className="max-w-5xl w-full pb-28">
        <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-center mb-10">
          Why use Smart I Ching
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reason title="Ancient wisdom, made simple">
            The I Ching is over 3,000 years old, and its language can be hard to
            follow. We use simple words to explain every hexagram, every line,
            and every reading. Our content is cross-referenced with classic
            English translations, including Alfred Huang's{' '}
            <em>The Complete I Ching</em>.
          </Reason>
          <Reason title="An AI I Ching master">
            Each of the 64 hexagrams and 384 lines has its own meaning, which is
            a lot to remember. We use the smartest AI models to interpret your
            casting, so the AI does the heavy lifting and you get your reading
            quickly and easily.
          </Reason>
        </div>
      </section>

      {/* Core features */}
      <section className="max-w-5xl w-full space-y-20 md:space-y-28 pb-28">
        <Feature
          title="Hexagrams"
          text="Explore all 64 hexagrams. Each page covers the overall meaning, the judgment, the image, and all six lines, written so anyone can follow."
          cta="Browse Hexagrams"
          href={ROUTES.HEXAGRAMS}
          image={IMAGES.hexagrams}
        />
        <Feature
          flip
          title="Casting"
          text="Ask your question and cast. You get your hexagram, your changing lines, and a reading from the AI master, with practical guidance on what to do next."
          cta="Cast Your Hexagram"
          href={ROUTES.CASTING}
          image={IMAGES.casting}
        />
      </section>

      {/* Closing call to action */}
      <section className="max-w-3xl w-full text-center rounded-3xl bg-base-200 px-6 py-14 mb-24 shadow-sm">
        <HexagramMark
          lines={[true, false, true, false, true, false]}
          className="w-12 mx-auto mb-8 opacity-90"
        />
        <h2 className="text-3xl font-serif font-bold tracking-tight">
          Have a question on your mind?
        </h2>
        <p className="text-base-content/70 mt-3 mb-8">
          Cast a hexagram and get a clear reading in seconds.
        </p>
        <a
          href={ROUTES.CASTING}
          className="btn btn-primary btn-lg rounded-full"
        >
          Cast Your Hexagram
        </a>
      </section>
    </main>
  )
}
