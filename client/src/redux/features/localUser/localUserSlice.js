import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// initialState
const initialState = {
  localUser: {}
}

// thunks
export const fetchLocalUser = createAsyncThunk(
  'localUser/fetchLocalUser',
  async user => {
    try {
      return user
    } catch (error) {
      console.log(error)
    }
  }
)

// slice
const localUserSlice = createSlice({
  name: 'localUser',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLocalUser.fulfilled]: (state, action) => {
      state.localUser = action.payload
    }
  }
})

// selectors
export const selectLocalUser = state => state.localUser.localUser

// reducer
export default localUserSlice.reducer
