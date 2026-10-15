export const daysLeft = (iso) =>
  iso ? Math.max(0, Math.ceil((new Date(iso) - Date.now()) / 86400000)) : 0
