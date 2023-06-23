import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// initialState
const initialState = {
  localUser: {},
  chats: ['loading'],
  soundEnabled: true,
  alertsEnabled: true
}

// thunks
export const fetchLocalUser = createAsyncThunk(
  'localUser/fetchLocalUser',
  async user => {
    try {
      return user
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchLocalUserChats = createAsyncThunk(
  'localUser/fetchLocalUserChats',
  async userId => {
    if (!userId) {
      return ['loading']
    }
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/conversations/${userId}`
      )
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const getNotificationsStatus = createAsyncThunk(
  'localUser/getNotificationsStatus',
  () => {
    const soundEnabled = localStorage.getItem('soundEnabled')
    const alertsEnabled = localStorage.getItem('alertsEnabled')

    if (!soundEnabled) {
      localStorage.setItem('soundEnabled', true)
    }
    if (!alertsEnabled) {
      localStorage.setItem('alertsEnabled', true)
    }

    return { soundEnabled, alertsEnabled }
  }
)

export const setNotificationsStatus = createAsyncThunk(
  'localUser/setNotificationsStatus',
  ({ soundEnabled, alertsEnabled }) => {
    console.log('soundEnabled', soundEnabled)
    console.log('alertsEnabled', alertsEnabled)
    localStorage.setItem('soundEnabled', soundEnabled)
    localStorage.setItem('alertsEnabled', alertsEnabled)
    return { soundEnabled, alertsEnabled }
  }
)

// slice
const localUserSlice = createSlice({
  name: 'localUser',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLocalUser.fulfilled]: (state, action) => {
      state.localUser = action.payload
    },
    [fetchLocalUserChats.fulfilled]: (state, action) => {
      state.chats = action.payload
    },
    [getNotificationsStatus.fulfilled]: (state, action) => {
      state.soundEnabled = action.payload.soundEnabled
      state.alertsEnabled = action.payload.alertsEnabled
    },
    [setNotificationsStatus.fulfilled]: (state, action) => {
      state.soundEnabled = action.payload.soundEnabled || state.soundEnabled
      state.alertsEnabled = action.payload.alertsEnabled || state.alertsEnabled
    }
  }
})

// selectors
export const selectLocalUser = state => state.localUser.localUser
export const selectLocalUserChats = state => state.localUser.chats
export const selectSoundEnabled = state => state.localUser.soundEnabled
export const selectAlertsEnabled = state => state.localUser.alertsEnabled

// reducer
export default localUserSlice.reducer
