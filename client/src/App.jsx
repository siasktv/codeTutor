import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './views/Landing'
import SearchPage  from './views/SearchPage'
import TutorProfile from './views/TutorProfile'
import TestLoginPage from './views/testLoginPage'
import Login from './views/Login'
import Register from './views/Register'
import NavUserNotifications from './components/NavUserNotifications'


function App () {
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={<Landing/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/tutor' element={<TutorProfile/>} />
      <Route path='/testlogin' element={<TestLoginPage />} />
      <Route path='/navuser' element={<NavUserNotifications />} />

      </Routes>
    </div>
  )
}

export default App
