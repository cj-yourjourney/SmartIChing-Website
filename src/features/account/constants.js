// What the Account page DISPLAYS for each plan.
// The real charge comes from the Stripe Price behind
// SMARTICHING_STRIPE_PRICE_MONTHLY / _YEARLY, so keep these in sync with it.
// Sale codes (e.g. THANKSGIVING50) are entered on Stripe's Checkout page, so
// these are always the regular prices.
export const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$19.98',
    interval: 'per month',
    note: 'Cancel anytime'
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$167.88',
    interval: 'per year',
    perMonth: 'Just $13.99/month, billed yearly',
    badge: 'Save 30%',
    note: 'Cancel anytime',
    highlight: true
  }
]

export const PLAN_LABELS = { monthly: 'Monthly', yearly: 'Yearly' }
