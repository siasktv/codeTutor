
import './App.css'
import { Routes,Route,Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import SearchPage  from './components/Search-page'

function App() {

  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={<Landing/>} />
      <Route path='/search' element={<SearchPage/>} />



      </Routes>
    </div>
  )
}

export default App