import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// initialState
const initialState = {
  cashouts: [],
  cashout: {},
  allCashouts: []
}

// thunks
export const fetchCashoutsFromUserId = createAsyncThunk(
  'cashouts/fetchCashoutsFromUserId',
  async userId => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/cashouts/${userId}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchAllCashouts = createAsyncThunk(
  'cashouts/fetchAllCashouts',
  async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/cashouts`)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const cashoutsSlice = createSlice({
  name: 'cashouts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCashoutsFromUserId.fulfilled]: (state, action) => {
      state.cashouts = action.payload
    },
    [fetchAllCashouts.fulfilled]: (state, action) => {
      state.allCashouts = action.payload
    }
  }
})

export default cashoutsSlice.reducer
