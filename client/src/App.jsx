import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/SendEmails';
import Dashboard from './pages/Dashboard'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App