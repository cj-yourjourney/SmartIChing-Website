import Card from '@/shared/components/Card'
import EmptyState from '@/shared/components/EmptyState'
import ErrorAlert from '@/shared/components/ErrorAlert'
import StatusBadge from '@/shared/components/StatusBadge'
import { PLAN_LABELS } from '../constants'
import { formatDate } from '../utils'

const formatMoney = (amount, currency) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase()
  }).format(Number(amount))

export default function PaymentHistoryList({ payments, status, onRetry }) {
  return (
    <Card title="Payment history">
      {status === 'loading' && payments.length === 0 ? (
        <div className="skeleton h-24 w-full" />
      ) : status === 'failed' && payments.length === 0 ? (
        <ErrorAlert message="Could not load your payments." onRetry={onRetry} />
      ) : payments.length === 0 ? (
        <EmptyState
          title="No payments yet"
          description="Receipts for your payments will show up here."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th>
                  <span className="sr-only">Receipts</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{formatDate(p.created_at)}</td>
                  <td>{PLAN_LABELS[p.plan] || p.description || '—'}</td>
                  <td>{formatMoney(p.amount, p.currency)}</td>
                  <td>
                    <StatusBadge
                      tone={p.status === 'paid' ? 'success' : 'error'}
                    >
                      {p.status === 'paid' ? 'Paid' : 'Failed'}
                    </StatusBadge>
                  </td>
                  <td className="whitespace-nowrap text-right">
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
    </Card>
  )
}
