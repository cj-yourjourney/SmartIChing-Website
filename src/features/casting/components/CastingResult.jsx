export default function CastingResult({
  originalHexagram,
  resultingHexagram,
  hasChangingLines,
  lines
}) {
  const changingCount = lines.filter((l) => l.changing).length

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h3 className="card-title font-serif">Your Hexagram</h3>
        <p className="text-lg">
          {originalHexagram.number ? `(${originalHexagram.number}) ` : ''}
          {originalHexagram.pinyin_name} · {originalHexagram.english_name}
        </p>

        {hasChangingLines && resultingHexagram && (
          <div className="mt-4 pt-4 border-t border-base-300">
            <p className="text-sm opacity-70 mb-1">
              {changingCount} changing line{changingCount > 1 ? 's' : ''} —
              moving toward:
            </p>
            <p className="text-lg">
              {resultingHexagram.number ? `(${resultingHexagram.number}) ` : ''}
              {resultingHexagram.pinyin_name} · {resultingHexagram.english_name}
            </p>
          </div>
        )}

        {!hasChangingLines && (
          <p className="text-sm opacity-70 mt-2">
            No changing lines — a settled reading.
          </p>
        )}
      </div>
    </div>
  )
}
