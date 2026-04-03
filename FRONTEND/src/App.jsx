import { useState } from 'react'

import { ToastContainer } from "react-toastify";

import { Routes, Route } from 'react-router-dom'
import UserLayout from './Layouts/UserLayout'
import Home from './Pages/Home/Home'
import ShowBurger from './Pages/ShowBurger/ShowBurger'
import AddBurger from './Pages/Burger/AddBurger'
import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Blog from './Pages/Blog/Blog';

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
          <Route path='/addburger' element={<AddBurger />} />
          <Route path='/addburger/:id' element={<AddBurger />} />
          <Route path='/burgerlist' element={<ShowBurger />} />
          <Route path='/blog' element={<Blog />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
