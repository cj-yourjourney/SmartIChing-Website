import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_CONFIG } from '@/shared/api/config'
import { authApi } from '@/shared/api/authFetch'
import { parseApiError } from '@/features/auth/state/authSlice'

const { ENDPOINTS } = API_CONFIG

const browserTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  } catch {
    return ''
  }
}

// The backend buckets days in the timezone we send, so its "today" matches
// the browser's local date keys used in utils.js.
export const fetchJourney = createAsyncThunk(
  'journey/fetchJourney',
  async (_, { rejectWithValue }) => {
    try {
      const tz = browserTimeZone()
      const query = tz ? `?tz=${encodeURIComponent(tz)}` : ''
      return await authApi.get(`${ENDPOINTS.JOURNEY}${query}`)
    } catch (err) {
      return rejectWithValue(parseApiError(err))
    }
  },
  {
    condition: (_, { getState }) => getState().journey.status !== 'loading'
  }
)

const initialState = {
  range: 30, // 7 | 30 | 90 | 'all'
  status: 'idle', // idle -> loading -> succeeded | failed
  loaded: false, // true once data has arrived at least once
  daily: [],
  readings: [],
  meta: null, // { timezone, days, total_readings }
  error: null
}

const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: {
    setRange(state, action) {
      state.range = action.payload
    },
    resetJourney() {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJourney.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchJourney.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.loaded = true
        state.daily = action.payload.daily
        state.readings = action.payload.readings
        state.meta = action.payload.meta
      })
      .addCase(fetchJourney.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Could not load your journey'
      })
      // Don't show the previous user's journey after sign out.
      .addMatcher(
        (action) => action.type === 'auth/loggedOut',
        () => initialState
      )
  }
})

export const { setRange, resetJourney } = journeySlice.actions
export default journeySlice.reducer
