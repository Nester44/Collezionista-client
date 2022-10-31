import { createSlice } from "@reduxjs/toolkit"
import ItemAPI from "../../shared/api/itemAPI"
import createAsyncThunkWithId from "../../util/createAsyncThunkId"

const initialState = {
  items: [],
  pending: false
}

export const getItemsByTag = createAsyncThunkWithId('search/getItemsByTag', ItemAPI.getItemsByTag)
export const getItemsByQuery = createAsyncThunkWithId('seatch/getItemsByQuery', ItemAPI.getItemsByQuery)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(getItemsByQuery.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getItemsByTag.pending, (state) => {
      state.pending = true
    })

    builder.addCase(getItemsByTag.fulfilled, (state, action) => {
      if (action.payload?.Items) {
        state.items = action.payload.Items
      } else {
        state.items = []
      }
      state.pending = false

    })

    builder.addCase(getItemsByQuery.fulfilled, (state, action) => {
      state.items = action.payload
      state.pending = false
    })
  }
})

export const searchPendingSelector = (state) => state.search.pending
export const foundItemsSelector = (state) => state.search.items

export default searchSlice.reducer