import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_CONFIG, api } from '@/shared/api/config'
import { authApi } from '@/shared/api/authFetch'
import { tokenStorage } from '@/shared/api/tokenStorage'

const { ENDPOINTS } = API_CONFIG

const toText = (value) => (Array.isArray(value) ? value.join(' ') : value)

/**
 * Turn an error thrown by apiCall into { message, fieldErrors }.
 * DRF returns {"email": ["..."]} for field errors, {"non_field_errors": [...]}
 * for login failures, and {"detail": "..."} for throttling.
 */
export const parseApiError = (err) => {
  const data = err?.data
  const fieldErrors = {}
  let message = err?.message || 'Something went wrong. Please try again.'

  if (Array.isArray(data) && data.length) {
    message = String(data[0])
  } else if (data && typeof data === 'object') {
    const {
      non_field_errors: nonField,
      error,
      detail,
      message: msg,
      ...fields
    } = data

    for (const [key, value] of Object.entries(fields)) {
      const text = toText(value)
      if (typeof text === 'string') fieldErrors[key] = text
    }

    if (nonField) {
      message = String(toText(nonField))
    } else if (!error && !detail && !msg) {
      const firstField = Object.values(fieldErrors)[0]
      if (firstField) message = firstField
    }
  }

  return { message, fieldErrors }
}

const fetchMe = () => authApi.get(ENDPOINTS.ME)

// Sign up: the backend creates the user + SmartIChingProfile (unverified),
// emails the verification link, and returns tokens so the "check your email"
// page can offer a working Resend button.
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { first_name, email, password, password_confirm },
    { rejectWithValue }
  ) => {
    try {
      const data = await api.post(ENDPOINTS.REGISTER, {
        first_name,
        email: email.trim().toLowerCase(),
        password,
        password_confirm
      })
      tokenStorage.set({ access: data.access, refresh: data.refresh })
      return {
        user: data.user,
        emailVerified: data.email_verified === true,
        verificationEmailSent: data.verification_email_sent !== false
      }
    } catch (err) {
      return rejectWithValue(parseApiError(err))
    }
  }
)

// Sign in: shared token endpoint, then /me/ (creates the SmartIChingProfile
// the first time an existing AgentSmartly user signs in here).
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    let tokens
    try {
      tokens = await api.post(ENDPOINTS.LOGIN, {
        email: email.trim().toLowerCase(),
        password
      })
    } catch (err) {
      return rejectWithValue(parseApiError(err))
    }

    tokenStorage.set(tokens)

    try {
      const me = await fetchMe()
      return { user: me.user, emailVerified: me.email_verified === true }
    } catch (err) {
      tokenStorage.clear()
      return rejectWithValue(parseApiError(err))
    }
  }
)

// Runs once on app load: restore the session from stored tokens.
export const loadSession = createAsyncThunk('auth/loadSession', async () => {
  if (!tokenStorage.getAccess() && !tokenStorage.getRefresh()) return null

  try {
    const me = await fetchMe()
    return { user: me.user, emailVerified: me.email_verified === true }
  } catch {
    tokenStorage.clear()
    return null
  }
})

// Re-check verification state (used when the user comes back to the
// "check your email" tab after clicking the link in another tab/device).
export const refreshVerification = createAsyncThunk(
  'auth/refreshVerification',
  async () => {
    const me = await fetchMe()
    return { user: me.user, emailVerified: me.email_verified === true }
  }
)

// Consume the token from the emailed link. First use returns tokens, so the
// user is signed in and verified in one step. A replayed link returns no
// tokens; in that case we only refresh state if this browser is already signed in.
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    let data
    try {
      data = await api.post(ENDPOINTS.VERIFY_EMAIL, { token })
    } catch (err) {
      return rejectWithValue({
        ...parseApiError(err),
        code: err?.data?.code || null
      })
    }

    if (data.access && data.refresh) {
      tokenStorage.set({ access: data.access, refresh: data.refresh })
      return { user: data.user, emailVerified: true, alreadyVerified: false }
    }

    let user = null
    let emailVerified = true
    if (tokenStorage.getAccess() || tokenStorage.getRefresh()) {
      try {
        const me = await fetchMe()
        user = me.user
        emailVerified = me.email_verified === true
      } catch {
        // stale tokens: treat as signed out
      }
    }
    return { user, emailVerified, alreadyVerified: true }
  }
)

// Send the verification email again (requires a signed-in session).
export const resendVerification = createAsyncThunk(
  'auth/resendVerification',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.post(ENDPOINTS.RESEND_VERIFICATION)
      return { alreadyVerified: data.already_verified === true }
    } catch (err) {
      return rejectWithValue(parseApiError(err))
    }
  }
)

const initialState = {
  user: null,
  emailVerified: null, // null = unknown, true/false once /me/ or register answered
  verificationEmailSent: true, // false if Resend failed during sign up
  initialized: false, // true once the stored session has been checked
  status: 'idle', // 'idle' | 'loading'
  error: null,
  fieldErrors: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedOut(state) {
      state.user = null
      state.emailVerified = null
      state.verificationEmailSent = true
      state.status = 'idle'
      state.error = null
      state.fieldErrors = {}
    },
    clearAuthError(state) {
      state.error = null
      state.fieldErrors = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSession.fulfilled, (state, action) => {
        state.user = action.payload?.user ?? null
        state.emailVerified = action.payload
          ? action.payload.emailVerified
          : null
        state.initialized = true
      })
      .addCase(loadSession.rejected, (state) => {
        state.initialized = true
      })
      .addCase(refreshVerification.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.emailVerified = action.payload.emailVerified
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user
          state.emailVerified = action.payload.emailVerified
          state.initialized = true
        }
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        if (action.payload.alreadyVerified) state.emailVerified = true
      })

    for (const thunk of [registerUser, loginUser]) {
      builder
        .addCase(thunk.pending, (state) => {
          state.status = 'loading'
          state.error = null
          state.fieldErrors = {}
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.status = 'idle'
          state.user = action.payload.user
          state.emailVerified = action.payload.emailVerified
          state.verificationEmailSent =
            action.payload.verificationEmailSent ?? true
          state.initialized = true
        })
        .addCase(thunk.rejected, (state, action) => {
          state.status = 'idle'
          state.error =
            action.payload?.message || 'Something went wrong. Please try again.'
          state.fieldErrors = action.payload?.fieldErrors || {}
        })
    }
  }
})

const { loggedOut } = authSlice.actions
export const { clearAuthError } = authSlice.actions

// Clears stored tokens, then resets auth state.
export const logout = () => (dispatch) => {
  tokenStorage.clear()
  dispatch(loggedOut())
}

export default authSlice.reducer
