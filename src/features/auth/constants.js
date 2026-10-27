import { ROUTES } from '@/shared/constants/routes'

// Where to send the user after a successful sign in or sign up.
export const AFTER_AUTH_ROUTE = ROUTES.CASTING

// Where a signed-in user goes next: verified users go to casting, users who
// still have to click the emailed link go to the "check your email" page.
// emailVerified is null until the first /me/ or register response arrives, so
// only an explicit false counts as unverified.
export const getPostAuthRoute = (emailVerified) =>
  emailVerified === false ? ROUTES.CHECK_EMAIL : AFTER_AUTH_ROUTE
