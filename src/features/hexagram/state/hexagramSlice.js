import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, API_CONFIG } from '@/shared/api/config'

export const fetchHexagramList = createAsyncThunk(
  'hexagram/fetchHexagramList',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get(API_CONFIG.ENDPOINTS.LIST_HEXAGRAMS)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// Backend only needs the number now — it looks up the canonical
// pinyin/english names itself rather than trusting them from the client.
export const fetchHexagram = createAsyncThunk(
  'hexagram/fetchHexagram',
  async (number, { rejectWithValue }) => {
    try {
      return await api.post(API_CONFIG.ENDPOINTS.GENERATE_HEXAGRAM, { number })
    } catch (err) {
      return rejectWithValue(err.message)
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
  error: null
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
      })
      .addCase(fetchHexagramList.fulfilled, (state, action) => {
        state.listLoading = false
        state.hexagrams = action.payload
      })
      .addCase(fetchHexagramList.rejected, (state, action) => {
        state.listLoading = false
        state.listError = action.payload || 'Failed to load hexagram list'
      })
      .addCase(fetchHexagram.pending, (state) => {
        state.loading = true
        state.error = null
        state.hexagram = null
      })
      .addCase(fetchHexagram.fulfilled, (state, action) => {
        state.loading = false
        state.hexagram = action.payload
      })
      .addCase(fetchHexagram.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong'
      })
  }
})

export const { setSelectedNumber } = hexagramSlice.actions
export default hexagramSlice.reducer
