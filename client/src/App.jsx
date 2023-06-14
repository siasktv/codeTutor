
import './App.css'
import { Routes,Route,Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import NavLogin from './components/NavLogin'
import Landing from './views/Landing'
import SearchPage  from './views/SearchPage'
import TutorProfile from './views/TutorProfile'

function App() {

  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={<Landing/>} />
      <Route path='/nav'  element={<NavLogin/>}/>
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/tutor' element={<TutorProfile/>} />



      </Routes>
    </div>
  )
}

export default App