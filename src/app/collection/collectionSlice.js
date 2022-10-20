import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import collectionAPI from "../../shared/api/collectionAPI"
import ItemAPI from "../../shared/api/itemAPI"
import createAsyncThunkWithId from "../../shared/factory/createAsyncThunkId"

const initialState = {
  collection: null,
  isFetching: false,
  tags: [],
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

export const createItem = createAsyncThunk(
  'collection/createItem',
  async ({ collectionId, name, tags, attributes }, { rejectWithValue }) => {
    try {
      const response = await ItemAPI.create(collectionId, name, tags, attributes)
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteItem = createAsyncThunkWithId('collection/deleteItem', ItemAPI.delete)

export const fetchTags = createAsyncThunkWithId('collection/fetchTags', ItemAPI.getTags)

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

      .addCase(deleteItem.fulfilled, (state, action) => {
        const deletedId = Number(action.payload.deletedId)
        state.collection.Items =
          state.collection.Items.filter(i => i.id !== deletedId)
      })

      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload.map((tag) => tag.name)
      })

      .addCase(createItem.fulfilled, (state, action) => {
        state.collection.Items.push(action.payload)
      })
  }
})

export const collectionSelector = (state) => state.collection.collection
export const tagsSelector = (state) => state.tags

export default collectionSlice.reducer