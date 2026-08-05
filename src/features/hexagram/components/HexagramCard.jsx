import Section from './Section'

export default function HexagramCard({ hexagram }) {
  if (!hexagram) return null

  const {
    number,
    chinese_name,
    pinyin_name,
    english_name,
    upper_trigram,
    lower_trigram,
    description,
    judgment_text,
    judgment_commentary,
    image_text,
    image_commentary,
    lines
  } = hexagram

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          <div className="text-6xl font-serif">{chinese_name}</div>
          <h2 className="card-title text-2xl font-serif">
            ({number}) {pinyin_name} · {english_name}
          </h2>
          <div className="flex gap-4 text-sm opacity-70">
            <span>
              Upper: {upper_trigram?.pinyin} · {upper_trigram?.meaning}
            </span>
            <span>
              Lower: {lower_trigram?.pinyin} · {lower_trigram?.meaning}
            </span>
          </div>
        </div>
      </div>

      <Section title="Description" text={description} />

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
                className="border-l-4 border-primary pl-4"
              >
                <div className="font-semibold">{line.line_name}</div>
                <p className="whitespace-pre-line font-mono">{line.text}</p>
                <p className="text-sm italic opacity-70 mt-1">
                  {line.commentary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
