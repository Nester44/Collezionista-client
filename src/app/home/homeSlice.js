import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import CollectionAPI from "../../shared/api/collectionAPI"
import ItemAPI from "../../shared/api/itemAPI"
import createAsyncThunkWithId from "../../util/createAsyncThunkId"

const initialState = {
  tags: [],
  largestCollections: [],
  recentItems: [],
  isFetching: false
}

export const getTags = createAsyncThunkWithId(
  'home/getTags',
  ItemAPI.getTags
)
export const getLargestCollections = createAsyncThunkWithId(
  'home/getLargestCollections',
  CollectionAPI.getLargestCollections
)

export const getRecentItems = createAsyncThunkWithId(
  'home/getRecentItems',
  ItemAPI.getRecentItems
)



const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload
    })

    builder.addCase(getLargestCollections.fulfilled, (state, action) => {
      state.largestCollections = action.payload
    })

    builder.addCase(getRecentItems.fulfilled, (state, action) => {
      state.recentItems = action.payload
    })
  }
})

export const tagsSelector = (state) => state.home.tags
export const largestCollectionsSelector = (state) => state.home.largestCollections
export const recentItemsSelector = (state) => state.home.recentItems

export default homeSlice.reducer