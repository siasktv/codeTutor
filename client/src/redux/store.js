import { configureStore } from '@reduxjs/toolkit'
import tutorsSlice from './features/tutors/tutorsSlice'
import usersSlice from './features/users/usersSlice'
import techesSlice from './features/teches/techesSlice'
import locationsSlice from './features/locations/locationsSlice'
import localUserSlice from './features/localUser/localUserSlice'
// import usersReducer from './usersReducer'
import sessionsSlice from './features/sessions/sessionsSlice'
import cashoutsSlice from './features/cashouts/cashoutsSlice'

const store = configureStore({
  reducer: {
    tutors: tutorsSlice,
    users: usersSlice,
    teches: techesSlice,
    locations: locationsSlice,
    localUser: localUserSlice,
    sessions: sessionsSlice,
    cashouts: cashoutsSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
})

export default store
