// Traditional three-coin method. Heads = 3, tails = 2.
// Sum of three coins per line:
//   6 = old yin  (changing) -> drawn as yin, flips to yang in the resulting gua
//   7 = young yang (stable)
//   8 = young yin  (stable)
//   9 = old yang (changing) -> drawn as yang, flips to yin in the resulting gua
//
// Randomness lives here, outside the Redux reducer, so the reducer itself
// stays a pure function — the component calls castLine() and dispatches
// the result as a plain payload.

const LINE_TYPES = {
  6: { char: 'n', changing: true, label: 'Old Yin' },
  7: { char: 'y', changing: false, label: 'Young Yang' },
  8: { char: 'n', changing: false, label: 'Young Yin' },
  9: { char: 'y', changing: true, label: 'Old Yang' }
}

function tossCoin() {
  return Math.random() < 0.5 ? 2 : 3 // tails : heads
}

export function castLine() {
  const coins = [tossCoin(), tossCoin(), tossCoin()]
  const sum = coins.reduce((a, b) => a + b, 0)
  return { coins, sum, ...LINE_TYPES[sum] }
}
