import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  SearchPage,
  TutorProfile,
  Landing,
  Login,
  Register
} from './views'
import NavUserSearch from './components/NavUserSearch'
import UserDashboard from './views/UserDashboard'

function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/tutor/:id' element={<TutorProfile />} />
        <Route path='/user' element={<UserDashboard />} />
        
      </Routes>
    </div>
  )
}

export default App
