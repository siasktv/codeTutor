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
      mentorship: 0,
      freelance: 0,
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
      mentorship: 0,
      freelance: 0,
      skills: [],
      socialMedia: [],
      status: '',
    },
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
      rates: [],
      skills: [],
      socialMedia: [],
      status: '',
  },
  locations: [],
  location: '',
  selectedRate: 150,
  selectedReview: 1,
  selectedLanguage: '',
  selectedTech: '',
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

export const tutorFetchById = createAsyncThunk(
  'tutors/tutorFetchById',
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/tutors/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

function filterTutors(state, tutors) {
  const { location, selectedRate, selectedLanguage, selectedTech } = state

  return tutors.filter((tutor) => {
    if (selectedLanguage) {
      if (!tutor.languages.some((lang) => lang.language === selectedLanguage))
        return false
    }
    if (selectedTech) {
      if (
        tutor.skills.some(
          ({ techName }) =>
            techName.name.toLowerCase() !== selectedTech.toLowerCase()
        )
      )
        return false
    }

    if (selectedRate) {
      const rate = tutor.rates.find(({ name }) => name === 'Mentorship').value
      if (rate > selectedRate) return false
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
    sortedByTech(state, action) {
      state.selectedTech = action.payload
      state.tutors = filterTutors(state, state.allTutors)
    },
    sortedByLocation(state, action) {
      state.location = action.payload.toLowerCase()
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
      console.log(action.payload)
      state.selectedLanguage = action.payload
      state.tutors = filterTutors(state, state.allTutors)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(tutorsFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tutorsFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.tutors = action.payload;
        state.tutors.forEach((tutor) => {
          tutor.mentorship = tutor.rates.find(
            ({ name }) => name === 'Mentorship'
          ).value
          tutor.freelance = tutor.rates.find(
            ({ name }) => name === 'Freelance'
          ).value
        })
        state.tutors.forEach((tutor) => {
          if (!state.locations.includes(tutor.user.location)) {
            state.locations.push(tutor.user.location);
          }
        });
        state.allTutors = action.payload;
        state.tutors.map((tutor) => {
          if (!state.locations.includes(tutor.user.location)) {
            state.locations.push(tutor.user.location);
          }
        });
      })
      .addCase(tutorsFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(tutorFetchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tutorFetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.tutor = action.payload;
        
      })
      .addCase(tutorFetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    
  },
})

export const {
  sortedByTech,
  sortedByLocation,
  sortedByRate,
  sortedByReview,
  sortedByLanguages,
} = tutorsSlice.actions

export default tutorsSlice.reducer
