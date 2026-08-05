import { configureStore } from '@reduxjs/toolkit'
import hexagramReducer from '@/features/hexagram/state/hexagramSlice'
import castingReducer from '@/features/casting/state/castingSlice'

export const store = configureStore({
  reducer: {
    hexagram: hexagramReducer,
    casting: castingReducer
  }
})
