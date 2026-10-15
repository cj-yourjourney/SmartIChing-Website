import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { buildMockJourney } from '../data/mockJourney'

// MOCK for now. When the backend exists, swap the body for:
//   return await authApi.get(API_CONFIG.ENDPOINTS.JOURNEY)
// and keep the same { daily, readings } response shape.
export const fetchJourney = createAsyncThunk(
  'journey/fetchJourney',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      return buildMockJourney()
    } catch (err) {
      return rejectWithValue({ message: err.message })
    }
  }
)

const initialState = {
  range: 30, // 7 | 30 | 90 | 'all'
  status: 'idle', // idle -> loading -> succeeded | failed
  daily: [],
  readings: [],
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
        state.daily = action.payload.daily
        state.readings = action.payload.readings
      })
      .addCase(fetchJourney.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || 'Could not load your journey'
      })
  }
})

export const { setRange, resetJourney } = journeySlice.actions
export default journeySlice.reducer
