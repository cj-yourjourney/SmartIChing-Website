// Page title and helper sentence. `action` sits on the right (e.g. a toggle).
export default function PageHeader({ title, description, action }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-5xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-3xl opacity-70">{description}</p>
        )}
      </div>
      {action}
    </header>
  )
}
