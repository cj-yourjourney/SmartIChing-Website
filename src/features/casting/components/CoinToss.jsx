export default function CoinToss({ lastCast }) {
  if (!lastCast) {
    return (
      <p className="text-sm opacity-60 mt-4 text-center max-w-xs">
        Toss three coins for each line, building the hexagram from the bottom
        up.
      </p>
    )
  }

  return (
    <div className="mt-4 text-center">
      <div className="flex gap-2 justify-center">
        {lastCast.coins.map((coin, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-sm font-semibold"
          >
            {coin === 3 ? 'H' : 'T'}
          </div>
        ))}
      </div>
      <p className="text-sm mt-2 opacity-70">
        Sum: {lastCast.sum} — {lastCast.label}
      </p>
    </div>
  )
}
