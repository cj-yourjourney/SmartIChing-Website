/**
 * Renders a yin/yang line diagram, like the classic King Wen chart
 * (solid bar = yang/unbroken, split bar = yin/broken). Works for a full
 * 6-line hexagram or a single 3-line trigram — just pass the matching
 * slice of values.
 *
 * `values` is bottom-to-top (line 1 = bottom), matching Hexagram.line_values
 * from the backend — so we reverse it here to draw top to bottom, matching
 * how a hexagram or trigram is conventionally drawn. For a trigram, slice
 * line_values: lower = values.slice(0, 3), upper = values.slice(3, 6).
 */
export default function HexagramLines({ values, size = 'md' }) {
  if (!values || values.length === 0) return null

  const dims = {
    xs: { width: 'w-6', height: 'h-1', gap: 'space-y-0.5' },
    sm: { width: 'w-10', height: 'h-1', gap: 'space-y-1' },
    md: { width: 'w-16', height: 'h-1.5', gap: 'space-y-1.5' }
  }
  const { width, height, gap } = dims[size] || dims.md

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
