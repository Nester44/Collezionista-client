import { createSlice } from "@reduxjs/toolkit"
import ItemAPI from "../../shared/api/itemAPI"
import createAsyncThunkWithId from "../../util/createAsyncThunkId"

const initialState = {
  items: []
}

export const getItemsByTag = createAsyncThunkWithId('search/getItemsByTag', ItemAPI.getItemsByTag)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getItemsByTag.fulfilled, (state, action) => {
      state.items = action.payload.Items
    })
  }
})

export const foundItemsSelector = (state) => state.search.items

export default searchSlice.reducer