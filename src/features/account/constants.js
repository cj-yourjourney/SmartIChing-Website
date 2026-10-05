// What the Account page DISPLAYS for each plan.
// The real charge comes from the Stripe Price behind
// SMARTICHING_STRIPE_PRICE_MONTHLY / _YEARLY, so keep these in sync with it.
// TODO: replace the placeholder prices below with your real ones.
export const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    interval: 'per month',
    note: 'Cancel anytime',
    highlight: false
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$79.99',
    interval: 'per year',
    note: 'Best value',
    highlight: true
  }
]

export const PLAN_LABELS = { monthly: 'Monthly', yearly: 'Yearly' }
