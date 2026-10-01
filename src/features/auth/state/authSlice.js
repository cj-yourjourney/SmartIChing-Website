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

// Sign up: the backend creates the user + SmartIChingProfile and returns tokens.
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ first_name, email, password }, { rejectWithValue }) => {
    try {
      const data = await api.post(ENDPOINTS.REGISTER, {
        first_name,
        email: email.trim().toLowerCase(),
        password
      })
      tokenStorage.set({ access: data.access, refresh: data.refresh })
      return data.user
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
      return me.user
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
    return me.user
  } catch {
    tokenStorage.clear()
    return null
  }
})

const initialState = {
  user: null,
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
        state.user = action.payload
        state.initialized = true
      })
      .addCase(loadSession.rejected, (state) => {
        state.initialized = true
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
          state.user = action.payload
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
