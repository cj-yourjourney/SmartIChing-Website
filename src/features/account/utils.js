export const daysLeft = (iso) =>
  iso ? Math.max(0, Math.ceil((new Date(iso) - Date.now()) / 86400000)) : 0

export const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : ''
