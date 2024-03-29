import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

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
      reviews: [],
      rates: [],
      mentorship: 0,
      freelance: 0,
      skills: [],
      socialMedia: [],
      status: '',
      bankAccount: {}
    }
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
      reviews: [],
      rates: [],
      mentorship: 0,
      freelance: 0,
      skills: [],
      socialMedia: [],
      status: '',
      bankAccount: {}
    }
  ],
  tutor: {
    _id: '',
    user: {},
    bio: {},
    experience: [],
    languages: [],
    offline: false,
    timezone: '',
    projects: [],
    reviews: [],
    rates: [],
    skills: [],
    socialMedia: [],
    status: '',
    sessions: [],
    bankAccount: {}
  },
  tutorsAdmin: [
    {
      _id: '',
      user: {},
      bio: {},
      experience: [],
      languages: [],
      offline: false,
      timezone: '',
      projects: [],
      reviews: [],
      rates: [],
      mentorship: 0,
      freelance: 0,
      skills: [],
      socialMedia: [],
      status: '',
      bankAccount: {}
    }
  ],
  locations: [],
  location: '',
  selectedRate: 150,
  selectedReview: false,
  selectedLanguage: '',
  selectedTech: '',
  currentSearch: ''
}

//createThunk
export const tutorsFetch = createAsyncThunk('tutors/tutorsFetch', async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/tutors`)
    return response.data
      .filter(tutor => tutor.status === 'approved')
      .sort(
        // sort by the average rating of the tutor
        (a, b) =>
          b.reviews.reduce((acc, review) => acc + review.rating, 0) /
            b.reviews.length -
          a.reviews.reduce((acc, review) => acc + review.rating, 0) /
            a.reviews.length
      )
  } catch (error) {
    console.log(error)
  }
})

export const tutorFetchById = createAsyncThunk(
  'tutors/tutorFetchById',
  async id => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/tutors/${id}`)
      return response.data
    } catch (error) {
      state.error = error.message
    }
  }
)

export const tutorsFetchAdmin = createAsyncThunk(
  'tutors/tutorsFetchAdmin',
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/tutors`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

function filterTutors (state, tutors) {
  const {
    currentSearch,
    location,
    selectedRate,
    selectedLanguage,
    selectedReview,
    selectedTech
  } = state

  return tutors.filter(tutor => {
    if (currentSearch) {
      if (
        !tutor.bio.specialty
          .toLowerCase()
          .includes(currentSearch.toLowerCase()) &&
        !tutor.user.fullName.toLowerCase().includes(currentSearch.toLowerCase())
      )
        return false
    }
    if (selectedLanguage) {
      if (!tutor.languages.some(lang => lang.language === selectedLanguage))
        return false
    }
    if (selectedTech) {
      if (
        !tutor.skills.some(
          ({ techName }) =>
            techName.name.toLowerCase() === selectedTech.toLowerCase()
        ) ||
        !tutor.skills.length
      )
        return false
    }

    if (selectedRate) {
      const rate = tutor.rates.find(({ name }) => name === 'Mentorship').value
      if (rate > selectedRate) return false
    }
    if (selectedReview) {
      if (tutor.reviews.length === 0) return false
      const totalRating = tutor.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      )
      const averageRating = Math.round(totalRating / tutor.reviews.length)

      // Almacena el promedio de calificación en cada tutor
      tutor.averageRating = averageRating
      if (state.selectedReview !== averageRating) return false
    }

    if (location) {
      if (state.location.toLowerCase() !== tutor.user.location.toLowerCase())
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
    sortedBySearch (state, action) {
      state.currentSearch = action.payload
      state.tutors = filterTutors(state, state.allTutors)
    },
    sortedByTech (state, action) {
      if (action.payload === 'Todos') {
        state.selectedTech = ''
        state.tutors = filterTutors(state, state.allTutors)
        return
      } else {
        state.selectedTech = action.payload
        state.tutors = filterTutors(state, state.allTutors)
      }
    },
    sortedByLocation (state, action) {
      if (action.payload === 'Todos') {
        state.location = ''
        state.tutors = filterTutors(state, state.allTutors)
        return
      } else {
        state.location = action.payload.toLowerCase()
        state.tutors = filterTutors(state, state.allTutors)
      }
    },
    sortedByRate (state, action) {
      state.selectedRate = parseInt(action.payload)
      state.tutors = filterTutors(state, state.allTutors)
    },
    sortedByReview (state, action) {
      if (action.payload === 'Todos') {
        state.selectedReview = false
        state.tutors = filterTutors(state, state.allTutors)
        return
      } else {
        state.selectedReview = parseInt(action.payload)
        state.tutors = filterTutors(state, state.allTutors)
      }
    },

    sortedByLanguages (state, action) {
      if (action.payload === 'Todos') {
        state.selectedLanguage = ''
        state.tutors = filterTutors(state, state.allTutors)
        return
      } else {
        state.selectedLanguage = action.payload
        state.tutors = filterTutors(state, state.allTutors)
      }
    }
  },

  extraReducers: builder => {
    builder
      .addCase(tutorsFetch.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(tutorsFetch.fulfilled, (state, action) => {
        state.loading = false
        state.tutors = action.payload
        state.tutors.forEach(tutor => {
          tutor.mentorship = tutor.rates.find(
            ({ name }) => name === 'Mentorship'
          ).value
          tutor.freelance = tutor.rates.find(
            ({ name }) => name === 'Freelance'
          )?.value
        })
        state.tutors.forEach(tutor => {
          if (!state.locations.includes(tutor.user.location)) {
            state.locations.push(tutor.user.location)
          }
        })
        state.allTutors = action.payload
        state.tutors.map(tutor => {
          if (!state.locations.includes(tutor.user.location)) {
            state.locations.push(tutor.user.location)
          }
        })
      })
      .addCase(tutorsFetch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(tutorFetchById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(tutorFetchById.fulfilled, (state, action) => {
        state.loading = false
        state.tutor = action.payload
      })
      .addCase(tutorFetchById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(tutorsFetchAdmin.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(tutorsFetchAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.tutorsAdmin = action.payload
      })
  }
})

export const {
  sortedBySearch,
  sortedByTech,
  sortedByLocation,
  sortedByRate,
  sortedByReview,
  sortedByLanguages
} = tutorsSlice.actions

export default tutorsSlice.reducer
