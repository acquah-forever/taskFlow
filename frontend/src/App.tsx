import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Board from './pages/Board'

import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <div className='flex flex-col bg-linear-to-br from-pink-900 px-7 to-black min-h-screen'>
      <div className='container mx-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/board' element={<Board />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      </div>
    </div>
  )
}


export default App
