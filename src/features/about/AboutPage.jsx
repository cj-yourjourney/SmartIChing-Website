import { ROUTES } from '@/shared/constants/routes'

// Hexagram 11, Tai (Peace): earth above heaven. Listed top line to bottom line.
const HEXAGRAM = ['broken', 'broken', 'broken', 'solid', 'solid', 'solid']

// Shared two-column grid: label column on the left, content on the right.
// Every section below uses it so the left and right edges line up.
const SPLIT = 'grid grid-cols-1 md:grid-cols-[17rem_1fr] gap-x-16 gap-y-6'

const TIMELINE = [
  {
    when: 'Childhood',
    title: 'Growing up with the I Ching',
    body: 'I was born and raised in China, in a family that lived by Chinese metaphysics. My mom is skilled in Feng Shui and BaZi, and my grandfather practiced the I Ching all his life. Every morning, and before any important decision, he cast a hexagram with three coins and a tortoise shell. I watched him do it for years, and it stayed with me.'
  },
  {
    when: 'Teenage years',
    title: 'Learning from my grandfather',
    body: 'Tossing the three coins fascinated me, so I asked my grandfather to teach me everything: how to cast a hexagram, what each of the 64 hexagrams means, and how to interpret every changing line. I read books and commentaries and watched videos on my own too. I have been asking the I Ching about my own big decisions ever since.'
  },
  {
    when: '2015',
    title: 'Moving to the US, becoming an engineer',
    body: 'I came to the US to study and later became a software engineer in San Francisco. For the next decade I built websites and apps, for companies and for my own startups.'
  },
  {
    when: '2025',
    title: 'Bringing the two together',
    body: 'I started using AI to interpret hexagrams and was surprised by how good it was. That raised a question: could I build an AI-powered I Ching site that helps people learn the hexagrams and understand their own castings? Smart I Ching is my answer, built from my love of the I Ching and my skills as an engineer.'
  }
]

const STEPS = [
  {
    title: 'Ask a real question',
    body: "Bring whatever you're actually facing: a decision, a relationship, a moment of uncertainty. The reading is built around your question, not a generic prompt."
  },
  {
    title: 'Cast your hexagram',
    body: 'Your hexagram is cast using the traditional method, then interpreted by the latest AI models, grounded in classical source texts, not guesswork.'
  },
  {
    title: 'Understand it simply',
    body: 'No classical Chinese literacy required. You get a plain, modern explanation of what the reading means for your situation.'
  }
]

const SOURCES = [
  { name: 'Alfred Huang, The Complete I Ching', primary: true },
  { name: 'Wilhelm/Baynes' },
  { name: 'Minford' },
  { name: 'Blofeld' }
]

