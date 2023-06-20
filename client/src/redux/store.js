import { configureStore } from '@reduxjs/toolkit'
import tutorsSlice from './features/tutors/tutorsSlice'
import usersSlice from './features/users/usersSlice'
import techesSlice from './features/teches/techesSlice'
import locationsSlice from './features/locations/locationsSlice'
// import usersReducer from './usersReducer'

const store = configureStore({
  reducer: {
    tutors: tutorsSlice,
    users: usersSlice,
    teches: techesSlice,
    locations: locationsSlice
  }
})

export default store
