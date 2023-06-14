import { configureStore } from '@reduxjs/toolkit'
import tutorsSlice from './features/tutors/tutorsSlice'
import usersSlice from './features/users/usersSlice'
// import usersReducer from './usersReducer'

const store = configureStore({
  reducer: {
    tutors: tutorsSlice,
    users: usersSlice
  }
})

export default store
