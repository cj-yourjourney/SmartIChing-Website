import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, API_CONFIG } from '@/shared/api/config'

// Once all 6 lines are cast, the component sends the question + the raw
// 6/7/8/9 sum for each line (bottom to top) to the backend. The backend
// resolves the hexagram, applies the traditional moving-line rules, and
// returns the full reading — nothing about hexagram content or
// interpretation is computed on the frontend anymore.
export const castHexagram = createAsyncThunk(
  'casting/castHexagram',
  async ({ question, lines }, { rejectWithValue }) => {
    try {
      return await api.post(API_CONFIG.ENDPOINTS.CAST_HEXAGRAM, {
        question,
        lines
      })
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  question: '',
  phase: 'idle', // idle -> casting -> submitting -> complete | error
  lines: [], // bottom-to-top, each { char, changing, label, sum, coins }
  result: null, // full backend response — see views/casting.py's response shape
  error: null
}

const castingSlice = createSlice({
  name: 'casting',
  initialState,
  reducers: {
    setQuestion(state, action) {
      state.question = action.payload
    },
    startCasting(state) {
      state.phase = 'casting'
      state.lines = []
      state.result = null
      state.error = null
    },
    // payload is the result of castLine() from utils/castLine.js —
    // randomness happens in the component before dispatch, keeping this
    // reducer pure. Once the 6th line lands, the component (watching
    // lines.length) dispatches castHexagram — reducers can't trigger
    // async thunks themselves.
    lineCast(state, action) {
      if (state.lines.length >= 6) return
      state.lines.push(action.payload)
    },
    resetCasting() {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(castHexagram.pending, (state) => {
        state.phase = 'submitting'
        state.error = null
      })
      .addCase(castHexagram.fulfilled, (state, action) => {
        state.phase = 'complete'
        state.result = action.payload
      })
      .addCase(castHexagram.rejected, (state, action) => {
        state.phase = 'error'
        state.error = action.payload || 'Something went wrong'
      })
  }
})

export const { setQuestion, startCasting, lineCast, resetCasting } =
  castingSlice.actions
export default castingSlice.reducer
