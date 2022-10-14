import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth-slice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer
  },
})
