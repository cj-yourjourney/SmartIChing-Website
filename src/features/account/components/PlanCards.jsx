import { useDispatch, useSelector } from 'react-redux'
import PlanTile from '@/shared/components/billing/PlanTile'
import SaleNotice from '@/shared/components/billing/SaleNotice'
import useSale from '@/shared/utils/useSale'
import { startCheckout } from '../state/accountSlice'
import { PLANS } from '../constants'

// Plan tiles with their checkout buttons. No card around them, so it can sit
// inside a Card (Account page) or inside the paywall dialog.
//   title  optional heading; leave it out when the parent Card has a title
export default function PlanCards({ title }) {
  const dispatch = useDispatch()
  const checkoutPlan = useSelector((s) => s.account.checkoutPlan)
  const busy = checkoutPlan !== null
  const { onSale, sale, saleFor } = useSale()

  return (
    <div>
      {title && <h3 className="font-serif text-lg">{title}</h3>}

      {onSale && <SaleNotice sale={sale} className={title ? 'mt-3' : ''} />}

      <div className={`grid gap-4 ${title || onSale ? 'mt-3' : ''}`}>
        {PLANS.map((plan) => (
          <PlanTile key={plan.id} plan={plan} sale={saleFor(plan)}>
            <button
              type="button"
              className={`btn mt-4 w-full ${
                plan.highlight ? 'btn-primary' : 'btn-outline'
              }`}
              onClick={() => dispatch(startCheckout(plan.id))}
              disabled={busy}
            >
              {checkoutPlan === plan.id && (
                <span className="loading loading-spinner" />
              )}
              {checkoutPlan === plan.id
                ? 'Redirecting to checkout…'
                : `Subscribe ${plan.name.toLowerCase()}`}
            </button>
          </PlanTile>
        ))}
      </div>

      <p className="mt-3 text-xs opacity-60">
        {onSale
          ? 'Secure payment is handled by Stripe.'
          : 'Secure payment is handled by Stripe. You can add a promo code on the checkout page.'}
      </p>
    </div>
  )
}
