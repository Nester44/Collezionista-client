import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  locale: localStorage.getItem('locale') || 'en',
  mode: localStorage.getItem('mode') || 'light',
  isDrawerOpen: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleLocale(state, action) {
      state.locale = action.payload
      localStorage.setItem('locale', action.payload)
    },

    toggleMode(state, action) {
      state.mode = action.payload
      localStorage.setItem('mode', action.payload)

    },

    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen
    }
  },
})

export const modeSelector = (state) => state.app.mode;
export const localeSelector = (state) => state.app.locale;
export const isDrawerOpenSelector = (state) => state.app.isDrawerOpen;

export const { toggleLocale, toggleMode, toggleDrawer } = appSlice.actions
export default appSlice.reducer