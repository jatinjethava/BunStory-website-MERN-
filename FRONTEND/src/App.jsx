import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import { Routes, Route } from 'react-router-dom'

import AdminLayout from './Layouts/AdminLayout'
import AdminLogin from './Components/AdminLogin';

import UserLayout from './Layouts/UserLayout'
import Home from './Pages/Home/Home'
import ShowBurger from './Pages/ShowBurger/ShowBurger'
import AddBurger from './Pages/Burger/AddBurger'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Blog from './Pages/Blog/Blog';
import './App.css'
import AdminHome from './Pages/AdminHome/AdminHome';
import NotFound from './Components/NotFound';
import Banner from './Pages/Banner/Banner';
import BlogBanner from './Pages/BlogBanner/BlogBanner';

function App() {

  return (
    <>
      <ToastContainer />
      {/* <Navbar /> */}
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin/login' element={<AdminLogin />} />

        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='addburger' element={<AddBurger />} />
          <Route path='addburger/:id' element={<AddBurger />} />
          <Route path='burgerlist' element={<ShowBurger />} />
          <Route path='blog' element={<Blog />} />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route path='adminhome' element={<AdminHome />} />
          <Route path='banner' element={<Banner />} />
          <Route path='blogbanner' element={<BlogBanner />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
