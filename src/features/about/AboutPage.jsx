import { ROUTES } from '@/shared/constants/routes'

// Hexagram 1 (Qian, The Creative) — six solid lines. Purely decorative.
// Swap in a broken line ('broken') on any row to draw a different hexagram.
const HEXAGRAM = ['solid', 'solid', 'solid', 'solid', 'solid', 'solid']

function HexagramLine({ type }) {
  if (type === 'broken') {
    return (
      <div className="flex gap-4 w-full">
        <div className="h-3 flex-1 rounded-full bg-primary" />
        <div className="h-3 flex-1 rounded-full bg-primary" />
      </div>
    )
  }
  return <div className="h-3 w-full rounded-full bg-primary" />
}

const TIMELINE = [
  {
    when: 'Childhood',
    title: 'Growing up with the I Ching',
    body: 'I was born and raised in China, in a family that lived by Chinese metaphysics. My mom is skilled in Feng Shui and BaZi, and my grandfather practiced the I Ching all his life. Every morning, and before any important decision, he cast a hexagram with three coins and a tortoise shell. I watched him do it for years, and it stayed with me.'
  },
  {
    when: 'Teenage years',
    title: 'Learning from my grandfather',
    body: 'Tossing the three coins fascinated me, so I asked my grandfather to teach me everything: how to cast a hexagram, what each of the 64 hexagrams means, and how to interpret every changing line. I read books, commentaries, and watched videos on my own too. I have been asking the I Ching about my own big decisions ever since.'
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
    title: 'Ask a Real Question',
    body: "Bring whatever you're actually facing: a decision, a relationship, a moment of uncertainty. The reading is built around your question, not a generic prompt."
  },
  {
    title: 'Cast Your Hexagram',
    body: 'Your hexagram is cast using the traditional method, then interpreted by the latest AI models, grounded in classical source texts, not guesswork.'
  },
  {
    title: 'Understand It Simply',
    body: 'No classical Chinese literacy required. You get a plain, modern explanation of what the reading means for your situation.'
  }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      {/* Hero */}
      <section className="px-6 pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
              About Smart I Ching
            </h1>
            <p className="text-xl text-base-content/70 mt-6 leading-relaxed max-w-xl">
              A 3,000-year-old system of wisdom, made easy to understand and
              easy to act on. Built by someone who grew up with it.
            </p>
          </div>

          {/* Hexagram graphic */}
          <div
            aria-hidden="true"
            className="hidden md:flex flex-col gap-4 w-40 p-8 rounded-box bg-base-200 border border-base-300"
          >
            {HEXAGRAM.map((type, i) => (
              <HexagramLine key={i} type={type} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder intro */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-8 items-center">
          <figure className="mx-auto sm:mx-0 w-48 sm:w-full">
            <img
              src="/images/about/cj-studio.webp"
              alt="Portrait of CJ, founder of Smart I Ching"
              width={900}
              height={1350}
              className="w-full aspect-[4/5] object-cover object-top rounded-box border border-base-300 shadow-lg"
            />
          </figure>
          <div>
            <h2 className="text-3xl font-semibold">Hi, I'm CJ</h2>
            <p className="text-sm text-base-content/60 mt-1">
              Software engineer, lifelong I Ching student, founder of Smart I
              Ching
            </p>
            <p className="text-lg text-base-content/80 leading-relaxed mt-5">
              This site is personal to me. Here is how a kid who watched his
              grandfather toss coins every morning ended up building an AI I
              Ching app.
            </p>
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
            {TIMELINE.map((item, i) => (
              <li key={item.when}>
                {i > 0 && <hr className="bg-primary/40" />}
                <div className="timeline-start text-lg font-semibold text-primary md:pr-2">
                  {item.when}
                </div>
                <div className="timeline-middle">
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
                </div>
                <div className="timeline-end timeline-box bg-base-200 border-base-300 shadow-none my-4 !whitespace-normal !text-base-content">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-base-content/70 leading-relaxed font-normal">
                    {item.body}
                  </p>
                </div>
                {i < TIMELINE.length - 1 && <hr className="bg-primary/40" />}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why I built this */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold mb-5">Why I built this</h2>
          <div className="space-y-4 text-base-content/75 leading-relaxed text-lg">
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
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.title}
                className="card bg-base-200 border border-base-300"
              >
                <div className="card-body">
                  <h3 className="card-title text-lg">{step.title}</h3>
                  <p className="text-sm text-base-content/70 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing / credibility */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div role="alert" className="alert alert-soft alert-info items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Grounded in the source material
              </h2>
              <p className="text-base-content/75 leading-relaxed">
                Every interpretation is grounded in respected translations and
                commentary, primarily Alfred Huang's{' '}
                <em>The Complete I Ching</em>, cross-referenced against
                Wilhelm/Baynes, Minford, and Blofeld. I treat the tradition with
                the respect it deserves. The AI's role is to make that depth
                accessible, not to replace it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing belief */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="divider mb-8" />
          <blockquote className="text-2xl sm:text-3xl font-semibold leading-snug">
            The 64 hexagrams are 64 situations we might meet in life, and
            together they describe the principles of the universe.
          </blockquote>
          <p className="text-base-content/70 leading-relaxed text-lg mt-8">
            I believe Chinese wisdom shows us how the universe works. I feel
            fortunate to have grown up in a household that introduced me to the
            I Ching. It helped me many times during the darkest moments of my
            life, when I needed guidance most. I hope this site helps more
            people understand the 64 hexagrams, make better decisions, and live
            a better life.
          </p>
          <p className="text-base-content/70 leading-relaxed text-lg mt-4">
            This project sits where my passion and my skills meet. Thank you for
            being here.
          </p>
          <p className="mt-6 font-semibold">CJ</p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-2xl card bg-base-200 border border-base-300">
          <div className="card-body items-center text-center py-12">
            <h2 className="text-2xl font-semibold">
              Ready to see what it says?
            </h2>
            <p className="text-base-content/70">
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
