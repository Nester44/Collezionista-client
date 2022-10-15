import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthAPI from '../../shared/api/authAPI'
import AuthError from '../../shared/api/ErrorApi'

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

export const register = createAsyncThunk(
  'auth/register',
  async ({ password, email, name }, thunkAPI) => {
    try {
      const response = await AuthAPI.register(password, email, name)
      return response.data
    } catch (error) {
      debugger;
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
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
      })
      .addCase(register.rejected, (state, action) => {
        if (action.payload?.response?.status === 500) {
          const messageId = action.payload.response.data.message
          throw new AuthError(messageId)
        }
        throw AuthError.UnexpectedError()
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload?.response?.status === 401) {
          throw AuthError.IncorrectData()
        }
        throw AuthError.UnexpectedError()
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

export const currentUserSelector = (state) => state.auth.user
export const userIdSelector = (state) => state.auth.user?.id
export const nameSelector = (state) => state.auth.user?.name
export const isAuthSelector = (state) => state.auth.isAuth
export const isCheckedSelector = (state) => state.auth.isChecked

export default authSlice.reducer