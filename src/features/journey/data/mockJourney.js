// MOCK DATA — placeholder for frontend demo only.
//
// Shape of what the backend will eventually return:
//   daily:    one row per day  { date, castings, reviewed: [hexagram #s],
//             minutes (time on site), sessions }
//   readings: one row per casting { id, castAt, question, primary,
//             changingLines, relating, summary }
//
// Primary hexagrams come from casting/data/mockHexagrams. Relating hexagrams
// are the result of flipping the changing lines (checked by hand), so the
// glyphs on screen are always consistent with the line positions.
// Daily casting counts are derived from `readings`, so the two always agree.

import { MOCK_HEXAGRAMS } from '@/features/casting/data/mockHexagrams'
import { toDateKey } from '../utils'

const PRIMARY = Object.fromEntries(MOCK_HEXAGRAMS.map((h) => [h.number, h]))

const RELATING = {
  17: { number: 17, pinyin_name: 'Sui', english_name: 'Following', lines_pattern: 'yynynn' },
  19: { number: 19, pinyin_name: 'Lin', english_name: 'Approach', lines_pattern: 'yynnnn' },
  20: { number: 20, pinyin_name: 'Guan', english_name: 'Contemplation', lines_pattern: 'nnnnyy' },
  24: { number: 24, pinyin_name: 'Fu', english_name: 'Return', lines_pattern: 'ynnnnn' },
  32: { number: 32, pinyin_name: 'Heng', english_name: 'Duration', lines_pattern: 'nyyynn' },
  35: { number: 35, pinyin_name: 'Jin', english_name: 'Progress', lines_pattern: 'nnnyny' },
  36: { number: 36, pinyin_name: 'Ming Yi', english_name: 'Darkening of the Light', lines_pattern: 'ynynnn' },
  41: { number: 41, pinyin_name: 'Sun', english_name: 'Decrease', lines_pattern: 'yynnny' },
  42: { number: 42, pinyin_name: 'Yi', english_name: 'Increase', lines_pattern: 'ynnnyy' },
  44: { number: 44, pinyin_name: 'Gou', english_name: 'Coming to Meet', lines_pattern: 'nyyyyy' }
}

const hex = (n) => PRIMARY[n] || RELATING[n]

// [daysAgo, hour, minute, primary #, changing lines, relating #, question, summary]
const READING_SEEDS = [
  [0, 8, 14, 11, [3], 19, 'How should I approach the conversation with my manager this week?', 'Harmony is within reach. Move forward steadily and let the relationship grow before pressing for results.'],
  [1, 21, 40, 63, [5], 36, 'Is this the right time to launch my side project?', 'Things look complete on the surface, but caution is needed. Protect your energy and avoid overreaching.'],
  [3, 7, 5, 1, [1], 44, 'What energy should I bring into the new month?', 'Strong creative force, yet restraint is wise. Watch for small influences that appear early.'],
  [4, 19, 22, 51, [2], 17, '', 'Shock arrives and then passes. Adapt, stay flexible, and follow what proves trustworthy.'],
  [6, 12, 30, 12, [4], 20, 'Why do things feel stuck at work?', 'A period of standstill. Step back, observe, and wait for the tide to turn.'],
  [8, 22, 10, 2, [1], 24, 'How can I rebuild my morning routine?', 'Return begins quietly. Small, consistent steps carry more power than bold declarations.'],
  [9, 9, 45, 64, [2], 35, 'Should I take on the extra project?', 'Almost, but not quite. Careful progress, one clear step at a time, brings advancement.'],
  [11, 18, 0, 50, [6], 32, 'What is the best way to grow my business?', 'Nourishment and refinement. Lasting results come from steady, enduring effort.'],
  [13, 20, 15, 11, [], null, 'Will the move go smoothly?', 'Peace and flow. Conditions are favorable; cooperate and share the abundance.'],
  [16, 8, 25, 1, [], null, '', 'Pure creative strength. Act with integrity and persevere.'],
  [19, 23, 5, 63, [], null, 'Is this partnership built to last?', 'Order is established. Maintain it with vigilance so it does not slip.'],
  [22, 13, 50, 12, [1, 4], 42, 'How do I handle the disagreement with a friend?', 'Turn the standstill into growth. Generosity and a willingness to change open the way.'],
  [26, 17, 35, 2, [], null, 'What should I focus on this season?', 'Receptive and supportive. Follow rather than lead, and let others see your steadiness.'],
  [31, 10, 10, 51, [], null, 'Am I ready for the presentation?', 'Thunder clears the air. A moment of alarm gives way to clarity.'],
  [38, 21, 5, 11, [3, 6], 41, 'Where should I cut back?', 'Decrease with sincerity. Simplify, and what remains will be enough.'],
  [45, 7, 55, 64, [], null, 'What do I need to understand about this transition?', 'Unfinished business invites patience. Think before you act.'],
  [58, 19, 40, 50, [], null, 'How should I use my savings?', 'A steady vessel. Hold to what is valuable and refine it.'],
  [72, 22, 15, 2, [], null, 'How can I be more patient?', 'Yielding devotion. Perseverance carries you through.']
]

const DAYS = 120

// Small seeded PRNG so the demo looks the same on every load.
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildMockJourney() {
  const now = new Date()
  const rand = mulberry32(20261015)

  const readings = READING_SEEDS.map(
    ([daysAgo, h, m, primary, changing, relating, question, summary], i) => {
      const at = new Date(now)
      at.setDate(at.getDate() - daysAgo)
      at.setHours(h, m, 0, 0)
      if (at > now) at.setTime(now.getTime() - 60 * 60 * 1000)
      return {
        id: `reading_${i + 1}`,
        castAt: at.toISOString(),
        question,
        primary: hex(primary),
        changingLines: changing,
        relating: relating ? hex(relating) : null,
        summary
      }
    }
  )

  const castsByDay = {}
  readings.forEach((r) => {
    const key = toDateKey(new Date(r.castAt))
    castsByDay[key] = (castsByDay[key] || 0) + 1
  })

  const daily = []
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const date = toDateKey(d)
    const castings = castsByDay[date] || 0
    const weekend = d.getDay() === 0 || d.getDay() === 6
    const active = castings > 0 || i < 5 || rand() < (weekend ? 0.4 : 0.62)

    if (!active) {
      daily.push({ date, castings: 0, reviewed: [], minutes: 0, sessions: 0 })
      continue
    }

    const reviewCount = Math.floor(rand() * 6)
    const reviewed = Array.from(
      { length: reviewCount },
      () => 1 + Math.floor(Math.pow(rand(), 1.6) * 34)
    )
    daily.push({
      date,
      castings,
      reviewed,
      minutes: 5 + Math.floor(rand() * 30) + castings * 6 + reviewCount * 3,
      sessions: 1 + (rand() > 0.75 ? 1 : 0)
    })
  }

  readings.sort((a, b) => new Date(b.castAt) - new Date(a.castAt))
  return { daily, readings }
}
