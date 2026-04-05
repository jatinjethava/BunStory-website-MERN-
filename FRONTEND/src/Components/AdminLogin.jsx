import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {

    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const token = localStorage.getItem("admin_token");
    useEffect(() => {
        if (!token) {
            navigate("/admin/login");
        } else {
            navigate("/admin/adminHome")
        }
    }, [token])

    const HandleInput = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
        // console.log(data)
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (!data.email) {
            return toast.error("Email Must Be Required !", {
                autuClose: 1000
            })
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            toast.error("Invalid email format", {
                autoClose: 1500,
            });
            return;
        }

        if (!data.password) {
            return toast.error("Password Must Be Required !", {
                autuClose: 1500
            })
        }

        try {
            const result = await axios.post(`http://localhost:8100/api/admin/login`, data);

            if (!result) {
                return toast.error("Invalid Input", {
                    autoClose: 1500
                })
            }

            localStorage.setItem("admin_token", result.data.token)
            localStorage.setItem("admin", "Jatin Jethava")

            toast.success("Welcome Admin", {
                autoClose: 1500
            })

            setTimeout(() => {
                navigate("/admin/adminHome")
            }, 1500)

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Login";
            toast.error(msg, {
                autuClose: 1500
            })
        }

    }

    const passwordShow = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <div className="h-screen lg:w-full flex items-center justify-center p-6 sm:p-12">
                <div className="shadow-lg shadow-red-300 px-10 py-15 w-full rounded-lg max-w-lg space-y-8">

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Admin Login</h1>
                        <p className="text-sm text-gray-400">Free forever. No credit card required.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-red-400" />
                        <span className="text-xs text-zinc-500">or</span>
                        <div className="flex-1 h-px bg-red-400" />
                    </div>

                    <form className="space-y-4" onSubmit={HandleSubmit}>

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-xl bg-gray-200 px-4 py-2.5 text-sm text-gray-700"
                            name="email"
                            value={data.email}
                            onChange={HandleInput}
                        />

                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full rounded-xl bg-gray-200 px-4 py-2.5 text-sm text-gray-700"
                                name="password"
                                value={data.password}
                                onChange={HandleInput}
                            />
                            <button type="button" onClick={passwordShow} className='absolute top-2 right-2'>
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>

                        <button type="submit" className="w-full rounded-xl bg-red-500 text-white py-2.5 text-sm">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLogin