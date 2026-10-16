// Error message with an optional retry button.
export default function ErrorAlert({
  title,
  message,
  onRetry,
  retryLabel = 'Try again',
  className = ''
}) {
  return (
    <div role="alert" className={`alert alert-error ${className}`}>
      <div>
        {title && <p className="font-medium">{title}</p>}
        <p className={title ? 'text-sm opacity-80' : ''}>{message}</p>
      </div>
      {onRetry && (
        <button type="button" className="btn btn-sm" onClick={onRetry}>
          {retryLabel}
        </button>
      )}
    </div>
  )
}
