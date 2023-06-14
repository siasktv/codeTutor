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
  locations: [],
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
  reducers: {
    sortedByLocation(state, action) {
      state.locations = action.payload.toLowerCase()
      state.tutors = Array.from(state.allTutors).filter((tutor) => {
        state.locations.includes(tutor.location.toLowerCase())
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tutorsFetch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(tutorsFetch.fulfilled, (state, action) => {
        console.log('payload', action.payload)
        state.loading = false
        state.tutors = action.payload
        state.tutors.map((tutor) => {
          if (!state.locations.includes(tutor.user.location)) {
            state.locations.push(tutor.user.location)
          }
        })
        state.allTutors = action.payload
      })
      .addCase(tutorsFetch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default tutorsSlice.reducer
