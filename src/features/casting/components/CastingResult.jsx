import HexagramLines from '@/features/hexagram/components/HexagramLines'

export default function CastingResult({ result }) {
  const {
    hexagram,
    moving_lines,
    consulted_lines,
    resulting_hexagram,
    interpretation
  } = result

  const movingCount = moving_lines.length

  return (
    <div className="space-y-4">
      {/* Header: hexagram identity */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title font-serif">Your Hexagram</h3>
          <p className="text-lg">
            ({hexagram.number}) {hexagram.pinyin_name} · {hexagram.english_name}
          </p>

          {movingCount > 0 ? (
            <p className="text-sm opacity-70 mt-1">
              {movingCount} changing line{movingCount > 1 ? 's' : ''} (line
              {movingCount > 1 ? 's' : ''} {moving_lines.join(', ')})
              {resulting_hexagram && (
                <>
                  {' '}
                  — moving toward ({resulting_hexagram.number}){' '}
                  {resulting_hexagram.pinyin_name} ·{' '}
                  {resulting_hexagram.english_name}
                </>
              )}
            </p>
          ) : (
            <p className="text-sm opacity-70 mt-1">
              No changing lines — a settled reading.
            </p>
          )}
        </div>
      </div>

      {/* The AI interpretation — the main event */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title font-serif">Reading</h3>
          <p className="whitespace-pre-line leading-relaxed">
            {interpretation.reading}
          </p>

          {interpretation.guidance && (
            <div className="mt-4 pt-4 border-t border-base-300">
              <p className="text-sm font-semibold opacity-70 mb-1">Guidance</p>
              <p className="whitespace-pre-line leading-relaxed">
                {interpretation.guidance}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reference detail — collapsed by default, for anyone who wants the source text */}
      <div className="collapse collapse-arrow bg-base-100 shadow-xl border border-base-300">
        <input type="checkbox" />
        <div className="collapse-title font-serif text-lg">
          Source Text &amp; Details
        </div>
        <div className="collapse-content space-y-4">
          <div className="flex flex-col items-center text-center gap-2 pb-4 border-b border-base-300">
            <div className="text-5xl font-serif">{hexagram.chinese_name}</div>
            <p className="text-lg font-serif">
              ({hexagram.number}) {hexagram.pinyin_name} ·{' '}
              {hexagram.english_name}
            </p>
            <HexagramLines
              values={hexagram.line_values}
              size="sm"
              labels={{
                upper: `Upper: ${hexagram.upper_trigram?.pinyin} · ${hexagram.upper_trigram?.meaning}`,
                lower: `Lower: ${hexagram.lower_trigram?.pinyin} · ${hexagram.lower_trigram?.meaning}`
              }}
            />
          </div>

          <div>
            <p className="text-sm font-semibold opacity-70 mb-1">Judgment</p>
            <p className="whitespace-pre-line text-sm">
              {hexagram.judgment_text}
            </p>
            <p className="text-sm opacity-80 mt-2">
              {hexagram.judgment_commentary}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold opacity-70 mb-1">Image</p>
            <p className="whitespace-pre-line text-sm">{hexagram.image_text}</p>
            <p className="text-sm opacity-80 mt-2">
              {hexagram.image_commentary}
            </p>
          </div>

          {consulted_lines.length > 0 && (
            <div>
              <p className="text-sm font-semibold opacity-70 mb-1">
                Line Text{consulted_lines.length > 1 ? 's' : ''} Consulted
              </p>
              {consulted_lines.map((line) => (
                <div key={line.line_number} className="mb-3">
                  <p className="text-sm font-medium">{line.line_name}</p>
                  <p className="whitespace-pre-line text-sm">{line.text}</p>
                  <p className="text-sm opacity-80 mt-1">{line.commentary}</p>
                </div>
              ))}
            </div>
          )}

          {resulting_hexagram && (
            <div className="pt-2 border-t border-base-300">
              <p className="text-sm font-semibold opacity-70 mb-2">
                Resulting Hexagram
              </p>
              <div className="flex flex-col items-center text-center gap-2 mb-3">
                <div className="text-3xl font-serif">
                  {resulting_hexagram.chinese_name}
                </div>
                <p className="text-sm font-serif">
                  ({resulting_hexagram.number}) {resulting_hexagram.pinyin_name}{' '}
                  · {resulting_hexagram.english_name}
                </p>
                <HexagramLines
                  values={resulting_hexagram.line_values}
                  size="xs"
                  labels={{
                    upper: `Upper: ${resulting_hexagram.upper_trigram?.pinyin} · ${resulting_hexagram.upper_trigram?.meaning}`,
                    lower: `Lower: ${resulting_hexagram.lower_trigram?.pinyin} · ${resulting_hexagram.lower_trigram?.meaning}`
                  }}
                />
              </div>
              <p className="text-sm opacity-80">
                {resulting_hexagram.overall_meaning}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
