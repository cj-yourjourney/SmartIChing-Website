// Calm message with one next step.
//   variant="inset" (default): grey panel, for use inside a Card
//   variant="card": a bordered card of its own, for a whole page area
export default function EmptyState({
  title,
  description,
  action,
  variant = 'inset',
  className = ''
}) {
  const look =
    variant === 'card'
      ? 'rounded-box border border-base-300 bg-base-100 p-10'
      : 'rounded-box bg-base-200 p-8'

  return (
    <div className={`${look} text-center ${className}`}>
      <p className="font-serif text-xl">{title}</p>
      {description && (
        <p className="mx-auto mt-1 max-w-md text-sm opacity-70">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
