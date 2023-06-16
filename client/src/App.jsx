import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import { NavUserNotifications } from './components'
import {
  SearchPage,
  TutorProfile,
  // TestLoginPage,
  TutorForm,
  Landing,
  Login,
  Register,
} from './views'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tutor/:id" element={<TutorProfile />} />
        {/* <Route path='/testlogin' element={<TestLoginPage />} /> */}
        <Route path="/navuser" element={<NavUserNotifications />} />
        <Route path="/form" element={<TutorForm />} />
      </Routes>
    </div>
  )
}

export default App
