import Card from '@/shared/components/Card'

export default function Section({
  title,
  text,
  mono = false,
  italic = false,
  lead = false
}) {
  if (!text) return null
  return (
    <Card title={title}>
      <p
        className={`whitespace-pre-line ${lead ? 'text-lg' : 'opacity-80'} ${
          mono ? 'font-mono' : ''
        } ${italic ? 'italic' : ''}`}
      >
        {text}
      </p>
    </Card>
  )
}
