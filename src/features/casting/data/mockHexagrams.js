// MOCK DATA — placeholder for frontend demo only.
//
// Pattern strings are bottom-to-top, 'y' = yang (solid), 'n' = yin (broken).
// This is a small, verified subset (not all 64) so the casting flow can be
// demoed end-to-end without risking a wrong King Wen sequence entry. The
// real lookup will hit the backend once the `lines_pattern` field and full
// 64-row Hexagram table exist there.
//
// Verified from known trigram structure:
//   Qian (Heaven)  = yyy      Kun (Earth)   = nnn
//   Zhen (Thunder) = ynn      Xun (Wind)    = nyy
//   Kan (Water)    = nyn      Li (Fire)     = yny
//   Gen (Mountain) = nny      Dui (Lake)    = yyn
// Hexagram pattern = lower trigram (positions 1-3) + upper trigram (positions 4-6).

export const MOCK_HEXAGRAMS = [
  {
    number: 1,
    pinyin_name: 'Qian',
    english_name: 'The Creative',
    lines_pattern: 'yyyyyy'
  },
  {
    number: 2,
    pinyin_name: 'Kun',
    english_name: 'The Receptive',
    lines_pattern: 'nnnnnn'
  },
  {
    number: 11,
    pinyin_name: 'Tai',
    english_name: 'Peace',
    lines_pattern: 'yyynnn'
  },
  {
    number: 12,
    pinyin_name: 'Pi',
    english_name: 'Standstill',
    lines_pattern: 'nnnyyy'
  },
  {
    number: 50,
    pinyin_name: 'Ding',
    english_name: 'The Cauldron',
    lines_pattern: 'nyyyny'
  },
  {
    number: 51,
    pinyin_name: 'Zhen',
    english_name: 'The Arousing (Shock, Thunder)',
    lines_pattern: 'ynnynn'
  },
  {
    number: 63,
    pinyin_name: 'Ji Ji',
    english_name: 'After Completion',
    lines_pattern: 'ynynyn'
  },
  {
    number: 64,
    pinyin_name: 'Wei Ji',
    english_name: 'Before Completion',
    lines_pattern: 'nynyny'
  }
]

export function getHexagramByPattern(pattern) {
  return (
    MOCK_HEXAGRAMS.find((h) => h.lines_pattern === pattern) || {
      number: null,
      pinyin_name: '—',
      english_name:
        'Not in the mock data set yet — will resolve once the backend lookup is wired up.',
      lines_pattern: pattern
    }
  )
}
