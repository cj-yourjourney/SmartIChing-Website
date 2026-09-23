import { ROUTES } from '@/shared/constants/routes'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-base-100 text-base-content px-6">
      {/* Hero */}
      <section className="flex flex-col items-center text-center max-w-2xl pt-24 pb-16">
        <h1 className="text-5xl font-bold tracking-tight">Smart I Ching</h1>
        <p className="text-xl text-base-content/70 mt-5 leading-relaxed">
          We use the latest AI models to cast and interpret the I Ching for your
          questions — ancient Chinese wisdom, explained in plain words.
        </p>

        <a
          href={ROUTES.CASTING}
          className="btn btn-primary btn-lg rounded-full mt-10"
        >
          Cast Your Hexagram
        </a>
      </section>

      {/* Feature highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full pb-20">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">Powered by the Latest AI</h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Every casting is interpreted by the smartest available LLM models,
              trained to read your question and situation with real nuance.
            </p>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">
              Ancient Wisdom, Modern Intelligence
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Smart I Ching combines thousands of years of Chinese wisdom with
              today's most capable AI — old insight, delivered in a new way.
            </p>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">Plain-Language Explanations</h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              No dense classical text to decode. We explain each hexagram in
              simple, everyday words so the wisdom is easy to understand and act
              on.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
