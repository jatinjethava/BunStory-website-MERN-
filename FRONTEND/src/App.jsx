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
import NotFound from './Components/NotFound';
import Banner from './Pages/Banner/Banner';
import BlogBanner from './Pages/BlogBanner/BlogBanner';
import BurgerDetail from './Pages/Details/BurgerDetail';
import './App.css'
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';
import MyOrders from './Pages/Orders/MyOrders';
import AdminOrders from './Pages/AdminOrders/AdminOrders';

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
          <Route path='burgerlist' element={<ShowBurger />} />
          <Route path='burgerlist/detail/:id' element={<BurgerDetail />} />
          <Route path='cart' element={<Cart />} />
          <Route path='blog' element={<Blog />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='myorders' element={<MyOrders />} />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route path='adminhome' element={<AddBurger />} />
          <Route path='adminhome/:id' element={<AddBurger />} />
          <Route path='banner' element={<Banner />} />
          <Route path='blogbanner' element={<BlogBanner />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
