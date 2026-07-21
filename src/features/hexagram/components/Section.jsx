export default function Section({ title, text, mono = false, italic = false }) {
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
