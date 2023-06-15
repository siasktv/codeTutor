import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
<<<<<<< HEAD
import { NavLogin } from './components'
import {
  SearchPage,
  TutorProfile,
  TestLoginPage,
  Landing,
  TutorForm,
} from './views'
=======


import { NavUserNotifications } from './components'
import { SearchPage, TutorProfile, TestLoginPage, Landing,Login,Register } from './views'
>>>>>>> 4b87be0e9202a319872179430143347d26ec5087

function App() {
  return (
    <div className="App">
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/nav" element={<NavLogin />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tutor" element={<TutorProfile />} />
        <Route path="/testlogin" element={<TestLoginPage />} />
        <Route path="/form" element={<TutorForm />} />
=======
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={<Landing/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/tutor' element={<TutorProfile/>} />
      <Route path='/testlogin' element={<TestLoginPage />} />
      <Route path='/navuser' element={<NavUserNotifications />} />

>>>>>>> 4b87be0e9202a319872179430143347d26ec5087
      </Routes>
    </div>
  )
}

export default App
