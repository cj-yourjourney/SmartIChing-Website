import { configureStore } from '@reduxjs/toolkit'
import hexagramReducer from '@/features/hexagram/state/hexagramSlice'

export const store = configureStore({
  reducer: {
    hexagram: hexagramReducer
  }
})
