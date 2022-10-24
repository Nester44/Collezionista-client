import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ItemAPI from "../../shared/api/itemAPI"
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
      const response = await ItemAPI.get(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateItem = createAsyncThunk(
  'item/updateItem',
  async ({ id, name, tags, additionalFields }, { rejectWithValue }) => {
    try {
      const response = await ItemAPI.update(id, name, tags, additionalFields)
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

    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.item = action.payload
    })
  }
})

export const itemSelector = (state) => state.item.item
export const itemPendingSelector = (state) => state.item.isFetching

export default itemSlice.reducer