import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSale } from '@/shared/redux/saleSlice'
import { salePricing } from '@/shared/utils/sale'

// How often to re-check whether the sale has ended, so the banner and sale
// prices disappear by themselves without a page reload.
const END_CHECK_MS = 30000

// Everything a component needs to show (or not show) the sale.
//   onSale     true only when a sale is running AND this visitor will get it
//   sale       the raw sale from the API (code, name, percent_off, ends_at)
//   percentOff e.g. 50
//   saleFor(plan)  { percentOff, price, perMonth } for a plan, or null
//
// Who sees the sale: signed-out visitors (assumed new, since sale codes are
// first-time-customer only), and signed-in people whose subscription says
// `eligible_for_sale`. Signed-in people whose eligibility isn't known yet see
// regular prices until it loads, so nobody is shown a price they won't get.
export default function useSale() {
  const dispatch = useDispatch()
  const { sale, status } = useSelector((s) => s.sale)
  const { user, initialized } = useSelector((s) => s.auth)
  const subscription = useSelector((s) => s.account.subscription)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (status === 'idle') dispatch(fetchSale())
  }, [status, dispatch])

  const endsAtMs = sale?.ends_at ? new Date(sale.ends_at).getTime() : null

  useEffect(() => {
    if (!endsAtMs) return undefined
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), END_CHECK_MS)
    return () => clearInterval(id)
  }, [endsAtMs])

  const running = Boolean(sale?.active) && (!endsAtMs || endsAtMs > now)

  // `active` covers the moments right after paying, before the payment webhook
  // has made `eligible_for_sale` false.
  const eligible =
    initialized &&
    (user
      ? Boolean(subscription?.eligible_for_sale) &&
        subscription.status !== 'active'
      : true)

  const onSale = running && eligible
  const percentOff = sale?.percent_off ?? 0

  return {
    onSale,
    sale,
    percentOff,
    saleFor: (plan) => (onSale ? salePricing(plan, percentOff) : null)
  }
}
