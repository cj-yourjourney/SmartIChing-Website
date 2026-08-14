/**
 * Renders a yin/yang line diagram, like the classic King Wen chart
 * (solid bar = yang, split bar = yin). Works for a full 6-line hexagram
 * or a single 3-line trigram — just pass the matching slice of values.
 *
 * `values` is bottom-to-top (line 1 = bottom), matching Hexagram.line_values
 * from the backend — so we reverse it here to draw top to bottom, matching
 * how a hexagram or trigram is conventionally drawn.
 *
 * Pass `labels={{ upper, lower }}` with a full 6-value hexagram to bracket
 * the top 3 lines and bottom 3 lines with their trigram names directly on
 * the same 6-line stack, instead of drawing the trigrams a second time.
 */
const DIMS = {
  xs: { width: 'w-6', height: 'h-1', gap: 'gap-0.5' },
  sm: { width: 'w-10', height: 'h-1', gap: 'gap-1' },
  md: { width: 'w-16', height: 'h-1.5', gap: 'gap-1.5' }
}

function LineBars({ values, size }) {
  const { width, height, gap } = DIMS[size] || DIMS.md
  const topToBottom = [...values].reverse()

  return (
    <div className={`flex flex-col items-center ${gap}`}>
      {topToBottom.map((isYang, i) => (
        <div key={i} className={`flex ${width} ${height}`}>
          {isYang ? (
            <div className="w-full bg-base-content rounded-sm" />
          ) : (
            <div className="w-full flex justify-between">
              <div className="w-[45%] bg-base-content rounded-sm" />
              <div className="w-[45%] bg-base-content rounded-sm" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function HexagramLines({ values, size = 'md', labels }) {
  if (!values || values.length === 0) return null

  if (labels && values.length === 6) {
    return (
      <div className="flex items-stretch gap-3">
        <LineBars values={values} size={size} />
        <div className="flex flex-col text-left">
          <div className="flex-1 flex items-center">
            <span className="text-sm opacity-70 leading-tight">
              {labels.upper}
            </span>
          </div>
          <div className="flex-1 flex items-center">
            <span className="text-sm opacity-70 leading-tight">
              {labels.lower}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return <LineBars values={values} size={size} />
}
