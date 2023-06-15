import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'


import { NavUserNotifications } from './components'
import { SearchPage, TutorProfile, TestLoginPage, Landing,Login,Register } from './views'

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