function HexagramLine({ type }) {
  if (type === 'broken') {
    return (
      <div className="flex w-full gap-5">
        <div className="h-3 flex-1 rounded-full bg-primary" />
        <div className="h-3 flex-1 rounded-full bg-primary" />
      </div>
    )
  }
  return <div className="h-3 w-full rounded-full bg-primary" />
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5 text-primary"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      {/* Hero */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-12">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              About Smart I Ching
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-base-content/70">
              A 3,000-year-old system of wisdom, made easy to understand and
              easy to act on. Built by someone who grew up with it.
            </p>
          </div>

          <figure className="hidden shrink-0 md:block">
            <div
              aria-hidden="true"
              className="flex w-44 flex-col gap-4 rounded-box border border-base-300 bg-base-200 p-8"
            >
              {HEXAGRAM.map((type, i) => (
                <HexagramLine key={i} type={type} />
              ))}
            </div>
            <figcaption className="mt-3 text-center text-sm text-base-content/60">
              Hexagram 11, Tai (Peace)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Founder intro */}
      <section className="px-6 pb-20 md:pb-24">
        <div className={`mx-auto max-w-5xl items-center ${SPLIT}`}>
          <figure className="mx-auto w-56 md:mx-0 md:w-full">
            <img
              src="/images/about/cj-studio-portrait.webp"
              alt="Portrait of CJ, founder of Smart I Ching"
              width={900}
              height={1160}
              decoding="async"
              className="h-auto w-full rounded-box border border-base-300 shadow-lg"
            />
          </figure>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold sm:text-4xl">Hi, I'm CJ</h2>
            <p className="mt-2 text-sm text-base-content/60">
              Software engineer, lifelong I Ching student, founder of Smart I
              Ching
            </p>
            <p className="mt-6 text-lg leading-relaxed text-base-content/80">
              This site is personal to me. Here is how a kid who watched his
              grandfather toss coins every morning ended up building an AI I
              Ching app.
            </p>
          </div>
        </div>
      </section>

      {/* My story */}
      <section className="px-6 pb-20 md:pb-24">
        <div className={`mx-auto max-w-5xl ${SPLIT}`}>
          <h2 className="text-2xl font-semibold md:sticky md:top-8 md:self-start">
            My story
          </h2>
          <ul className="timeline timeline-vertical timeline-compact timeline-snap-icon">
            {TIMELINE.map((item, i) => (
              <li key={item.when}>
                {i > 0 && <hr className="bg-primary/30" />}
                <div className="timeline-middle">
                  <CheckIcon />
                </div>
                <div className="timeline-end !whitespace-normal mb-8 w-full rounded-box border border-base-300 bg-base-200 p-6">
                  <p className="text-sm font-semibold text-primary">
                    {item.when}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 font-normal leading-relaxed text-base-content/70">
                    {item.body}
                  </p>
                </div>
                {i < TIMELINE.length - 1 && <hr className="bg-primary/30" />}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why I built this */}
      <section className="px-6 pb-20 md:pb-24">
        <div className={`mx-auto max-w-5xl ${SPLIT}`}>
          <h2 className="text-2xl font-semibold">Why I built this</h2>
          <div className="space-y-4 text-lg leading-relaxed text-base-content/75">
            <p>
              The I Ching has guided decisions for millennia, but its classical
              text is dense, symbolic, and hard to apply to modern life. Most
              people who are curious about it either give up trying to interpret
              the hexagrams themselves, or turn to shallow, generic apps that
              strip out the depth entirely. I wanted something in between: a
              real casting, read in the context of your real question, explained
              simply enough to actually use.
            </p>
            <p>
              I use the smartest AI models available to interpret each casting
              in plain words and apply it to everyday life, so we can all make
              better, smarter decisions.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-semibold">How it works</h2>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="card border border-base-300 bg-base-200"
              >
                <div className="card-body gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  >
                    {i + 1}
                  </span>
                  <h3 className="card-title text-lg">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-base-content/70">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sourcing / credibility */}
      <section className="px-6 pb-20 md:pb-24">
        <div className={`mx-auto max-w-5xl ${SPLIT}`}>
          <h2 className="text-2xl font-semibold">
            Grounded in the source material
          </h2>
          <div>
            <p className="text-lg leading-relaxed text-base-content/75">
              Every interpretation is grounded in respected translations and
              commentary. I treat the tradition with the respect it deserves.
              The AI's role is to make that depth accessible, not to replace it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOURCES.map((s) => (
                <li
                  key={s.name}
                  className={`badge badge-lg ${
                    s.primary ? 'badge-primary' : 'badge-outline'
                  }`}
                >
                  {s.name}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-base-content/60">
              Huang is the primary source. The others are used to cross-check.
            </p>
          </div>
        </div>
      </section>

      {/* Closing belief */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <blockquote className="max-w-3xl border-l-4 border-primary pl-6 text-2xl font-semibold leading-snug sm:text-3xl">
            The 64 hexagrams are 64 situations we might meet in life, and
            together they describe the principles of the universe.
          </blockquote>
          <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-base-content/75">
            <p>
              I believe Chinese wisdom shows us how the universe works. I feel
              fortunate to have grown up in a household that introduced me to
              the I Ching. It helped me many times during the darkest moments of
              my life, when I needed guidance most. I hope this site helps more
              people understand the 64 hexagrams, make better decisions, and
              live a better life.
            </p>
            <p>
              This project sits where my passion and my skills meet. Thank you
              for being here.
            </p>
            <p className="font-semibold text-base-content">CJ</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="card mx-auto max-w-5xl border border-base-300 bg-base-200">
          <div className="card-body items-center py-14 text-center">
            <h2 className="text-3xl font-semibold">
              Ready to see what it says?
            </h2>
            <p className="max-w-md text-base-content/70">
              Ask your question and cast your first hexagram.
            </p>
            <div className="card-actions mt-4">
              <a
                href={ROUTES.CASTING}
                className="btn btn-primary btn-lg rounded-full"
              >
                Cast Your Hexagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
