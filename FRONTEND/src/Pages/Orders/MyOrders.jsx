import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const token = localStorage.getItem('token');

    const fetchOrders = async () => {
        if (!token) return;
        try {
            const result = await axios.get(`http://localhost:8100/api/order/myorders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(result.data.orders || []);
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [token, navigate]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading orders...</div>;

    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, textAlign: "center", marginBottom: "3rem", color: "#1f2937" }}>My Orders</h1>

            {orders.length === 0 ? (
                <div style={{ textAlign: "center", color: "#6b7280", fontSize: "1.2rem" }}>
                    No orders yet. <a href="/burgerlist" style={{ color: "#3B6D11" }}>Start shopping!</a>
                </div>
            ) : (
                <div style={{ display: "grid", gap: "2rem" }}>
                    {orders.map((order) => (
                        <div key={order._id} style={{
                            background: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "12px",
                            padding: "2rem",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <div>
                                    <div style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "0.25rem" }}>
                                        Order #{order._id.slice(-6).toUpperCase()}
                                    </div>
                                    <div style={{ fontSize: "0.9rem", color: "#3B6D11", fontWeight: 500 }}>
                                        {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                                    </div>
                                </div>
                                <div style={{
                                    padding: "0.5rem 1rem",
                                    background: getStatusColor(order.orderStatus),
                                    color: "white",
                                    borderRadius: "20px",
                                    fontSize: "0.9rem",
                                    fontWeight: 500
                                }}>
                                    {order.orderStatus}
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: "2rem", marginBottom: "1.5rem" }}>
                                <div>
                                    <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1rem" }}>Items ({order.items.length})</h3>
                                    {order.items.slice(0, 3).map((item, idx) => (
                                        <div key={idx} style={{ padding: "0.5rem 0", borderBottom: "1px solid #f3f4f6" }}>
                                            <div style={{ fontWeight: 500 }}>{item.name || 'Burger'}</div>
                                            <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>Qty: {item.quantity} × ₹{item.price}</div>
                                        </div>
                                    ))}
                                    {order.items.length > 3 && <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>...</div>}
                                </div>

                                <div>
                                    <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1rem" }}>Delivery Address</h3>
                                    {order.deliveryAddress ? (
                                        <>
                                            <div style={{ fontWeight: 600 }}>{order.deliveryAddress.fullName}</div>
                                            <div>{order.deliveryAddress.phone}</div>
                                            <div style={{ fontWeight: 500 }}>{order.deliveryAddress.address}</div>
                                            <div>{order.deliveryAddress.city} - {order.deliveryAddress.pincode}</div>
                                        </>
                                    ) : (
                                        <div style={{ color: "#9ca3af" }}>Address not available</div>
                                    )}
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1rem" }}>Payment</h3>
                                    <div>Subtotal: ₹{order.totalAmount}</div>
                                    <div>Delivery: ₹{order.deliveryCharge}</div>
                                    <div>Tax: ₹{order.taxAmount}</div>
                                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#3B6D11", marginTop: "0.5rem" }}>
                                        Total: ₹{order.finalAmount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

const getStatusColor = (status) => {
    const colors = {
        PLACED: '#3B82F6',
        CONFIRMED: '#10B981',
        PREPARING: '#F59E0B',
        'OUT_FOR_DELIVERY': '#EF4444',
        DELIVERED: '#059669',
        CANCELLED: '#6B7280'
    };
    return colors[status] || '#6B7280';
};

export default MyOrders;

