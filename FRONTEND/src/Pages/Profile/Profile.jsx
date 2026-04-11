import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const token = localStorage.getItem('token');
    const API_BASE = 'http://localhost:8100/api/users';

    const fetchProfile = async () => {
        if (!token) return;
        try {
            const result = await axios.get(`${API_BASE}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(result.data.user);
            setFormData({ name: result.data.user.name, email: result.data.user.email, password: '' });
        } catch (error) {
            toast.error('Failed to fetch profile');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await axios.put(`${API_BASE}/profile`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Profile updated successfully');
            fetchProfile();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
        try {
            await axios.delete(`${API_BASE}/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Account deleted');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchProfile();
    }, [token, navigate]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    if (!user) return <div>Profile not found</div>;

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, textAlign: "center", marginBottom: "2rem", color: "#1f2937" }}>My Profile</h1>

            <form onSubmit={handleUpdate} style={{ background: "white", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "#374151" }}>Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            fontSize: "1rem"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "#374151" }}>Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            fontSize: "1rem"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", color: "#374151" }}>New Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            fontSize: "1rem"
                        }}
                    />
                </div>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                    <button
                        type="submit"
                        disabled={updating}
                        style={{
                            padding: "0.75rem 2rem",
                            background: "#3B6D11",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: 500,
                            cursor: updating ? "not-allowed" : "pointer"
                        }}
                    >
                        {updating ? 'Updating...' : 'Update Profile'}
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        style={{
                            padding: "0.75rem 2rem",
                            background: "#EF4444",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
