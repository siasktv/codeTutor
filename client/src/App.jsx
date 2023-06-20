import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import { NavUserNotifications } from './components'
import {
  SearchPage,
  TutorProfile,
  // TestLoginPage,
  Landing,
  Login,
  Register,
  FormTutor,
} from './views'
// import { TutorFormData, TutorForm, TutorFormBio } from './layouts'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tutor/:id" element={<TutorProfile />} />
        <Route path="/navuser" element={<NavUserNotifications />} />
        {/* <Route path='/form' element={<TutorForm />} /> */}
        {/* <Route path='form/biografia' element={<TutorFormBio />} />
        <Route path='form/data' element={<TutorFormData />} /> */}
        <Route path="/tutor" element={<FormTutor />} />
      </Routes>
    </div>
  )
}

export default App
