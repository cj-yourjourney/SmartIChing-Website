import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_CONFIG, api } from '@/shared/api/config'

const { ENDPOINTS } = API_CONFIG

// Public endpoint, so no sign-in and no authApi. Loaded once per page load:
// the banner, plan cards and home Pricing section all read the same result.
export const fetchSale = createAsyncThunk(
  'sale/fetchSale',
  async (_, { rejectWithValue }) => {
    try {
      return await api.get(ENDPOINTS.SALE)
    } catch (err) {
      return rejectWithValue(err?.message || 'Could not load the sale.')
    }
  },
  { condition: (_, { getState }) => getState().sale.status === 'idle' }
)

const initialState = {
  sale: null, // { active, code, name, percent_off, ends_at } while a sale runs
  status: 'idle' // 'idle' | 'loading' | 'loaded' | 'failed'
}

const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSale.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSale.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.sale = action.payload?.active ? action.payload : null
      })
      // A failed lookup just means "no sale": regular prices stay on screen.
      .addCase(fetchSale.rejected, (state) => {
        state.status = 'failed'
        state.sale = null
      })
  }
})

export default saleSlice.reducer
