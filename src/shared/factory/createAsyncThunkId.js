import { createAsyncThunk } from "@reduxjs/toolkit"

const createAsyncThunkWithId = (name, callback) => {
  return createAsyncThunk(
    name,
    async (id, { rejectWithValue }) => {
      try {
        const response = await callback(id)
        return response.data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )
}

export default createAsyncThunkWithId