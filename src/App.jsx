import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Add from './assets/components/Add'
import Listing from './assets/components/Listing'
import Update from './assets/components/Update'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Listing />} />
        <Route path='*' element={<Listing />} />
        <Route path='/add' element={<Add />} />
        <Route path='/listing' element={<Listing />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </div>
  )
}

export default App