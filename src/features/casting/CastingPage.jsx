import { useSelector, useDispatch } from 'react-redux'
import {
  setQuestion,
  startCasting,
  lineCast,
  resetCasting
} from './state/castingSlice'
import { castLine } from './utils/castLine'
import CoinToss from './components/CoinToss'
import LineStack from './components/LineStack'
import CastingResult from './components/CastingResult'

export default function CastingPage() {
  const dispatch = useDispatch()
  const {
    question,
    lines,
    phase,
    originalHexagram,
    resultingHexagram,
    hasChangingLines
  } = useSelector((state) => state.casting)

  function handleStart() {
    dispatch(startCasting())
  }

  function handleCastLine() {
    dispatch(lineCast(castLine()))
  }

  function handleReset() {
    dispatch(resetCasting())
  }

  return (
    <main data-theme="" className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Cast Your Hexagram
        </h1>

        {phase === 'idle' && (
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <label className="form-control">
                <span className="label-text">Your question (optional)</span>
                <textarea
                  value={question}
                  onChange={(e) => dispatch(setQuestion(e.target.value))}
                  className="textarea textarea-bordered"
                  placeholder="What would you like guidance on?"
                />
              </label>
              <button onClick={handleStart} className="btn btn-primary mt-4">
                Begin Casting
              </button>
            </div>
          </div>
        )}

        {(phase === 'casting' || phase === 'complete') && (
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body items-center">
              <LineStack lines={lines} />

              {phase === 'casting' && (
                <>
                  <CoinToss lastCast={lines[lines.length - 1]} />
                  <button
                    onClick={handleCastLine}
                    className="btn btn-primary mt-4"
                  >
                    Cast Line {lines.length + 1} of 6
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {phase === 'complete' && (
          <>
            <CastingResult
              originalHexagram={originalHexagram}
              resultingHexagram={resultingHexagram}
              hasChangingLines={hasChangingLines}
              lines={lines}
            />
            <button onClick={handleReset} className="btn btn-outline w-full">
              Cast Again
            </button>
          </>
        )}
      </div>
    </main>
  )
}
