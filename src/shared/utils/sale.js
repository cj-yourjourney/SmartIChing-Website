// The sale really ends at 11:59 PM Pacific, so always show the end date in
// Pacific time. Formatting in the visitor's own timezone would say "Dec 6"
// for people in Asia or Europe.
export const SALE_TIME_ZONE = 'America/Los_Angeles'

const formatCents = (cents) => `$${(cents / 100).toFixed(2)}`

// "Dec 5" for an ISO timestamp from the sale endpoint, or '' with no end date.
export const formatSaleEnd = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        timeZone: SALE_TIME_ZONE
      })
    : ''

// Sale prices for one plan, e.g. $19.98 at 50% off becomes $9.99.
// Returns { percentOff, price, perMonth } (perMonth is null for monthly).
export const salePricing = (plan, percentOff) => {
  const cents = Math.round((plan.amountCents * (100 - percentOff)) / 100)
  return {
    percentOff,
    price: formatCents(cents),
    perMonth: plan.perMonthText
      ? plan.perMonthText(formatCents(Math.round(cents / plan.months)))
      : null
  }
}

// The sale sentence shown by the banner and the notice above the plan tiles,
// e.g. "Thanksgiving sale: 50% off" + ", applied automatically at checkout. Ends Dec 5."
export const saleText = (sale) => {
  const end = formatSaleEnd(sale.ends_at)
  return {
    headline: `${sale.name ? `${sale.name} sale` : 'Sale'}: ${sale.percent_off}% off`,
    detail: `, applied automatically at checkout.${end ? ` Ends ${end}.` : ''}`
  }
}
