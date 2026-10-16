// Trigram line patterns, bottom to top ('y' = solid, 'n' = broken).
const TRIGRAM = {
  qian: 'yyy',
  kun: 'nnn',
  zhen: 'ynn',
  kan: 'nyn',
  gen: 'nny',
  xun: 'nyy',
  li: 'yny',
  dui: 'yyn'
}

// [lower, upper] trigram of hexagrams 1..64, in King Wen order.
const KING_WEN = [
  ['qian', 'qian'],
  ['kun', 'kun'],
  ['zhen', 'kan'],
  ['kan', 'gen'],
  ['qian', 'kan'],
  ['kan', 'qian'],
  ['kan', 'kun'],
  ['kun', 'kan'],
  ['qian', 'xun'],
  ['dui', 'qian'],
  ['qian', 'kun'],
  ['kun', 'qian'],
  ['li', 'qian'],
  ['qian', 'li'],
  ['gen', 'kun'],
  ['kun', 'zhen'],
  ['zhen', 'dui'],
  ['xun', 'gen'],
  ['dui', 'kun'],
  ['kun', 'xun'],
  ['zhen', 'li'],
  ['li', 'gen'],
  ['kun', 'gen'],
  ['zhen', 'kun'],
  ['zhen', 'qian'],
  ['qian', 'gen'],
  ['zhen', 'gen'],
  ['xun', 'dui'],
  ['kan', 'kan'],
  ['li', 'li'],
  ['gen', 'dui'],
  ['xun', 'zhen'],
  ['gen', 'qian'],
  ['qian', 'zhen'],
  ['kun', 'li'],
  ['li', 'kun'],
  ['li', 'xun'],
  ['dui', 'li'],
  ['gen', 'kan'],
  ['kan', 'zhen'],
  ['dui', 'gen'],
  ['zhen', 'xun'],
  ['qian', 'dui'],
  ['xun', 'qian'],
  ['kun', 'dui'],
  ['xun', 'kun'],
  ['kan', 'dui'],
  ['xun', 'kan'],
  ['li', 'dui'],
  ['xun', 'li'],
  ['zhen', 'zhen'],
  ['gen', 'gen'],
  ['gen', 'xun'],
  ['dui', 'zhen'],
  ['li', 'zhen'],
  ['gen', 'li'],
  ['xun', 'xun'],
  ['dui', 'dui'],
  ['kan', 'xun'],
  ['dui', 'kan'],
  ['dui', 'xun'],
  ['gen', 'zhen'],
  ['li', 'kan'],
  ['kan', 'li']
]

// 'ynnyyn'-style pattern (bottom to top) for HexagramGlyph.
export function hexagramPattern(h) {
  if (Array.isArray(h?.line_values) && h.line_values.length === 6) {
    return h.line_values.map((v) => (v ? 'y' : 'n')).join('')
  }
  const pair = KING_WEN[(h?.number ?? 0) - 1]
  return pair ? TRIGRAM[pair[0]] + TRIGRAM[pair[1]] : 'nnnnnn'
}
