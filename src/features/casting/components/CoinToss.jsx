// Three coins for the line being cast. `castCount` changes with every toss,
// which remounts the row and replays the flip animation.
export default function CoinToss({ lastCast, castCount }) {
  if (!lastCast) {
    return (
      <div className="mt-8 flex flex-col items-center gap-4 py-4">
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-14 rounded-full border border-dashed border-base-300"
            />
          ))}
        </div>
        <p className="text-sm opacity-60">
          Your first toss builds the bottom line.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4 py-4">
      <div key={castCount} className="flex gap-4 [perspective:600px]">
        {lastCast.coins.map((coin, i) => {
          const heads = coin === 3
          return (
            <div
              key={i}
              role="img"
              aria-label={heads ? 'Heads' : 'Tails'}
              style={{ animationDelay: `${i * 90}ms` }}
              className={`coin-flip grid size-14 place-items-center rounded-full border text-sm font-medium ${
                heads
                  ? 'border-primary bg-primary text-primary-content'
                  : 'border-base-300 bg-base-200'
              }`}
            >
              {heads ? 'H' : 'T'}
            </div>
          )
        })}
      </div>

      <div className="text-center">
        <p className="font-serif text-xl">
          {lastCast.label}
          <span className="ml-2 font-sans text-sm opacity-60">
            total {lastCast.sum}
          </span>
        </p>
        {lastCast.changing && (
          <span className="badge badge-secondary badge-soft badge-sm mt-1">
            Changing line
          </span>
        )}
      </div>
    </div>
  )
}
