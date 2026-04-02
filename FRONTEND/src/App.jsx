import { useState } from 'react'

import { ToastContainer } from "react-toastify";

import { Routes, Route } from 'react-router-dom'
import UserLayout from './Layouts/UserLayout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Contact from './Pages/Burger/AddBurger'
import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'

function App() {

  return (
    <>
      <ToastContainer />
      {/* <Navbar /> */}
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route element={<UserLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/addburger' element={<Contact />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
