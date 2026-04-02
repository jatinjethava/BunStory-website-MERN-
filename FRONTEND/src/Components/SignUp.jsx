import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../App.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const SignUp = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    }

    const showConfirmPasswordHandler = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const HandleInput = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name) {
            toast.error("Please fill Name , Is required", {
                autoClose: 1500,
            });
            return;
        }

        if (!data.email) {
            toast.error("Please fill Email , Is required", {
                autoClose: 1500,
            });
            return;
        }

        if (!data.password) {
            toast.error("Please fill Password , Is required", {
                autoClose: 1500,
            });
            return;
        }

        if (!data.confirmPassword) {
            toast.error("Please fill Confirm Password , Is required", {
                autoClose: 1500,
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(data.email)) {
            toast.error("Please enter a valid email", {
                autoClose: 1500,
            });
            return;
        }

        if (data.password.length < 6) {
            toast.error("Password must be at least 6 characters", {
                autoClose: 1500,
            });
            return;
        }

        if (!/\d/.test(data.password)) {
            toast.error("Password must contain at least one number", {
                autoClose: 1500,
            });
            return;
        }

        if (!/[@$!%*?&]/.test(data.password)) {
            toast.error("Password must contain at least one special character", {
                autoClose: 1500,
            });
            return;
        }

        if (!/[A-Z]/.test(data.password)) {
            toast.error("Password must contain at least one uppercase letter", {
                autoClose: 1500,
            });
            return;
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match", {
                autoClose: 1500,
            });
            return;
        }

        try {
            const result = await axios.post(`http://localhost:8100/api/users/create`, data);
            const userData = result.data;

            if (!userData) {
                toast.error("User not created", {
                    autoClose: 1500,
                });
            }

            toast.success("User created successfully", {
                autoClose: 1500,
            });


            setData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            localStorage.setItem("token", JSON.stringify(userData.user.token));
            navigate("/login");

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : "Something went wrong";
            toast.error(msg, {
                autoClose: 1500,
            });
        }
    }

    return (
        <div className="min-h-screen bg-white flex">

            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-gray-100">

                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 50%, #a33ee1 0%, transparent 60%), radial-gradient(circle at 80% 20%, #ef4444 0%, transparent 50%)",
                    }}
                />

                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-red-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                        </svg>
                    </div>
                    <span className="text-gray-700 font-semibold text-sm">Jat Burger</span>
                </div>

                <div className="relative z-10">
                    <h1 className=" text-4xl font-light text-gray-800 leading-relaxed">
                        “ Fresh. Juicy. Unforgettable Burgers. ”
                    </h1>
                    <p className='mb-5'>
                        Order your favorite burgers made with premium ingredients and lightning-fast delivery.
                    </p>


                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-xs text-white">
                            JJ
                        </div>
                        <div>
                            <p className="text-sm text-gray-800">Jatin Jethava</p>
                            <p className="text-xs text-gray-500">jatin@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex gap-6">
                    {[
                        ["50K+", "Developers"],
                        ["99.9%", "Uptime"],
                        ["4.9★", "Rating"],
                    ].map(([val, label]) => (
                        <div key={label}>
                            <p className="text-lg text-gray-800">{val}</p>
                            <p className="text-xs text-zinc-400">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-sm space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Create your account</h1>
                        <p className="text-sm text-gray-400">Free forever. No credit card required.</p>
                    </div>

                    {/* Google button */}
                    <button className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-zinc-700 bg-white py-2.5 text-sm text-gray-800 hover:bg-gray-100">
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-red-400" />
                        <span className="text-xs text-zinc-500">or</span>
                        <div className="flex-1 h-px bg-red-400" />
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={HandleSubmit}>

                        <input
                            type="text"
                            placeholder="Full name"
                            className="w-full rounded-xl bg-gray-200 px-4 py-2.5 text-sm text-gray-700"
                            name="name"
                            value={data.name}
                            onChange={HandleInput}
                        />

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
                            <button type="button" onClick={showPasswordHandler} className='absolute top-2 right-2'>{showPassword ? "🙈" : "👁️"}</button>
                        </div>

                        <div className='relative'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                className="w-full rounded-xl bg-gray-200 px-4 py-2.5 text-sm text-gray-700"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={HandleInput}
                            />
                            <button type="button" onClick={showConfirmPasswordHandler} className='absolute top-2 right-2'>{showConfirmPassword ? "🙈" : "👁️"}</button>
                        </div>

                        <button type='submit' className="w-full rounded-xl bg-red-500 text-white py-2.5 text-sm">
                            Create account
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-xs text-zinc-500">
                        Already have an account?{" "}
                        <Link to="/login"
                            className="text-red-400 cursor-pointer"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default SignUp