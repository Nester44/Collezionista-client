import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import collectionAPI from "../../shared/api/collectionAPI"
import createAsyncThunkWithId from "../../shared/factory/createAsyncThunkId"

const initialState = {
  collection: null,
  isFetching: false
}

export const getCollection = createAsyncThunkWithId('collection/getCollection', collectionAPI.getCollection)

export const editDescription = createAsyncThunk(
  'collection/editDescription',
  async ({ id, description }, { rejectWithValue }) => {
    try {
      const response = await collectionAPI.editDescription(id, description)
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const updateCollection = createAsyncThunk(
  'collection/updateCollection',
  async (collection, { rejectWithValue }) => {
    try {
      const response = await collectionAPI.updateCollection(collection)
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.fulfilled, (state, action) => {
        state.collection = action.payload
        state.isFetching = false
      })

      .addCase(editDescription.fulfilled, (state, action) => {
        state.collection = action.payload
      })


      .addCase(editDescription.rejected, (state, action) => {
        console.error(action.payload)
      })

      .addCase(updateCollection.fulfilled, (state, action) => {
        state.collection = action.payload
      })
  }
})

export const collectionSelector = (state) => state.collection.collection

export default collectionSlice.reducer