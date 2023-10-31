import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import Header from './components/Header.jsx'
import Login from './Pages/Login.jsx'
import './App.css'
import SuppliesPage from './Pages/SuppliesPage.jsx';
import { Supplies } from './Context/supplies.context.jsx';
import { CategorySupplies } from './Context/suppliescategory.context.jsx';

function App() {


  return (
    <>
      <BrowserRouter>
          <CategorySupplies>
            <Supplies>
              <Navbar />
              <Routes>
                <Route path='/SuppliesPage' element={<SuppliesPage />} />

              </Routes>
            </Supplies>
          </CategorySupplies>
      </BrowserRouter>

    </>
  )
}

export default App
