import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/SendEmails';
import Dashboard from './pages/Dashboard'
import AbsentPage from './pages/AbsentPage';
import { Sidebar } from './components/Sidebar';
const App = () => {
  return (
    <>
      <main className='flex h-screen'>
        <div className='w-[15vw] flex-shrink'>
          <Sidebar />
        </div>
        <div className='w-[85vw] flex h-screen overflow-y-auto overflow-x-hidden'>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/mark-absentees' element={<AbsentPage />} />
            <Route path='*' element={<h1>Not Found Ra babu</h1>} />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App