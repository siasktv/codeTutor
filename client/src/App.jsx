import './App.css'
import { Routes, Route } from 'react-router-dom'
import {
  SearchPage,
  TutorProfile,
  Landing,
  Login,
  Register,
  FormTutor,
  Meeting,
  FAQs
} from './views'
import UserDashboard from './views/UserDashboard'
import { SocketContext, socket } from './socket/context'
import RestorePassword from './views/RestorePassword'
import { NavUserNotifications } from './components'
import useUser from './hooks/useUser'
import AdminDashboard from './views/AdminDashboard';
import TutorDashboard from './views/TutorDashboard'

function App () {
  const user = useUser()
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restore" element={<RestorePassword />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/tutor" element={<FormTutor />} />
          <Route path="/meeting/:id" element={<Meeting />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/tutordashboard" element={<TutorDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </SocketContext.Provider>
    </div>
  );
}

export default App
