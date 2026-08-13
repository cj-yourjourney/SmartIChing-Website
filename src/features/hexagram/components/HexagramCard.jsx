import Section from './Section'
import HexagramLines from './HexagramLines'

export default function HexagramCard({ hexagram }) {
  if (!hexagram) return null

  const {
    number,
    chinese_name,
    pinyin_name,
    english_name,
    upper_trigram,
    lower_trigram,
    line_values,
    overall_meaning,
    name_and_structure,
    judgment_text,
    judgment_commentary,
    image_text,
    image_commentary,
    lines,
    sequence
  } = hexagram

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          <div className="flex items-center gap-6">
            <div className="text-6xl font-serif">{chinese_name}</div>
            <HexagramLines values={line_values} />
          </div>
          <h2 className="card-title text-2xl font-serif">
            ({number}) {pinyin_name} · {english_name}
          </h2>
          <div className="flex flex-col items-center gap-2 text-sm opacity-70">
            <span className="flex items-center gap-2">
              Upper: {upper_trigram?.pinyin} · {upper_trigram?.meaning}
              <HexagramLines values={line_values?.slice(3, 6)} size="xs" />
            </span>
            <span className="flex items-center gap-2">
              Lower: {lower_trigram?.pinyin} · {lower_trigram?.meaning}
              <HexagramLines values={line_values?.slice(0, 3)} size="xs" />
            </span>
          </div>
        </div>
      </div>

      <Section title="Overall Meaning" text={overall_meaning} />

      <Section title="The Image & the Name" text={name_and_structure} />

      <Section title="How We Got Here" text={sequence} />

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title font-serif">The Judgment</h3>
          <p className="whitespace-pre-line leading-relaxed font-mono">
            {judgment_text}
          </p>
          <p className="whitespace-pre-line leading-relaxed italic opacity-90 mt-3">
            {judgment_commentary}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title font-serif">The Image</h3>
          <p className="whitespace-pre-line leading-relaxed font-mono">
            {image_text}
          </p>
          <p className="whitespace-pre-line leading-relaxed italic opacity-90 mt-3">
            {image_commentary}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title font-serif">The Lines</h3>
          <div className="space-y-4">
            {lines?.map((line) => (
              <div
                key={line.line_number}
                className="flex gap-4 border-l-4 border-primary pl-4"
              >
                <div className="flex-shrink-0 pt-1">
                  <div className="w-10 h-1">
                    {line_values?.[line.line_number - 1] ? (
                      <div className="w-full h-full bg-base-content rounded-sm" />
                    ) : (
                      <div className="w-full h-full flex justify-between">
                        <div className="w-[45%] h-full bg-base-content rounded-sm" />
                        <div className="w-[45%] h-full bg-base-content rounded-sm" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">{line.line_name}</div>
                  <p className="whitespace-pre-line font-mono">{line.text}</p>
                  <p className="text-sm italic opacity-70 mt-1">
                    {line.commentary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
