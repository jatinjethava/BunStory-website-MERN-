import { useEffect, useRef, useState } from 'react'
import custom from "../Style/underLine.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Hamburger } from 'lucide-react';

const Navbar = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log(isLoggedIn);

    const isLogin = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("User");
        setIsLoggedIn(true);
        navigate("/login");
    }

    return (
        <>
            <div className='m-3 flex justify-center items-center rounded-lg'>
                <h1 className='mx-10 uppercase'>
                    <Hamburger
                        size={40}
                        className='text-red-500 drop-shadow-[3px_3px_5px_rgba(0,0,0,0.2)]'
                    />
                    {/* <svg class="text-red-500 drop-shadow-[3px_3px_5px_rgba(0,0,0,0.2)] w-10 h-10 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9.00004 4c0-1.10457.89543-2 1.99996-2h2c1.1046 0 2 .89543 2 2v3H9.00004V4Zm0 5v.41924c-.87786.56584-1.41239 1.28066-1.69868 2.13956-.30199.9059-.30165 1.9228-.30134 2.8523L7.00004 20c0 1.1047.89549 2 2 2H15c1.1046 0 2-.8954 2-2v-1h-4.9999c-.5523 0-1-.4477-1-1v-5c0-.5523.4477-1 1-1h4.8213c-.034-.1494-.0745-.2967-.1227-.4412-.2863-.8589-.8208-1.57372-1.6987-2.13956V9H9.00004Z" />
                        <path fill="currentColor" d="M17 14h-3.9999v3H17v-3Z" />
                    </svg> */}
                </h1>
                <div className="flex flex-col items-center w-full">
                    <ul className="flex gap-8">
                        <Link to="/" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            Home
                        </Link>
                        <Link to="/burgerlist" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            Burger List
                        </Link>
                        <Link to="/cart" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            Cart
                        </Link>
                        <Link to="/blog" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            Blog
                        </Link>
                        <Link to="/myorders" className={`${custom.underLine} hover:text-red-500 duration-200`}>
                            My Order
                        </Link>
                    </ul>
                </div>
                <div>

                </div>
                <div className="mx-10 flex gap-10">
                    {/* <a href="#" className='border border-red-500 px-4 py-1.5 rounded-lg hover:bg-red-500 duration-200 hover:text-white'>SignUp</a> */}
                    <button type='button' onClick={isLogin} href="#" className='border border-red-500 px-4 py-1.5 rounded-lg hover:bg-red-500 duration-200 hover:text-white'>
                        {isLoggedIn ? "Login" : "Logout"}
                    </button>
                </div>
            </div >
        </>
    )
}

export default Navbar