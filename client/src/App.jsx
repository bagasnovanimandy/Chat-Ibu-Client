import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/auth/RegisterPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<div>Welcome! Navigate to /register</div>} />
    </Routes>
  )
}

export default App
