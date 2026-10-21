import { useEffect, useState } from 'react'
import { Tag, X } from 'lucide-react'
import useSale from '@/shared/utils/useSale'
import { saleText } from '@/shared/utils/sale'

// Dismissal is remembered per sale code, so closing the Thanksgiving banner
// doesn't hide the next sale.
const dismissedKey = (code) => `smartiching:sale-dismissed:${code}`

// Site-wide banner, mounted once in _app.js above the Navbar.
// Shows only while a sale is running and this visitor will actually get it
// (see useSale). It disappears by itself when the sale ends.
export default function SaleBanner() {
  const { onSale, sale } = useSale()
  // null = not checked yet. The banner waits for the check so a dismissed
  // banner never flashes back on page load.
  const [dismissed, setDismissed] = useState(null)
  const code = sale?.code

  useEffect(() => {
    if (!code) return
    let stored = false
    try {
      stored = localStorage.getItem(dismissedKey(code)) === '1'
    } catch {
      // Storage can be blocked; the banner then simply shows each visit.
    }
    setDismissed(stored)
  }, [code])

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(dismissedKey(code), '1')
    } catch {
      // Ignore: dismissal just won't be remembered.
    }
  }

  if (!onSale || dismissed !== false) return null

  const { headline, detail } = saleText(sale)

  return (
    <div
      role="region"
      aria-label="Sale"
      className="bg-primary px-4 text-primary-content"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 py-3">
        <Tag className="size-5 shrink-0" aria-hidden="true" />
        <p className="flex-1 text-center text-sm sm:text-base">
          <span className="font-bold">{headline}</span>
          {detail}
        </p>
        <button
          type="button"
          className="btn btn-ghost btn-circle btn-sm text-primary-content hover:bg-primary-content/20 focus-visible:outline-primary-content"
          aria-label="Dismiss sale banner"
          onClick={dismiss}
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
