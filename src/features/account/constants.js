// The plan list lives in shared/constants/plans.js because the home page
// Pricing section shows the same plans. Re-exported here so existing imports
// from this file keep working.
export { PLANS } from '@/shared/constants/plans'

export const PLAN_LABELS = { monthly: 'Monthly', yearly: 'Yearly' }
