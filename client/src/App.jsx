import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NavLogin } from './components'
import { SearchPage, TutorProfile, TestLoginPage, Landing } from './views'

function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Landing />} />
        <Route path='/nav' element={<NavLogin />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/tutor' element={<TutorProfile />} />
        <Route path='/testlogin' element={<TestLoginPage />} />
      </Routes>
    </div>
  )
}

export default App
