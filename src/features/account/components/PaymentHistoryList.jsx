import { PLAN_LABELS } from '../constants'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

const formatMoney = (amount, currency) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase()
  }).format(Number(amount))

export default function PaymentHistoryList({ payments, status }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Payment history</h2>

      {status === 'loading' && payments.length === 0 ? (
        <div className="skeleton h-24 w-full" />
      ) : status === 'failed' && payments.length === 0 ? (
        <p className="opacity-70">Could not load your payments.</p>
      ) : payments.length === 0 ? (
        <p className="opacity-70">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto border border-base-300 rounded-box bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{formatDate(p.created_at)}</td>
                  <td>{PLAN_LABELS[p.plan] || p.description || '—'}</td>
                  <td>{formatMoney(p.amount, p.currency)}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === 'paid' ? 'badge-success' : 'badge-error'
                      }`}
                    >
                      {p.status === 'paid' ? 'Paid' : 'Failed'}
                    </span>
                  </td>
                  <td className="text-right whitespace-nowrap">
                    {p.hosted_invoice_url && (
                      <a
                        href={p.hosted_invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary mr-3"
                      >
                        Receipt
                      </a>
                    )}
                    {p.invoice_pdf_url && (
                      <a
                        href={p.invoice_pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary"
                      >
                        PDF
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
