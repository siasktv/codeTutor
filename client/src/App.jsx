import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import { NavUserNotifications } from './components'
import {
  SearchPage,
  TutorProfile,
  // TestLoginPage,
  Landing,
  Login,
  Register
} from './views'

function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search' element={<SearchPage />} />
<<<<<<< HEAD
        <Route path='/tutor/:id' element={<TutorProfile />} />
        <Route path='/testlogin' element={<TestLoginPage />} />
=======
        <Route path='/tutor' element={<TutorProfile />} />
        {/* <Route path='/testlogin' element={<TestLoginPage />} /> */}
        <Route path='/navuser' element={<NavUserNotifications />} />
>>>>>>> d1ae0525f476ab3551afac9975f6101c8a9fe245
      </Routes>
    </div>
  )
}

export default App
