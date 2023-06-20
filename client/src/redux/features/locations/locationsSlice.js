import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

//initialState
const initialState = {
  locations: []
}

//thunks
export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/locations`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

//slice
const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLocations.fulfilled]: (state, action) => {
      state.locations = action.payload
    }
  }
})

//selectors
export const selectLocations = state => state.locations.locations

//reducer
export default locationsSlice.reducer
