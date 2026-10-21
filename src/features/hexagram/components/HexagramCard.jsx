import Card from '@/shared/components/layout/Card'
import HexagramGlyph from '@/shared/components/hexagram/HexagramGlyph'
import { hexagramPattern } from '@/shared/utils/hexagram'
import Section from './Section'
import Passage from './Passage'

export default function HexagramCard({ hexagram }) {
  if (!hexagram) return null

  const {
    number,
    chinese_name,
    pinyin_name,
    english_name,
    upper_trigram,
    lower_trigram,
    line_values,
    overall_meaning,
    name_and_structure,
    judgment_text,
    judgment_commentary,
    image_text,
    image_commentary,
    lines,
    sequence
  } = hexagram

  const sortedLines = lines
    ? [...lines].sort((a, b) => a.line_number - b.line_number)
    : []

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <HexagramGlyph
            pattern={hexagramPattern({ number, line_values })}
            size="lg"
            label={english_name}
          />

          <div className="min-w-0 flex-1">
            <p className="text-sm opacity-60">Hexagram {number}</p>
            <h2 className="font-serif text-5xl">{pinyin_name}</h2>
            <p className="mt-1 text-lg opacity-70">{english_name}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {upper_trigram && (
                <span className="badge badge-soft h-auto whitespace-normal py-1 text-left">
                  Upper: {upper_trigram.pinyin} · {upper_trigram.meaning}
                </span>
              )}
              {lower_trigram && (
                <span className="badge badge-soft h-auto whitespace-normal py-1 text-left">
                  Lower: {lower_trigram.pinyin} · {lower_trigram.meaning}
                </span>
              )}
            </div>
          </div>

          <div
            lang="zh"
            className="font-serif text-8xl leading-none opacity-80 sm:ml-auto"
          >
            {chinese_name}
          </div>
        </div>
      </Card>

      <Section title="Overall Meaning" text={overall_meaning} lead />

      <Section title="The Image & the Name" text={name_and_structure} />

      <Section title="How We Got Here" text={sequence} />

      <Passage
        title="The Judgment"
        text={judgment_text}
        commentary={judgment_commentary}
      />

      <Passage
        title="The Image"
        text={image_text}
        commentary={image_commentary}
      />

      {sortedLines.length > 0 && (
        <Card
          title="The Lines"
          description="Six stages of change, from the bottom line up."
        >
          <ol className="divide-y divide-base-300">
            {sortedLines.map((line) => {
              const yang = line_values
                ? Boolean(line_values[line.line_number - 1])
                : undefined
              return (
                <li
                  key={line.line_number}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex w-14 shrink-0 flex-col items-center gap-2 pt-1">
                    <span className="grid size-7 place-items-center rounded-full bg-base-200 text-xs">
                      {line.line_number}
                    </span>
                    {yang !== undefined && (
                      <HexagramGlyph
                        pattern={yang ? 'y' : 'n'}
                        size="md"
                        label={yang ? 'Solid line' : 'Broken line'}
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="font-medium">{line.line_name}</div>
                    <p className="mt-1 whitespace-pre-line font-serif text-lg">
                      {line.text}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm opacity-70">
                      {line.commentary}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </Card>
      )}
    </div>
  )
}
