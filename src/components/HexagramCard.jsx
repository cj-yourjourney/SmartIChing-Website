export default function HexagramCard({ hexagram }) {
  if (!hexagram) return null

  const {
    number,
    chinese_name,
    pinyin_name,
    english_name,
    upper_trigram,
    lower_trigram,
    name_and_structure,
    sequence_of_gua,
    decision,
    commentary_on_decision,
    commentary_on_symbol,
    yao_texts,
    significance,
    line_explanations,
    additional_reference
  } = hexagram

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          <div className="text-6xl font-serif">{chinese_name}</div>
          <h2 className="card-title text-2xl">
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

      <Section title="Name and Structure" text={name_and_structure} />
      <Section title="Sequence of the Gua" text={sequence_of_gua} />
      <Section title="Decision" text={decision} mono />
      <Section
        title="Commentary on the Decision"
        text={commentary_on_decision}
        italic
      />
      <Section
        title="Commentary on the Symbol"
        text={commentary_on_symbol}
        italic
      />

      {/* Yao Texts */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title">Yao Text</h3>
          <div className="space-y-4">
            {yao_texts?.map((yao) => (
              <div
                key={yao.line_number}
                className="border-l-4 border-primary pl-4"
              >
                <div className="font-semibold">
                  {yao.line_number}. {yao.line_name}
                </div>
                <p className="whitespace-pre-line">{yao.text}</p>
                <p className="text-sm italic opacity-70 mt-1">
                  {yao.commentary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section title="Significance" text={significance} />

      {/* Line Explanations */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title">Line-by-Line Explanation</h3>
          <div className="space-y-4">
            {line_explanations?.map((line) => (
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

      {/* Additional Reference */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title">Additional Reference</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                <RefRow label="Image" value={additional_reference?.image} />
                <RefRow
                  label="Recite as"
                  value={additional_reference?.recite_as}
                />
                <RefRow label="Element" value={additional_reference?.element} />
                <RefRow
                  label="Structure"
                  value={additional_reference?.structure}
                />
                <RefRow label="Month" value={additional_reference?.month} />
                <RefRow
                  label="Host of the Gua"
                  value={additional_reference?.host_of_gua}
                />
                <RefRow
                  label="Opposite Gua"
                  value={`${additional_reference?.opposite_gua?.english_name} (${additional_reference?.opposite_gua?.number})`}
                />
                <RefRow
                  label="Inverse Gua"
                  value={`${additional_reference?.inverse_gua?.english_name} (${additional_reference?.inverse_gua?.number})`}
                />
                <RefRow
                  label="Mutual Gua"
                  value={`${additional_reference?.mutual_gua?.english_name} (${additional_reference?.mutual_gua?.number})`}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, text, mono = false, italic = false }) {
  if (!text) return null
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p
          className={`whitespace-pre-line leading-relaxed ${mono ? 'font-mono' : ''} ${
            italic ? 'italic opacity-90' : ''
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

function RefRow({ label, value }) {
  return (
    <tr>
      <th className="w-1/3">{label}</th>
      <td>{value}</td>
    </tr>
  )
}
