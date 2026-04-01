import React from 'react'
import custom from "../CSS/underLine.module.css";
import { Link } from "react-router-dom";
import { Sofa } from 'lucide-react';

const Navbar = () => {
    return (
        <>
            <div className='m-3 flex justify-center items-center rounded-lg shadow-[0_4px_10px_1px_rgba(0,0,0,0.25)]'>
                <h1 className='mx-5 my-2 uppercase'> <Sofa size={50} className='text-red-500' /></h1>
                <div className="flex flex-col items-center w-full">
                    <ul className="flex gap-8">
                        <Link to="/" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            Home
                        </Link>
                        <Link to="/about" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            About
                        </Link>
                        <Link to="/contact" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            Contact
                        </Link>
                        <Link to="/blog" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            Blog
                        </Link>
                        <Link to="/service" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            Service
                        </Link>
                    </ul>
                </div>
                <div className="mx-5 flex gap-10">
                    <a href="#" className='border border-red-300 px-4 py-1.5 rounded-lg hover:bg-red-500 duration-200 hover:text-white'>SignUp</a>
                    <a href="#" className='border border-red-300 px-4 py-1.5 rounded-lg hover:bg-red-500 duration-200 hover:text-white'>Login</a>
                </div>
            </div >
        </>
    )
}

export default Navbar