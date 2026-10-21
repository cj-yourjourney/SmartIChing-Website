import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setQuestion,
  startCasting,
  lineCast,
  resetCasting,
  castHexagram
} from './state/castingSlice'
import { castLine } from './utils/castLine'
import CoinToss from './components/CoinToss'
import CastingResult from './components/CastingResult'
import Card from '@/shared/components/layout/Card'
import ErrorAlert from '@/shared/components/feedback/ErrorAlert'
import HexagramGlyph from '@/shared/components/hexagram/HexagramGlyph'
import PageHeader from '@/shared/components/layout/PageHeader'
import SplitLayout from '@/shared/components/layout/SplitLayout'
import GatedPage from '@/features/account/components/GatedPage'

const EXAMPLES = [
  'What should I focus on this week?',
  'Is this the right time to make a change?',
  'How can I approach a difficult conversation?'
]

const STEPS = [
  'Ask a question, or leave it open for a general reading.',
  'Toss three coins for each line, building the hexagram from the bottom up.',
  'Read your hexagram, its changing lines, and where it is heading.'
]

export default function CastingPage() {
  const dispatch = useDispatch()
  const { question, lines, phase, result, error, subscriptionRequired } =
    useSelector((state) => state.casting)

  // Once the 6th line is cast, send everything to the backend. Guarded by
  // phase === 'casting' so this only fires once per cast: as soon as the
  // thunk goes pending, phase flips to 'submitting' and this stops matching.
  useEffect(() => {
    if (phase === 'casting' && lines.length === 6) {
      dispatch(castHexagram({ question, lines: lines.map((l) => l.sum) }))
    }
  }, [phase, lines, question, dispatch])

  function handleStart() {
    dispatch(startCasting())
  }

  function handleCastLine() {
    dispatch(lineCast(castLine()))
  }

  function handleCastRest() {
    for (let i = lines.length; i < 6; i++) dispatch(lineCast(castLine()))
  }

  function handleReset() {
    dispatch(resetCasting())
  }

  // Hexagram being built, bottom to top; '.' draws an empty slot.
  const pattern = Array.from(
    { length: 6 },
    (_, i) => lines[i]?.char ?? '.'
  ).join('')
  const changing = lines.flatMap((l, i) => (l.changing ? [i + 1] : []))
  const submitting =
    phase === 'submitting' || (phase === 'casting' && lines.length === 6)

  return (
    <GatedPage skeleton="split" subscriptionRequired={subscriptionRequired}>
      <PageHeader
        title="Cast a hexagram"
        description="Ask a question, toss three coins six times, and receive a reading for your situation."
      />

      {phase === 'idle' && (
        <SplitLayout
          aside={
            <Card title="How it works">
              <ol className="space-y-4">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-base-200 text-xs">
                      {i + 1}
                    </span>
                    <span className="text-sm opacity-80">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          }
        >
          <Card
            title="Your question"
            description="Optional. A clear, specific question gets a more personal reading."
          >
            <label htmlFor="casting-question" className="sr-only">
              Your question
            </label>
            <textarea
              id="casting-question"
              rows={4}
              value={question}
              onChange={(e) => dispatch(setQuestion(e.target.value))}
              className="textarea w-full"
              placeholder="What would you like guidance on?"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {EXAMPLES.map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => dispatch(setQuestion(text))}
                  className="btn btn-sm btn-ghost border-base-300"
                >
                  {text}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleStart}
              className="btn btn-primary mt-6"
            >
              Begin casting
            </button>
          </Card>
        </SplitLayout>
      )}

      {phase !== 'idle' && phase !== 'error' && phase !== 'complete' && (
        <SplitLayout
          asideFirst
          aside={
            <Card
              title="Your hexagram"
              description={`${lines.length} of 6 lines cast, from the bottom up.`}
            >
              <div className="mt-2 flex justify-center">
                <HexagramGlyph
                  pattern={pattern}
                  changing={changing}
                  size="xl"
                  label="Hexagram being cast"
                />
              </div>
              <p className="mt-6 min-h-5 text-center text-xs opacity-60">
                {changing.length > 0
                  ? 'Highlighted lines are changing lines.'
                  : ''}
              </p>
            </Card>
          }
        >
          <Card
            title={submitting ? undefined : `Line ${lines.length + 1} of 6`}
            description={
              submitting
                ? undefined
                : 'Each toss uses three coins. Heads counts 3, tails counts 2.'
            }
          >
            {submitting ? (
              <div
                className="flex min-h-64 flex-col items-center justify-center gap-3"
                aria-live="polite"
              >
                <span className="loading loading-spinner loading-md" />
                <p className="font-serif text-xl">Consulting the oracle…</p>
                <p className="text-sm opacity-70">This takes a few seconds.</p>
              </div>
            ) : (
              <>
                <CoinToss
                  lastCast={lines[lines.length - 1]}
                  castCount={lines.length}
                />

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCastLine}
                    className="btn btn-primary"
                  >
                    Toss the coins
                  </button>
                  {lines.length < 5 && (
                    <button
                      type="button"
                      onClick={handleCastRest}
                      className="btn btn-ghost"
                    >
                      Cast the remaining lines
                    </button>
                  )}
                </div>
              </>
            )}
          </Card>
        </SplitLayout>
      )}

      {phase === 'error' && (
        <ErrorAlert
          title="Something went wrong getting your reading."
          message={error}
          onRetry={handleReset}
        />
      )}

      {phase === 'complete' && result && (
        <>
          <CastingResult result={result} />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline"
            >
              Cast again
            </button>
          </div>
        </>
      )}
    </GatedPage>
  )
}
