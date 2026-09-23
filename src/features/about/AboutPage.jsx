import { ROUTES } from '@/shared/constants/routes'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-base-100 text-base-content px-6">
      {/* Intro */}
      <section className="flex flex-col items-center text-center max-w-2xl pt-24 pb-16">
        <h1 className="text-5xl font-bold tracking-tight">
          About Smart I Ching
        </h1>
        <p className="text-xl text-base-content/70 mt-5 leading-relaxed">
          A 3,000-year-old system of wisdom, made easy to understand and easy to
          act on.
        </p>
      </section>

      {/* Why we built this */}
      <section className="max-w-2xl w-full pb-16">
        <h2 className="text-2xl font-semibold mb-4">Why we built this</h2>
        <p className="text-base-content/70 leading-relaxed">
          The I Ching has guided decisions for millennia, but its classical text
          is dense, symbolic, and hard to apply to modern life. Most people who
          are curious about it either give up trying to interpret the hexagrams
          themselves, or turn to shallow, generic apps that strip out the depth
          entirely. We built Smart I Ching because we wanted something in
          between — a real casting, read in the context of your real question,
          explained simply enough to actually use.
        </p>
      </section>

      {/* How it works */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full pb-16">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">Ask a Real Question</h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Bring whatever you're actually facing — a decision, a
              relationship, a moment of uncertainty. The reading is built around
              your question, not a generic prompt.
            </p>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">Cast Your Hexagram</h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Your hexagram is cast using the traditional method, then
              interpreted by the latest AI models — grounded in classical source
              texts, not guesswork.
            </p>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">Understand It Simply</h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              No classical Chinese literacy required. We explain what the
              reading means for your situation in plain, modern language you can
              actually use.
            </p>
          </div>
        </div>
      </section>

      {/* Sourcing / credibility */}
      <section className="max-w-2xl w-full pb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Grounded in the source material
        </h2>
        <p className="text-base-content/70 leading-relaxed">
          Every interpretation is grounded in respected translations and
          commentary — primarily Alfred Huang's <em>The Complete I Ching</em>,
          cross-referenced against Wilhelm/Baynes, Minford, and Blofeld. We
          treat the tradition with the respect it deserves; the AI's role is to
          make that depth accessible, not to replace it.
        </p>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center text-center max-w-2xl pb-24">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to see what it says?
        </h2>
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
