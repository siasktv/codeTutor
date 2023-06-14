
import './App.css'
import { Routes,Route,Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import NavLogin from './components/NavLogin'

function App() {

  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={<Landing/>} />
      <Route path='/nav'  element={<NavLogin/>}/>



      </Routes>
    </div>
  )
}

export default App