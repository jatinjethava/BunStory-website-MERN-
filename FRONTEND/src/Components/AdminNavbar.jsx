import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("admin_token");
    useEffect(() => {
        if (!token) {
            navigate("/admin/login");
        }
    }, [token]);

    return (
        <>
            <div className="flex">

                <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5">
                    <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

                    <nav className="flex flex-col gap-3">
                        <Link to="/admin/adminhome" className="hover:bg-gray-700 p-2 rounded">
                            Add Burger
                        </Link>
                        <Link to="/admin/banner" className="hover:bg-gray-700 p-2 rounded">
                            Banner
                        </Link>
                        <Link to="/admin/blogbanner" className="hover:bg-gray-700 p-2 rounded">
                            Blog Banner
                        </Link>
                        <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">
                            Users
                        </Link>
                        <Link to="/admin/orders" className="hover:bg-gray-700 p-2 rounded">
                            Orders
                        </Link>
                    </nav>
                </aside>
            </div>
        </>
    )
}

export default AdminNavbar