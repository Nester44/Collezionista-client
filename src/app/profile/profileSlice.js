import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import CollectionAPI from "../../shared/api/collectionAPI"
import userAPI from "../../shared/api/userAPI"

const initialState = {
  user: null,
  isFetching: false
}

export const getUser = createAsyncThunk(
  'profile/getUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUser(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const createCollection = createAsyncThunk(
  'profile/createCollection',
  async ({ user_id, name, description, topic }, { rejectWithValue }) => {
    try {
      const response = await CollectionAPI.create(user_id, name, description, topic)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

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
  }
})

export const profileSelector = (state) => state.profile?.user
export const profileIdSelector = (state) => state.profile?.user?.id
export const isFetchingSelector = (state) => state.profile?.isFetching

export default profileSlice.reducer