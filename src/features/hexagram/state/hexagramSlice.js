import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authApi, isSubscriptionRequired } from '@/shared/api/authFetch'
import { API_CONFIG } from '@/shared/api/config'

const rejectPayload = (err) => ({
  message: err.message,
  subscriptionRequired: isSubscriptionRequired(err)
})

export const fetchHexagramList = createAsyncThunk(
  'hexagram/fetchHexagramList',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.get(API_CONFIG.ENDPOINTS.LIST_HEXAGRAMS)
    } catch (err) {
      return rejectWithValue(rejectPayload(err))
    }
  }
)

// Backend only needs the number now — it looks up the canonical
// pinyin/english names itself rather than trusting them from the client.
export const fetchHexagram = createAsyncThunk(
  'hexagram/fetchHexagram',
  async (number, { rejectWithValue }) => {
    try {
      return await authApi.post(API_CONFIG.ENDPOINTS.GENERATE_HEXAGRAM, {
        number
      })
    } catch (err) {
      return rejectWithValue(rejectPayload(err))
    }
  }
)

const initialState = {
  hexagrams: [],
  listLoading: false,
  listError: null,
  selectedNumber: 40,
  hexagram: null,
  loading: false,
  error: null,
  subscriptionRequired: false
}

const hexagramSlice = createSlice({
  name: 'hexagram',
  initialState,
  reducers: {
    setSelectedNumber(state, action) {
      state.selectedNumber = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHexagramList.pending, (state) => {
        state.listLoading = true
        state.listError = null
        state.subscriptionRequired = false
      })
      .addCase(fetchHexagramList.fulfilled, (state, action) => {
        state.listLoading = false
        state.hexagrams = action.payload
      })
      .addCase(fetchHexagramList.rejected, (state, action) => {
        state.listLoading = false
        state.listError =
          action.payload?.message || 'Failed to load hexagram list'
        state.subscriptionRequired = Boolean(
          action.payload?.subscriptionRequired
        )
      })
      .addCase(fetchHexagram.pending, (state) => {
        state.loading = true
        state.error = null
        state.hexagram = null
        state.subscriptionRequired = false
      })
      .addCase(fetchHexagram.fulfilled, (state, action) => {
        state.loading = false
        state.hexagram = action.payload
      })
      .addCase(fetchHexagram.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Something went wrong'
        state.subscriptionRequired = Boolean(
          action.payload?.subscriptionRequired
        )
      })
  }
})

export const { setSelectedNumber } = hexagramSlice.actions
export default hexagramSlice.reducer
