// Compact hexagram drawing for lists, cards and maps.
//   pattern  bottom-to-top string, 'y' = solid, 'n' = broken. Any other
//            character (e.g. '.') draws a faint empty slot, used while a
//            hexagram is still being cast.
//   changing 1-based line positions to highlight (position 1 = bottom)
export default function HexagramGlyph({
  pattern,
  changing = [],
  size = 'md',
  label,
  className = ''
}) {
  const sizes = {
    sm: { box: 'w-8 gap-[3px]', bar: 'h-[3px]' },
    md: { box: 'w-12 gap-1.5', bar: 'h-1' },
    lg: { box: 'w-24 gap-2.5', bar: 'h-2' },
    xl: { box: 'w-40 gap-3.5', bar: 'h-2.5' }
  }
  const s = sizes[size] || sizes.md

  // Draw top line first, like a written hexagram.
  const rows = pattern
    .split('')
    .map((ch, i) => ({ ch, pos: i + 1 }))
    .reverse()

  return (
    <div
      role="img"
      aria-label={label || 'Hexagram'}
      className={`flex shrink-0 flex-col ${s.box} ${className}`}
    >
      {rows.map(({ ch, pos }) => {
        if (ch !== 'y' && ch !== 'n') {
          return (
            <div
              key={pos}
              className={`${s.bar} w-full rounded-full bg-base-300`}
            />
          )
        }
        const color = changing.includes(pos)
          ? 'bg-secondary'
          : 'bg-base-content'
        if (ch === 'y') {
          return (
            <div
              key={pos}
              className={`${s.bar} w-full rounded-full transition-colors ${color}`}
            />
          )
        }
        return (
          <div key={pos} className="flex justify-between">
            <div
              className={`${s.bar} w-[44%] rounded-full transition-colors ${color}`}
            />
            <div
              className={`${s.bar} w-[44%] rounded-full transition-colors ${color}`}
            />
          </div>
        )
      })}
    </div>
  )
}
