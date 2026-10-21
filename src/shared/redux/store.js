import { configureStore } from '@reduxjs/toolkit'
import hexagramReducer from '@/features/hexagram/state/hexagramSlice'
import castingReducer from '@/features/casting/state/castingSlice'
import authReducer from '@/features/auth/state/authSlice'
import accountReducer from '@/features/account/state/accountSlice'
import journeyReducer from '@/features/journey/state/journeySlice'
import saleReducer from '@/shared/redux/saleSlice'

export const store = configureStore({
  reducer: {
    hexagram: hexagramReducer,
    casting: castingReducer,
    auth: authReducer,
    account: accountReducer,
    journey: journeyReducer,
    sale: saleReducer
  }
})
