// Renders the hexagram building up as lines are cast. `lines` is
// bottom-to-top in cast order; this displays top-to-bottom (line 6 on top,
// line 1 on bottom), matching how a hexagram is conventionally drawn, and
// pads the not-yet-cast upper positions with faint placeholders.
export default function LineStack({ lines }) {
  const totalSlots = 6
  const slots = Array.from({ length: totalSlots }, (_, displayRow) => {
    const bottomIndex = totalSlots - 1 - displayRow
    return lines[bottomIndex] || null
  })

  return (
    <div className="flex flex-col gap-3 w-64">
      {slots.map((line, i) => (
        <div key={i} className="flex items-center gap-3 h-4">
          {line ? (
            <>
              <LineGlyph line={line} />
              <span className="text-xs opacity-60 w-24">
                {line.changing
                  ? line.char === 'y'
                    ? '○ old yang'
                    : '× old yin'
                  : ''}
              </span>
            </>
          ) : (
            <div className="h-3 w-48 rounded bg-base-300 opacity-30" />
          )}
        </div>
      ))}
    </div>
  )
}

function LineGlyph({ line }) {
  if (line.char === 'y') {
    return <div className="h-3 w-48 rounded bg-neutral" />
  }
  return (
    <div className="h-3 w-48 flex justify-between">
      <div className="h-3 w-[45%] rounded bg-neutral" />
      <div className="h-3 w-[45%] rounded bg-neutral" />
    </div>
  )
}
