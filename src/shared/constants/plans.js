// What the site DISPLAYS for each plan (Account page and home Pricing section).
// The real charge comes from the Stripe Price behind
// SMARTICHING_STRIPE_PRICE_MONTHLY / _YEARLY, so keep these in sync with it.
//
// These are always the regular prices. During a sale, Checkout applies the
// discount automatically; sale prices are worked out from `amountCents` in
// shared/utils/sale.js. `months` is only for plans billed less often than monthly.
const yearlyPerMonthText = (amount) => `Just ${amount}/month, billed yearly`

export const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$19.98',
    amountCents: 1998,
    interval: 'per month',
    note: 'Cancel anytime'
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$167.88',
    amountCents: 16788,
    months: 12,
    interval: 'per year',
    perMonth: yearlyPerMonthText('$13.99'),
    perMonthText: yearlyPerMonthText,
    badge: 'Save 30%',
    note: 'Cancel anytime',
    highlight: true
  }
]
