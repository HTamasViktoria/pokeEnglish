import { useState } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Admin from './components/Admin'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Admin />
    </div>
  )
}

export default App
