import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("admin_token");
    useEffect(() => {
        if (!token) {
            navigate("/admin/login");
        }
    }, [token])

    return (
        <>
            <div className="flex">
                <div className="w-70 p-5"></div>
                <div className='border-red-500'>
                    Dashboard
                </div>
            </div>
        </>
    )
}

export default AdminHome