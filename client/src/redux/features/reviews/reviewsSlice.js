import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// Estado inicial
const initialState = {
  reviews: []
}

// Thunk asincrónico para obtener las reviews
export const reviewsFetch = createAsyncThunk(
  'reviews/reviewsFetch',
  async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reviews`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

// Slice de reviews
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(reviewsFetch.fulfilled, (state, action) => {
      state.reviews = action.payload
    })
  }
})

export default reviewsSlice.reducer
