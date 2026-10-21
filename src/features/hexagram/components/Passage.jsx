import Card from '@/shared/components/layout/Card'

// A classical text (Judgment / Image) set as a quote, with its commentary below.
export default function Passage({ title, text, commentary }) {
  if (!text && !commentary) return null
  return (
    <Card title={title}>
      {text && (
        <blockquote className="border-l-2 border-primary/60 pl-4">
          <p className="whitespace-pre-line font-serif text-xl">{text}</p>
        </blockquote>
      )}

      {commentary && (
        <p className={`whitespace-pre-line opacity-80 ${text ? 'mt-4' : ''}`}>
          {commentary}
        </p>
      )}
    </Card>
  )
}
