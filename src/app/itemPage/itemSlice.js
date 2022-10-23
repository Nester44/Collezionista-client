import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import itemAPI from "../../shared/api/itemAPI"
import createAsyncThunkWithId from "../../shared/factory/createAsyncThunkId"

const initialState = {
  item: null,
  isFetching: false,
}

// export const getItem = createAsyncThunkWithId('item/getItem', itemAPI.get)

export const getItem = createAsyncThunk(
  'item/getItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await itemAPI.get(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getItem.pending, (state, action) => {
      state.isFetching = true
    })
    builder.addCase(getItem.fulfilled, (state, action) => {
      state.item = action.payload
      state.isFetching = false
    })
  }
})

export const itemSelector = (state) => state.item.item
export const itemPendingSelector = (state) => state.item.isFetching

export default itemSlice.reducer