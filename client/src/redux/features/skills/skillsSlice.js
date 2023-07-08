import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

//initialState
const initialState = {
  skills: [
    {
      _id: '',
      tutor: '',
      techName: {},
      years: 1,
      description: '',
    },
  ],
  skill: {
    _id: '',
    tutor: '',
    techName: {},
    years: 1,
    description: '',
  },
}

//thunks
//para traer todas las skills
export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const { data } = await axios.get(`${BACKEND_URL}/api/skillstech`)
  return data
})

//para modificar una skill
export const updateSkill = createAsyncThunk(
  'skills/updateSkill',
  async (id, payload) => {
    const { data } = await axios.put(
      `${BACKEND_URL}/api/skillstech/${id}`,
      payload
    )
    return data
  }
)

//para crear una skill
export const createSkill = createAsyncThunk(
  'skills/createSkill',
  async (payload) => {
    const { data } = await axios.post(`${BACKEND_URL}/api/skillstech`, payload)
    return data
  }
)

//para borrar una skill
export const deleteSkill = createAsyncThunk(
  'skills/deleteSkill',
  async (id) => {
    const { data } = await axios.delete(`${BACKEND_URL}/api/skillstech/${id}`)
    return data
  }
)

//slice
const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.skill = action.payload
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.skill = action.payload
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skill = action.payload
      })
  },
})

export default skillsSlice.reducer
