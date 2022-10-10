import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthAPI from '../shared/api/authAPI'

const initialState = {
  user: null,
  isAuth: false,
  error: null,
  isChecked: false
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ password, email }, thunkAPI) => {
    try {
      const response = await AuthAPI.loginUser(password, email)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }

  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await AuthAPI.logout()
    return response.data
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await AuthAPI.checkAuth()
    return response.data
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload.response.status === 401) {
          state.error = 'Wrong combination of email and password'
        } else {
          state.error = 'Unexpected error'
        }

      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
        state.isChecked = true
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isChecked = true
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.isAuth = false
      })
  }
})

// export { } = authSlice.actions

export const isAuthSelector = (state) => state.auth.isAuth
export const isCheckedSelector = (state) => state.auth.isChecked

export default authSlice.reducer