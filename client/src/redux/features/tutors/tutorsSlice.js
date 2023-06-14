import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//initialState
const initialState = {
  tutors: [
    {
      _id: '',
      user: {},
      bio: [],
      experience: [],
      languages: [],
      offline: false,
      timezone: '',
      projects: [],
      rates: [],
      skills: [],
      socialMedia: [],
      status: '',
    },
  ],
  allTutors: [
    {
      _id: '',
      user: {},
      bio: [],
      experience: [],
      languages: [],
      offline: false,
      timezone: '',
      projects: [],
      rates: [],
      skills: [],
      socialMedia: [],
      status: '',
    },
  ],
  //   location: [],
}

//createThunk
export const tutorsFetch = createAsyncThunk('tutors/tutorsFetch', async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/tutors')

    return response.data
  } catch (error) {
    console.log(error)
  }
})

//Create Slice
const tutorsSlice = createSlice({
  name: 'tutors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tutorsFetch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(tutorsFetch.fulfilled, (state, action) => {
        state.loading = false
        state.tutors = action.payload
        state.allTutors = action.payload
      })
      .addCase(tutorsFetch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default tutorsSlice.reducer
