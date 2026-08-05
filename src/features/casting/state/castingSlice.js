import { createSlice } from '@reduxjs/toolkit'
import { getHexagramByPattern } from '../data/mockHexagrams'

const initialState = {
  question: '',
  phase: 'idle', // idle -> casting -> complete
  lines: [], // bottom-to-top, each { char, changing, label, sum, coins }
  originalHexagram: null,
  resultingHexagram: null,
  hasChangingLines: false
}

function buildOriginalPattern(lines) {
  return lines.map((l) => l.char).join('')
}

function buildResultPattern(lines) {
  return lines.map((l) => (l.changing ? flip(l.char) : l.char)).join('')
}

function flip(char) {
  return char === 'y' ? 'n' : 'y'
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
      state.originalHexagram = null
      state.resultingHexagram = null
      state.hasChangingLines = false
    },
    // payload is the result of castLine() from utils/castLine.js —
    // randomness happens in the component before dispatch, keeping this
    // reducer pure.
    lineCast(state, action) {
      if (state.lines.length >= 6) return
      state.lines.push(action.payload)

      if (state.lines.length === 6) {
        const originalPattern = buildOriginalPattern(state.lines)
        const resultPattern = buildResultPattern(state.lines)
        state.hasChangingLines = state.lines.some((l) => l.changing)
        state.originalHexagram = getHexagramByPattern(originalPattern)
        state.resultingHexagram = state.hasChangingLines
          ? getHexagramByPattern(resultPattern)
          : null
        state.phase = 'complete'
      }
    },
    resetCasting() {
      return initialState
    }
  }
})

export const { setQuestion, startCasting, lineCast, resetCasting } =
  castingSlice.actions
export default castingSlice.reducer
