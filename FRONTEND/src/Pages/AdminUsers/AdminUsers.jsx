import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState({});

    const token = localStorage.getItem('admin_token');

    const API_BASE = 'http://localhost:8100/api/admin';

    const fetchUsers = async () => {
        if (!token) return;
        try {
            const result = await axios.get(`${API_BASE}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(result.data.users || []);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        setDeleting(prev => ({ ...prev, [id]: true }));
        try {
            await axios.delete(`${API_BASE}/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Delete failed');
        } finally {
            setDeleting(prev => ({ ...prev, [id]: false }));
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchUsers();
    }, [token, navigate]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading users...</div>;

    return (
        <>

            <div className="flex">
                <div className='w-80 p-5'></div>
                <div className='w-500' style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: 700, textAlign: "center", marginBottom: "3rem", color: "#1f2937" }}>Manage Users</h1>

                    {users.length === 0 ? (
                        <div style={{ textAlign: "center", color: "#6b7280", fontSize: "1.2rem" }}>
                            No users found.
                        </div>
                    ) : (
                        <div style={{ display: "grid", gap: "2rem" }}>
                            {users.map((user) => (
                                <div key={user._id} style={{
                                    background: "white",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "12px",
                                    padding: "2rem",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <div>
                                        <div style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                                            {user.name}
                                        </div>
                                        <div style={{ fontSize: "1rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                                            {user.email}
                                        </div>
                                        <div style={{ fontSize: "0.9rem", color: "#3B6D11" }}>
                                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        disabled={deleting[user._id]}
                                        style={{
                                            padding: "0.75rem 1.5rem",
                                            background: "#EF4444",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontWeight: 500,
                                            cursor: deleting[user._id] ? "not-allowed" : "pointer"
                                        }}
                                    >
                                        {deleting[user._id] ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


        </>
    );
};

export default AdminUsers;
