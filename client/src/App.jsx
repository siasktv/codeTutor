import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import { NavUserNotifications } from './components'
import {
  SearchPage,
  TutorProfile,
<<<<<<< HEAD
  TestLoginPage,
  Landing,
  Login,
  Register,
  TutorForm,
=======
  // TestLoginPage,
  Landing,
  Login,
  Register
>>>>>>> 7b7261f48fc1d2f54261d7557d7a9b4f4a0f2e42
} from './views'

function App() {
  return (
    <div className="App">
      <Routes>
<<<<<<< HEAD
<<<<<<< HEAD
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/tutor" element={<TutorProfile />} />
        <Route path="/testlogin" element={<TestLoginPage />} />
        <Route path="/navuser" element={<NavUserNotifications />} />
        <Route path="/form" element={<TutorForm />} />
=======
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Landing />} />
=======
        <Route path='/' element={<Landing />} />
>>>>>>> 7fbb65612b2834324d6185290062ab970902d5ef
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/tutor/:id' element={<TutorProfile />} />
        {/* <Route path='/testlogin' element={<TestLoginPage />} /> */}
        <Route path='/navuser' element={<NavUserNotifications />} />
>>>>>>> 7b7261f48fc1d2f54261d7557d7a9b4f4a0f2e42
      </Routes>
    </div>
  )
}

export default App
