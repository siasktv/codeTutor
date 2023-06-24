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
      uid: '',
      favoritesTutor: [],
    },
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
      uid: '',
      favoritesTutor: [],
    },
  ],
  user: {
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
    uid: '',
    favoritesTutor: [],
  },
}

export const usersFetch = createAsyncThunk('users/usersFetch', async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users`)

    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const userFetchById = createAsyncThunk('user/userFetch', async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersFetch.pending, (state) => {
        state.loading = true
      })
      .addCase(usersFetch.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
        state.allUsers = action.payload
      })
      .addCase(usersFetch.rejected, (state) => {
        state.loading = false
      })
      //para traer un unico User
      .addCase(userFetchById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userFetchById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(userFetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default usersSlice.reducer
