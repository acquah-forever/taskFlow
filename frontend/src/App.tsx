import Home  from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Board  from './pages/Board'

const App = () => {
  return (
    <div className='bg-pink-900 min-h-screen mx-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </div>
  )
}

export default App
