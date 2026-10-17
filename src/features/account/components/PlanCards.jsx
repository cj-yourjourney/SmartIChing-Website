import { useDispatch, useSelector } from 'react-redux'
import { startCheckout } from '../state/accountSlice'
import { PLANS } from '../constants'

// Plan tiles with their checkout buttons. No card around them, so it can sit
// inside a Card (Account page) or inside the paywall dialog.
//   title  optional heading; leave it out when the parent Card has a title
export default function PlanCards({ title }) {
  const dispatch = useDispatch()
  const checkoutPlan = useSelector((s) => s.account.checkoutPlan)
  const busy = checkoutPlan !== null

  return (
    <div>
      {title && <h3 className="font-serif text-lg">{title}</h3>}

      <div className={`grid gap-4 ${title ? 'mt-3' : ''}`}>
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-box border p-4 ${
              plan.highlight
                ? 'border-primary bg-primary/10'
                : 'border-base-300'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-serif text-lg">{plan.name}</h3>
              {plan.highlight && (
                <span className="badge badge-primary badge-soft badge-sm">
                  {plan.note}
                </span>
              )}
            </div>

            <p className="mt-2">
              <span className="font-serif text-4xl">{plan.price}</span>{' '}
              <span className="text-sm opacity-60">{plan.interval}</span>
            </p>
            {!plan.highlight && (
              <p className="mt-1 text-sm opacity-60">{plan.note}</p>
            )}

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
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs opacity-60">
        Secure payment is handled by Stripe. You can add a promo code on the
        checkout page.
      </p>
    </div>
  )
}
