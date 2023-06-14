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
    if (location) {
      if (state.location !== tutor.user.location.toLowerCase()) return false
    }

    if (selectedRate) {
      const rate = tutor.rates.find(({ name }) => name === 'Mentorship').value
      if (rate >= selectedRate) return false
    }

    if (selectedLanguage) {
      if (tutor.languages.some(({ language }) => language === selectedLanguage))
        return false
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
      state.locations = action.payload.toLowerCase()
      state.tutors = filterTutors(state, state.allTutors)
    },
    sortedByRate(state, action) {
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
      const selectedLanguage = action.payload
      state.selectedLanguage = selectedLanguage
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
        state.tutors.forEach((tutor) => {
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
