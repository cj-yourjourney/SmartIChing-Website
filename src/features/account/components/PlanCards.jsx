import { useDispatch, useSelector } from 'react-redux'
import { startCheckout } from '../state/accountSlice'
import { PLANS } from '../constants'

export default function PlanCards({ title = 'Choose a plan' }) {
  const dispatch = useDispatch()
  const checkoutPlan = useSelector((s) => s.account.checkoutPlan)
  const busy = checkoutPlan !== null

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div
        className={`grid gap-4 ${
          PLANS.length > 1 ? 'sm:grid-cols-2' : 'max-w-md'
        }`}
      >
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`card bg-base-100 border ${
              plan.highlight ? 'border-primary' : 'border-base-300'
            }`}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h3 className="card-title">{plan.name}</h3>
                {plan.highlight && (
                  <span className="badge badge-primary">{plan.note}</span>
                )}
              </div>
              <p>
                <span className="text-3xl font-bold">{plan.price}</span>{' '}
                <span className="opacity-60">{plan.interval}</span>
              </p>
              {!plan.highlight && (
                <p className="text-sm opacity-60">{plan.note}</p>
              )}
              <div className="card-actions mt-2">
                <button
                  type="button"
                  className={`btn w-full ${
                    plan.highlight ? 'btn-primary' : 'btn-outline'
                  }`}
                  onClick={() => dispatch(startCheckout(plan.id))}
                  disabled={busy}
                >
                  {checkoutPlan === plan.id
                    ? 'Redirecting to checkout…'
                    : `Subscribe ${plan.name.toLowerCase()}`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs opacity-60 mt-3">
        Secure payment is handled by Stripe. You can add a promo code on the
        checkout page.
      </p>
    </section>
  )
}
