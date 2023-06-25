import './App.css'
import { Routes, Route } from 'react-router-dom'
import {
  SearchPage,
  TutorProfile,
  Landing,
  Login,
  Register,
  FormTutor,
<<<<<<< HEAD
  Meeting,
  Payments,
=======
  Meeting
>>>>>>> 06f89f39b7578c78bfdc559cfb7da967478b521f
} from './views'
import UserDashboard from './views/UserDashboard'
import { SocketContext, socket } from './socket/context'
import RestorePassword from './views/RestorePassword'
import { NavUserNotifications } from './components'
import useUser from './hooks/useUser'

//stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  'pk_test_51NMaUGDN7UYcr2v7LNIElBT2HpcY849dutlAzq7VDqLgjhKOZY95Dlohz4T8rJkfY0euqOeg2IFVGSRB1JUFtRJN00fjPJMtlh'
)

function App() {
  const user = useUser()
  return (
<<<<<<< HEAD
    <div className="App">
      <Elements stripe={stripePromise}>
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
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </SocketContext.Provider>
      </Elements>
=======
    <div className='App'>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/restore' element={<RestorePassword />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/tutor/:id' element={<TutorProfile />} />
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/tutor' element={<FormTutor />} />
          <Route path='/meeting/:id' element={<Meeting />} />
        </Routes>
      </SocketContext.Provider>
>>>>>>> 06f89f39b7578c78bfdc559cfb7da967478b521f
    </div>
  )
}

export default App
