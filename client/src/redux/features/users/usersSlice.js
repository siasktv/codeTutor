import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const initialState = {
  users: [
    {
      _id: '',
      fullName: '',
      email: '',
      image: '',
      location: '',
      timezone: '',
      role: '',
      register_date: '',
      offline: false,
      admin: false,
      uid: ''
    }
  ],
  allUsers: [
    {
      _id: '',
      fullName: '',
      email: '',
      image: '',
      location: '',
      timezone: '',
      role: '',
      register_date: '',
      offline: false,
      admin: false,
      uid: ''
    }
  ]
}

export const usersFetch = createAsyncThunk('users/usersFetch', async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users`)

    return response.data
  } catch (error) {
    console.log(error)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(usersFetch.pending, state => {
        state.loading = true
      })
      .addCase(usersFetch.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
        state.allUsers = action.payload
      })
      .addCase(usersFetch.rejected, state => {
        state.loading = false
      })
  }
})

export default usersSlice.reducer
