import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// initialState
const initialState = {
  localUser: {},
  chats: ['loading']
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
        `http://localhost:3001/api/conversations/${userId}`
      )
      return data
    } catch (error) {
      console.log(error)
    }
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
    }
  }
})

// selectors
export const selectLocalUser = state => state.localUser.localUser
export const selectLocalUserChats = state => state.localUser.chats

// reducer
export default localUserSlice.reducer
