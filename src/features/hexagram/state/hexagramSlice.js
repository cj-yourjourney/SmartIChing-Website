import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, API_CONFIG } from '@/shared/api/config'

export const fetchHexagram = createAsyncThunk(
  'hexagram/fetchHexagram',
  async ({ number, pinyin_name, english_name }, { rejectWithValue }) => {
    try {
      return await api.post(API_CONFIG.ENDPOINTS.GENERATE_HEXAGRAM, {
        number,
        pinyin_name,
        english_name
      })
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  number: 40,
  pinyinName: 'Jie',
  englishName: 'Relief',
  hexagram: null,
  loading: false,
  error: null
}

const hexagramSlice = createSlice({
  name: 'hexagram',
  initialState,
  reducers: {
    setNumber(state, action) {
      state.number = action.payload
    },
    setPinyinName(state, action) {
      state.pinyinName = action.payload
    },
    setEnglishName(state, action) {
      state.englishName = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
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

export const { setNumber, setPinyinName, setEnglishName } =
  hexagramSlice.actions
export default hexagramSlice.reducer
