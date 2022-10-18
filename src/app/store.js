import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth-slice'
import appReducer from './appSlice'
import profileReducer from './profile/profileSlice'
import collectionReducer from './collection/collectionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    collection: collectionReducer,
  },
})
