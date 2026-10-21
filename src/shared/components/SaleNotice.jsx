import { Tag } from 'lucide-react'
import { saleText } from '@/shared/utils/sale'

// The sale in one line, for places where the banner may have been dismissed
// (above the plan tiles on Account and on the home Pricing section).
// Render it only while useSale().onSale is true.
//   sale  the sale from useSale()
export default function SaleNotice({ sale, className = '' }) {
  const { headline, detail } = saleText(sale)

  return (
    <p
      className={`flex items-start gap-2 rounded-box bg-primary/10 p-3 text-sm ${className}`}
    >
      <Tag className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <span>
        <span className="font-semibold">{headline}</span>
        {detail}
      </span>
    </p>
  )
}
