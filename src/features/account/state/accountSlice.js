import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_CONFIG } from '@/shared/api/config'
import { authApi } from '@/shared/api/authFetch'
import { parseApiError } from '@/features/auth/state/authSlice'

const { ENDPOINTS } = API_CONFIG

export const fetchSubscription = createAsyncThunk(
  'account/fetchSubscription',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.get(ENDPOINTS.SUBSCRIPTION)
    } catch (err) {
      return rejectWithValue(parseApiError(err))
    }
  }
)

export const fetchPayments = createAsyncThunk(
  'account/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.get(ENDPOINTS.PAYMENTS)
      // Works whether or not DRF pagination is enabled.
      return Array.isArray(data) ? data : data.results || []
    } catch (err) {
      return rejectWithValue(parseApiError(err))
    }
  }
)

// Asks the backend for a Stripe-hosted Checkout URL, then sends the browser there.
export const startCheckout = createAsyncThunk(
  'account/startCheckout',
  async (plan, { rejectWithValue }) => {
    try {
      const { url } = await authApi.post(ENDPOINTS.CHECKOUT, { plan })
      window.location.assign(url)
      return plan
    } catch (err) {
      return rejectWithValue(parseApiError(err))
    }
  }
)

// Stripe-hosted billing portal: update card, cancel, view invoices.
export const openBillingPortal = createAsyncThunk(
  'account/openBillingPortal',
  async (_, { rejectWithValue }) => {
    try {
      const { url } = await authApi.post(ENDPOINTS.PORTAL, {})
      window.location.assign(url)
      return true
    } catch (err) {
      return rejectWithValue(parseApiError(err))
    }
  }
)

const initialState = {
  subscription: null,
  subscriptionStatus: 'idle', // 'idle' | 'loading' | 'failed'
  payments: [],
  paymentsStatus: 'idle', // 'idle' | 'loading' | 'failed'
  checkoutPlan: null, // plan id while redirecting to Checkout
  portalLoading: false,
  error: null
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAccountError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscription.pending, (state) => {
        state.subscriptionStatus = 'loading'
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.subscriptionStatus = 'idle'
        state.subscription = action.payload
      })
      .addCase(fetchSubscription.rejected, (state, action) => {
        state.subscriptionStatus = 'failed'
        state.error = action.payload?.message || 'Could not load your subscription.'
      })

      .addCase(fetchPayments.pending, (state) => {
        state.paymentsStatus = 'loading'
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.paymentsStatus = 'idle'
        state.payments = action.payload
      })
      .addCase(fetchPayments.rejected, (state) => {
        state.paymentsStatus = 'failed'
      })

      .addCase(startCheckout.pending, (state, action) => {
        state.checkoutPlan = action.meta.arg
        state.error = null
      })
      // On success the browser is leaving for Stripe, so checkoutPlan stays set.
      .addCase(startCheckout.rejected, (state, action) => {
        state.checkoutPlan = null
        state.error = action.payload?.message || 'Could not start checkout.'
      })

      .addCase(openBillingPortal.pending, (state) => {
        state.portalLoading = true
        state.error = null
      })
      .addCase(openBillingPortal.rejected, (state, action) => {
        state.portalLoading = false
        state.error = action.payload?.message || 'Could not open billing portal.'
      })

      // Don't show the previous user's data after sign out.
      .addMatcher(
        (action) => action.type === 'auth/loggedOut',
        () => initialState
      )
  }
})

export const { clearAccountError } = accountSlice.actions
export default accountSlice.reducer
