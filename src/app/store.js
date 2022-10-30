import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth-slice'
import appReducer from './appSlice'
import profileReducer from './profile/profileSlice'
import collectionReducer from './collection/collectionSlice'
import itemReducer from './itemPage/itemSlice'
import homeReducer from './home/homeSlice'
import searchReducer from './search/searchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    collection: collectionReducer,
    item: itemReducer,
    home: homeReducer,
    search: searchReducer,
  },
})
