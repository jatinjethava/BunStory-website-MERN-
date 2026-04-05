import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from '../Components/AdminNavbar';

const AdminLayout = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
            navigate("/admin/login");
        }
    }, [navigate]);

    const token = localStorage.getItem("admin_token");
    useEffect(() => {
        if (!token) {
            navigate("/admin/login");
        }
    })

    return (
        <>
            <AdminNavbar />
            <Outlet />
        </>
    )
}

export default AdminLayout