import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <>
            <div className="h-full flex flex-col">
                <Navbar />

                <Outlet />

                <Footer />
            </div>
        </>
    )
}

export default UserLayout