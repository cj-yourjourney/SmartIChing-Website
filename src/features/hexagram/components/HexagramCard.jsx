import Section from './Section'
import RefRow from './RefRow'

export default function HexagramCard({ hexagram }) {
  if (!hexagram) return null

  const {
    number,
    chinese_name,
    pinyin_name,
    english_name,
    upper_trigram,
    lower_trigram,
    at_a_glance,
    name_and_structure,
    how_we_got_here,
    judgment,
    commentary_on_judgment,
    imagery,
    lines,
    explanation,
    line_by_line_explanation,
    quick_reference
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
              Upper: {upper_trigram?.pinyin} · {upper_trigram?.chinese_meaning}
            </span>
            <span>
              Lower: {lower_trigram?.pinyin} · {lower_trigram?.chinese_meaning}
            </span>
          </div>
        </div>
      </div>

      <Section title="At a Glance" text={at_a_glance} />
      <Section title="Name and Structure" text={name_and_structure} />
      <Section title="How We Got Here" text={how_we_got_here} />
      <Section title="Judgment" text={judgment} mono />
      <Section
        title="Commentary on the Judgment"
        text={commentary_on_judgment}
        italic
      />
      <Section title="The Imagery" text={imagery} italic />

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title font-serif">The Lines</h3>
          <div className="space-y-4">
            {lines?.map((line) => (
              <div
                key={line.line_number}
                className="border-l-4 border-primary pl-4"
              >
                <div className="font-semibold">
                  {line.line_number}. {line.line_name}
                </div>
                <p className="whitespace-pre-line">{line.text}</p>
                <p className="text-sm italic opacity-70 mt-1">
                  {line.commentary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section title="Explanation" text={explanation} />

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title font-serif">Line-by-Line Explanation</h3>
          <div className="space-y-4">
            {line_by_line_explanation?.map((line) => (
              <div
                key={line.line_number}
                className="border-l-4 border-secondary pl-4"
              >
                <div className="font-semibold">
                  ({line.line_number}) Alternates to{' '}
                  {line.alternates_to?.english_name} (
                  {line.alternates_to?.number})
                </div>
                <p className="whitespace-pre-line mt-1">{line.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title font-serif">Quick Reference</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                <RefRow label="Image" value={quick_reference?.image} />
                <RefRow label="Recite as" value={quick_reference?.recite_as} />
                <RefRow label="Element" value={quick_reference?.element} />
                <RefRow label="Structure" value={quick_reference?.structure} />
                <RefRow label="Month" value={quick_reference?.month} />
                <RefRow
                  label="Host of the Gua"
                  value={quick_reference?.host_of_gua}
                />
                <RefRow
                  label="Opposite Gua"
                  value={`${quick_reference?.opposite_gua?.english_name} (${quick_reference?.opposite_gua?.number})`}
                />
                <RefRow
                  label="Inverse Gua"
                  value={`${quick_reference?.inverse_gua?.english_name} (${quick_reference?.inverse_gua?.number})`}
                />
                <RefRow
                  label="Mutual Gua"
                  value={`${quick_reference?.mutual_gua?.english_name} (${quick_reference?.mutual_gua?.number})`}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
