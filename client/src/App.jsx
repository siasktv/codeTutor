
import './App.css'
import { Routes,Route,Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import SearchPage  from './components/SearchPage'
import TutorProfile from './components/TutorProfile'

function App() {

  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={<Landing/>} />
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/tutor' element={<TutorProfile/>} />



      </Routes>
    </div>
  )
}

export default App