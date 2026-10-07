import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Board from './pages/Board'

import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <div className='bg-linear-to-br from-pink-900  to-black min-h-screen mx-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/board' element={<Board />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}


export default App
