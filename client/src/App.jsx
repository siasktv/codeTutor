import './App.css'
import { Routes, Route } from 'react-router-dom'
import {
  SearchPage,
  TutorProfile,
  Landing,
  Login,
  Register,
  FormTutor
} from './views'
import UserDashboard from './views/UserDashboard'
import { NavUserNotifications } from './components'

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
        <Route path='/navuser' element={<NavUserNotifications />} />
        <Route path='/tutor' element={<FormTutor />} />
      </Routes>
    </div>
  )
}

export default App
