import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import CollectionAPI from "../../shared/api/collectionAPI"
import userAPI from "../../shared/api/userAPI"
import createAsyncThunkWithId from "../../shared/factory/createAsyncThunkId"


const initialState = {
  user: null,
  isFetching: false
}

export const createCollection = createAsyncThunk(
  'profile/createCollection',
  async ({ user_id, name, description, topic, image, additionalFieldType }, { rejectWithValue }) => {
    try {
      const response = await CollectionAPI.create(user_id, name, description, topic, image, additionalFieldType)
      return response.data
    } catch (error) {
      console.log(error);
      return rejectWithValue(error)
    }
  }
)

export const deleteCollection = createAsyncThunk(
  'profile/deleteCollection',
  async (collection_id, { rejectWithValue }) => {
    try {
      const response = await CollectionAPI.delete(collection_id)
      return { ...response.data, deletedId: collection_id }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getUser = createAsyncThunkWithId('profile/getUser', userAPI.getUser)

// admin rights
export const makeAdmin = createAsyncThunkWithId('profile/makeAdmin', userAPI.makeAdmin)
export const removeAdmin = createAsyncThunkWithId('profile/removeAdmin', userAPI.removeAdmin)
export const blockUser = createAsyncThunkWithId('profile/blockUser', userAPI.block)
export const unblockUser = createAsyncThunkWithId('profile/unblockUser', userAPI.unblock)
export const deleteUserById = createAsyncThunkWithId('profile/deleteUserById', userAPI.delete)


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isFetching = false
      })
      .addCase(getUser.pending, (state) => {
        state.isFetching = true
      })
      .addCase(getUser.rejected, (state, action) => {
        console.error(action.payload)
        state.isFetching = false
      })

      .addCase(createCollection.fulfilled, (state, action) => {
        state.user.collections.push(action.payload)
      })
      .addCase(createCollection.rejected, () => {
        throw new Error('Something went wrong')
      })

      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.user.collections = state.user.collections.filter(c => c.id !== action.payload.deletedId)
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        debugger
      })

      .addCase(makeAdmin.fulfilled, (state, action) => {
        state.user.admin = true
      })
      .addCase(makeAdmin.rejected, (state, action) => {
        debugger
      })

      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.user.admin = false
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        debugger
      })

      .addCase(blockUser.fulfilled, (state, action) => {
        state.user.blocked = true
      })
      .addCase(blockUser.rejected, (state, action) => {
        debugger
      })

      .addCase(unblockUser.fulfilled, (state, action) => {
        state.user.blocked = false
      })
      .addCase(unblockUser.rejected, (state, action) => {
        debugger
      })

      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.user = null
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        debugger
      })
  }
})

export const profileSelector = (state) => state.profile?.user
export const profileIdSelector = (state) => state.profile?.user?.id
export const isFetchingSelector = (state) => state.profile?.isFetching

export default profileSlice.reducer