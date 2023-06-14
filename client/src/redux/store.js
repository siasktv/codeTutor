import { configureStore } from '@reduxjs/toolkit'
import tutorsSlice from './features/tutors/tutorsSlice'
// import usersReducer from './usersReducer'

const store = configureStore({
  reducer: {
    tutors: tutorsSlice,
  },
})

export default store
