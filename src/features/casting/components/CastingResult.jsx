import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Card from '@/shared/components/Card'
import HexagramGlyph from '@/shared/components/HexagramGlyph'
import SplitLayout from '@/shared/components/SplitLayout'
import { hexagramPattern } from '@/shared/utils/hexagram'

function describeLines(lines) {
  if (lines.length === 0) return 'No changing lines. This reading holds steady.'
  if (lines.length === 1) return `Line ${lines[0]} is changing.`
  const head = lines.slice(0, -1).join(', ')
  return `Lines ${head} and ${lines[lines.length - 1]} are changing.`
}

function Figure({ hexagram, changing = [], caption }) {
  return (
    <figure className="flex flex-col items-center gap-3 text-center">
      {caption && (
        <p className="text-xs uppercase tracking-wide opacity-60">{caption}</p>
      )}
      <HexagramGlyph
        pattern={hexagramPattern(hexagram)}
        changing={changing}
        size="lg"
        label={hexagram.english_name}
      />
      <figcaption>
        <div lang="zh" className="font-serif text-4xl leading-none opacity-80">
          {hexagram.chinese_name}
        </div>
        <div className="mt-2 font-serif text-xl">
          {hexagram.number}. {hexagram.pinyin_name}
        </div>
        <div className="text-sm opacity-60">{hexagram.english_name}</div>
      </figcaption>
    </figure>
  )
}

function SourceBlock({ title, text, commentary }) {
  if (!text && !commentary) return null
  return (
    <div>
      <h4 className="font-serif text-lg">{title}</h4>
      {text && (
        <blockquote className="mt-2 border-l-2 border-primary/60 pl-4">
          <p className="whitespace-pre-line font-serif text-lg">{text}</p>
        </blockquote>
      )}
      {commentary && (
        <p className="mt-2 whitespace-pre-line text-sm opacity-80">
          {commentary}
        </p>
      )}
    </div>
  )
}

export default function CastingResult({ result }) {
  const {
    question,
    hexagram,
    moving_lines,
    consulted_lines,
    resulting_hexagram,
    interpretation,
    reading_id
  } = result

  return (
    <div className="space-y-6">
      <Card>
        {question && (
          <div className="mb-6">
            <p className="text-sm opacity-60">Your question</p>
            <p className="font-serif text-2xl">{question}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-8">
          <Figure hexagram={hexagram} changing={moving_lines} />
          {resulting_hexagram && (
            <>
              <ArrowRight className="size-5 opacity-40" aria-hidden="true" />
              <Figure hexagram={resulting_hexagram} caption="Moving toward" />
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm opacity-70">
          {describeLines(moving_lines)}
        </p>
      </Card>

      <SplitLayout
        aside={
          <>
            {interpretation.guidance && (
              <Card title="Guidance">
                <p className="whitespace-pre-line opacity-80">
                  {interpretation.guidance}
                </p>
              </Card>
            )}

            {reading_id && (
              <Card
                title="Saved to your Journey"
                description="Find this reading again any time in your reading journal."
              >
                <Link href="/journey" className="btn btn-ghost btn-sm">
                  Open my Journey
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Card>
            )}
          </>
        }
      >
        <Card title="Reading">
          <p className="whitespace-pre-line">{interpretation.reading}</p>
        </Card>
      </SplitLayout>

      <div className="collapse collapse-arrow rounded-box border border-base-300 bg-base-100">
        <input type="checkbox" aria-label="Show source text and details" />
        <div className="collapse-title font-serif text-xl">
          Source text &amp; details
        </div>
        <div className="collapse-content space-y-6">
          <SourceBlock
            title="The Judgment"
            text={hexagram.judgment_text}
            commentary={hexagram.judgment_commentary}
          />
          <SourceBlock
            title="The Image"
            text={hexagram.image_text}
            commentary={hexagram.image_commentary}
          />

          {consulted_lines.length > 0 && (
            <div>
              <h4 className="font-serif text-lg">
                Line text{consulted_lines.length > 1 ? 's' : ''} consulted
              </h4>
              <div className="mt-2 space-y-4">
                {consulted_lines.map((line) => (
                  <div key={line.line_number}>
                    <p className="font-medium">{line.line_name}</p>
                    <p className="mt-1 whitespace-pre-line font-serif text-lg">
                      {line.text}
                    </p>
                    <p className="mt-1 text-sm opacity-80">{line.commentary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resulting_hexagram && (
            <div>
              <h4 className="font-serif text-lg">
                Moving toward: {resulting_hexagram.pinyin_name} ·{' '}
                {resulting_hexagram.english_name}
              </h4>
              <p className="mt-2 text-sm opacity-80">
                {resulting_hexagram.overall_meaning}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
