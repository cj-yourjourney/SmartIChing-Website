// One plan's price tile, shared by the Account plan cards and the home Pricing
// section so both always look the same. The action (checkout button or sign-up
// link) goes in `children`.
//   plan  an entry from PLANS (shared/constants/plans.js)
//   sale  { percentOff, price, perMonth } from useSale().saleFor(plan), or null
export default function PlanTile({ plan, sale = null, children }) {
  const perMonth = sale ? sale.perMonth : plan.perMonth

  return (
    <div
      className={`rounded-box border p-4 ${
        plan.highlight ? 'border-primary bg-primary/10' : 'border-base-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-lg">{plan.name}</h3>
        <div className="flex flex-wrap justify-end gap-1">
          {sale && (
            <span className="badge badge-primary badge-soft badge-sm">
              {sale.percentOff}% off
            </span>
          )}
          {plan.badge && (
            <span className="badge badge-primary badge-soft badge-sm">
              {plan.badge}
            </span>
          )}
        </div>
      </div>

      <p className="mt-2">
        {sale && (
          <>
            <s className="mr-2 font-serif text-2xl line-through opacity-60">
              <span className="sr-only">Regular price </span>
              {plan.price}
            </s>
            <span className="sr-only">Sale price </span>
          </>
        )}
        <span className="font-serif text-4xl">
          {sale ? sale.price : plan.price}
        </span>{' '}
        <span className="text-sm opacity-60">{plan.interval}</span>
      </p>
      {perMonth && (
        <p className="mt-1 text-sm font-medium text-primary">{perMonth}</p>
      )}
      <p className="mt-1 text-sm opacity-60">{plan.note}</p>

      {children}
    </div>
  )
}
