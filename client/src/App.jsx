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
import { SocketContext, socket } from './socket/context'

function App () {
  return (
    <div className='App'>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/tutor/:id' element={<TutorProfile />} />
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/tutor' element={<FormTutor />} />
        </Routes>
      </SocketContext.Provider>
    </div>
  )
}

export default App
