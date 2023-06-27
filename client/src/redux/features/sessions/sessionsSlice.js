import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import moment from 'moment'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

//initialState
const initialState = {
  allSessions: [
    {
      id: '',
      price: '',
      date: '',
      duration: '',
      clientNationality: '',
      isPaid: '',
      clientName: '',
      clientEmail: '',
      UserIdClient: '',
      UserIdTutor: '',
      userInfo: {},
      tutorInfo: {}
    }
  ],
  session: {
    id: '',
    price: '',
    date: '',
    duration: '',
    clientNationality: '',
    isPaid: '',
    clientName: '',
    clientEmail: '',
    UserIdClient: '',
    UserIdTutor: '',
    userInfo: {},
    tutorInfo: {}
  },
  allSessionsByTutor: [
    {
      id: '',
      price: '',
      date: '',
      duration: '',
      clientNationality: '',
      isPaid: '',
      clientName: '',
      clientEmail: '',
      UserIdClient: '',
      UserIdTutor: '',
      userInfo: {},
      tutorInfo: {}
    }
  ],
  allSessionsByClient: [
    {
      id: '',
      price: '',
      date: '',
      duration: '',
      clientNationality: '',
      isPaid: '',
      clientName: '',
      clientEmail: '',
      UserIdClient: '',
      UserIdTutor: '',
      userInfo: {},
      tutorInfo: {}
    }
  ],
  allSessionsData: {
    earnings: 0,
    totalMinutes: 0
  },
  allSessionsDataByTutor: {
    earnings: 0,
    totalMinutes: 0
  },
  allSessionsDataByClient: {
    earnings: 0,
    totalMinutes: 0
  }
}

//async actions
export const fetchAllSessions = createAsyncThunk(
  'sessions/fetchAllSessions',
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/session`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchSession = createAsyncThunk(
  'sessions/fetchSession',
  async id => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/session/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchAllSessionsByTutor = createAsyncThunk(
  'sessions/fetchAllSessionsByTutor',
  async id => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/session/`)
      const sessions = response.data.filter(
        session => session.tutorUserId._id === id
      )
      return sessions
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchAllSessionsByClient = createAsyncThunk(
  'sessions/fetchAllSessionsByClient',
  async id => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/session/`)
      const sessions = response.data.filter(
        session => session.clientUserId._id === id
      )
      return sessions
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchAllSessionsData = createAsyncThunk(
  'sessions/fetchAllSessionsData',
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/session/`)
      const sessions = response.data
      let earnings = 0
      let totalMinutes = 0
      sessions.forEach(session => {
        earnings += session.price
        totalMinutes += session.minutes
      })
      return { earnings, totalMinutes }
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchAllSessionsDataByTutor = createAsyncThunk(
  'sessions/fetchAllSessionsDataByTutor',
  async id => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/session/`)
      const sessions = response.data.filter(
        session => session.tutorUserId._id === id
      )
      let earnings = 0
      let totalMinutes = 0
      sessions.forEach(session => {
        earnings += session.price
        totalMinutes += session.minutes
      })
      return { earnings, totalMinutes }
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchAllSessionsDataByClient = createAsyncThunk(
  'sessions/fetchAllSessionsDataByClient',
  async id => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/session/`)
      const sessions = response.data.filter(
        session => session.clientUserId._id === id
      )
      let earnings = 0
      let totalMinutes = 0
      sessions.forEach(session => {
        earnings += session.price
        totalMinutes += session.minutes
      })
      return { earnings, totalMinutes }
    } catch (error) {
      console.log(error)
    }
  }
)

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload
    }
  },
  extraReducers: {
    [fetchAllSessions.fulfilled]: (state, action) => {
      state.allSessions = action.payload.map(session => {
        return {
          id: session.sessionId,
          price: session.price,
          date: moment(session.appointmentDate).format('DD/MM/YYYY'),
          duration: isNaN(session.minutes) ? 0 : session.minutes,
          clientNationality: session.clientUserId.location,
          isPaid: session.isPaid,
          clientName: session.clientUserId.fullName,
          clientEmail: session.clientUserId.email,
          UserIdClient: session.clientUserId._id,
          UserIdTutor: session.tutorUserId._id,
          userInfo: session.clientUserId,
          tutorInfo: session.tutorUserId
        }
      })
    },
    [fetchSession.fulfilled]: (state, action) => {
      state.session = {
        id: action.payload.sessionId,
        price: action.payload.price,
        date: moment(action.payload.appointmentDate).format('DD/MM/YYYY'),
        duration: isNaN(action.payload.minutes) ? 0 : action.payload.minutes,
        clientNationality: action.payload.clientUserId.location,
        isPaid: action.payload.isPaid,
        clientName: action.payload.clientUserId.fullName,
        clientEmail: action.payload.clientUserId.email,
        UserIdClient: action.payload.clientUserId._id,
        UserIdTutor: action.payload.tutorUserId._id,
        userInfo: action.payload.clientUserId,
        tutorInfo: action.payload.tutorUserId
      }
    },
    [fetchAllSessionsByTutor.fulfilled]: (state, action) => {
      state.allSessionsByTutor = action.payload.map(session => {
        return {
          id: session.sessionId,
          price: session.price,
          date: moment(session.appointmentDate).format('DD/MM/YYYY'),
          duration: isNaN(session.minutes) ? 0 : session.minutes,
          clientNationality: session.clientUserId.location,
          isPaid: session.isPaid,
          clientName: session.clientUserId.fullName,
          clientEmail: session.clientUserId.email,
          UserIdClient: session.clientUserId._id,
          UserIdTutor: session.tutorUserId._id,
          userInfo: session.clientUserId,
          tutorInfo: session.tutorUserId
        }
      })
    },
    [fetchAllSessionsByClient.fulfilled]: (state, action) => {
      state.allSessionsByClient = action.payload.map(session => {
        return {
          id: session.sessionId,
          price: session.price,
          date: moment(session.appointmentDate).format('DD/MM/YYYY'),
          duration: isNaN(session.minutes) ? 0 : session.minutes,
          clientNationality: session.clientUserId.location,
          isPaid: session.isPaid,
          clientName: session.clientUserId.fullName,
          clientEmail: session.clientUserId.email,
          UserIdClient: session.clientUserId._id,
          UserIdTutor: session.tutorUserId._id,
          userInfo: session.clientUserId,
          tutorInfo: session.tutorUserId
        }
      })
    },
    [fetchAllSessionsData.fulfilled]: (state, action) => {
      state.allSessionsData = action.payload
    },
    [fetchAllSessionsDataByTutor.fulfilled]: (state, action) => {
      state.allSessionsDataByTutor = action.payload
    },
    [fetchAllSessionsDataByClient.fulfilled]: (state, action) => {
      state.allSessionsDataByClient = action.payload
    }
  }
})

export const { setSession } = sessionsSlice.actions

export default sessionsSlice.reducer
