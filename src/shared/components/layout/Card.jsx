// The one card style. With a `title` it adds the serif heading, an optional
// description and an optional `action` on the right; children sit below.
// Without a title, children are rendered as they are.
export default function Card({
  title,
  description,
  action,
  className = '',
  children
}) {
  const hasHeader = Boolean(title || description || action)

  return (
    <section
      className={`rounded-box border border-base-300 bg-base-100 p-6 ${className}`}
    >
      {hasHeader && (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            {title && <h2 className="font-serif text-2xl">{title}</h2>}
            {description && <p className="text-sm opacity-70">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {hasHeader && children ? (
        <div className="mt-4">{children}</div>
      ) : (
        children
      )}
    </section>
  )
}
