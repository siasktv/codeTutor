import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//initialState
const initialState = {
  tutors: [
    {
      _id: '',
      user: {},
      bio: {},
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
      bio: {},
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
  location: '',
  selectedRate: 0,
  selectedReview: 1,
  selectedLanguage: '',
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

function filterTutors(state, tutors) {
  const { location, selectedRate, selectedLanguage } = state

  return tutors.filter((tutor) => {
    if (selectedLanguage) {
      if (!tutor.languages.some((lang) => lang.language === selectedLanguage))
        return false
    }
    if (selectedRate) {
      const rate = tutor.rates.find(({ name }) => name === 'Mentorship').value
      if (rate < selectedRate) return false
    }
    if (location) {
      if (state.location !== tutor.user.location.toLowerCase()) return false
    }

    return true
  })
}

//Create Slice
const tutorsSlice = createSlice({
  name: 'tutors',
  initialState,
  reducers: {
    sortedByLocation(state, action) {
      state.location = action.payload.toLowerCase()
      state.tutors = filterTutors(state, state.allTutors)
    },
    sortedByRate(state, action) {
      console.log(action.payload)
      state.selectedRate = parseInt(action.payload)
      state.tutors = filterTutors(state, state.allTutors)
    },
    // sortedByReview(state, action) {
    //   state.selectedReview = parseInt(action.payload)
    //   state.tutors = Array.from(state.allTutors).filter((tutor) => {
    //     return state.selectedReview.includes(
    //       tutor.
    //     )
    //   })
    // }

    sortedByLanguages(state, action) {
      console.log(action.payload)
      state.selectedLanguage = action.payload
      state.tutors = filterTutors(state, state.allTutors)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(tutorsFetch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(tutorsFetch.fulfilled, (state, action) => {
        state.loading = false
        state.tutors = action.payload
        state.tutors.map((tutor) => {
          if (!state.locations.includes(tutor.user.location)) {
            state.locations.push(tutor.user.location)
          }
        })
        state.allTutors = action.payload
        state.tutors.map((tutor) => {
          if (!state.locations.includes(tutor.user.location)) {
            state.locations.push(tutor.user.location)
          }
        })
      })
      .addCase(tutorsFetch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { sortedByLocation, sortedByRate, sortedByLanguages } =
  tutorsSlice.actions

export default tutorsSlice.reducer
