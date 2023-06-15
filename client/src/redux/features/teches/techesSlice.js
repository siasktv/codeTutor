import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//initialState
const initialState = {
  teches: [
    {
      _id: '',
      name: '',
      category: ''
    }
  ],
  allTeches: [
    {
      _id: '',
      name: '',
      category: ''
    }
  ],
  categories: []
}

//createThunk
export const techesFetch = createAsyncThunk('teches/techesFetch', async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/tech')
    return response.data
  } catch (error) {
    console.log(error)
  }
})

//createSlice
const techesSlice = createSlice({
  name: 'teches',
  initialState,
  reducers: {},
  extraReducers: {
    [techesFetch.fulfilled]: (state, action) => {
      state.teches = action.payload
      state.allTeches = action.payload
      state.categories = Array.from(
        new Set(action.payload.map(tech => tech.category))
      )
    }
  }
})

export default techesSlice.reducer
