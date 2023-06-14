import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './views/Landing'
import SearchPage from './views/SearchPage'
import TutorProfile from './views/TutorProfile'
import TestLoginPage from './views/testLoginPage'

function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Landing />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/tutor' element={<TutorProfile />} />
        <Route path='/testlogin' element={<TestLoginPage />} />
      </Routes>
    </div>
  )
}

export default App
