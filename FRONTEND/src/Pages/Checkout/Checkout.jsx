import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [burgers, setBurgers] = useState({});
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    const token = localStorage.getItem('token');

    const fetchCart = async () => {
        if (!token) return;
        try {
            const result = await axios.get(`http://localhost:8100/api/cart/getcart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const items = result.data.cart?.items || [];
            setCartItems(items);
        } catch (error) {
            toast.error('Failed to fetch cart');
        } finally {
            setLoading(false);
        }
    };

    const fetchBurgerDetails = async (burgerId) => {
        try {
            const result = await axios.get(`http://localhost:8100/api/burgers/getone_burger/${burgerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return result.data.data;
        } catch {
            return null;
        }
    };

    const loadBurgers = async () => {
        const burgerDetails = {};
        for (const item of cartItems) {
            burgerDetails[item.burgerId] = await fetchBurgerDetails(item.burgerId);
        }
        setBurgers(burgerDetails);
    };

    const calculateTotals = () => {
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.price * item.quantity;
        });
        const deliveryCharge = totalAmount > 499 ? 0 : 40;
        const taxAmount = Math.round(totalAmount * 0.05);
        const finalAmount = totalAmount + deliveryCharge + taxAmount;
        return { totalAmount, deliveryCharge, taxAmount, finalAmount };
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.phone || !formData.address) {
            toast.error('Please fill required fields');
            return;
        }
        setPlacingOrder(true);
        try {
            const response = await axios.post(`http://localhost:8100/api/order/createOrder`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Order placed successfully!');
            navigate('/myorders'); // or success page
        } catch (error) {
            toast.error(error.response?.data?.message || 'Order failed');
        } finally {
            setPlacingOrder(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchCart();
    }, [token, navigate]);

    useEffect(() => {
        if (cartItems.length > 0 && !loading) {
            loadBurgers();
        }
    }, [cartItems, loading]);

    const totals = calculateTotals();

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, textAlign: "center", marginBottom: "3rem", color: "#1f2937" }}>Checkout</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
                {/* Order Summary */}
                <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>Order Summary</h2>
                    {cartItems.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        <>
                            {cartItems.map((item) => {
                                const burger = burgers[item.burgerId];
                                if (!burger) return null;
                                return (
                                    <div key={item.burgerId} style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid #e5e7eb" }}>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{burger.name}</div>
                                            <div>Qty: {item.quantity} × ₹{item.price}</div>
                                        </div>
                                        <div>₹{item.price * item.quantity}</div>
                                    </div>
                                );
                            })}
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, marginTop: "1rem" }}>
                                <span>Subtotal:</span>
                                <span>₹{totals.totalAmount}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Delivery ({totals.deliveryCharge ? '₹40' : 'Free'}):</span>
                                <span>₹{totals.deliveryCharge}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Tax (5%):</span>
                                <span>₹{totals.taxAmount}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: 700, color: "#3B6D11", paddingTop: "1rem", borderTop: "2px solid #e5e7eb" }}>
                                <span>Total:</span>
                                <span>₹{totals.finalAmount}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Delivery Form */}
                <form onSubmit={placeOrder}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>Delivery Details</h2>
                    <div style={{ display: "grid", gap: "1rem" }}>
                        <input
                            name="fullName"
                            placeholder="Full Name *"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Phone Number *"
                            value={formData.phone}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />
                        <textarea
                            name="address"
                            placeholder="Address *"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="3"
                            style={{ ...inputStyle, resize: "vertical" }}
                            required
                        />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <input
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                            <input
                                name="pincode"
                                type="number"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={placingOrder || cartItems.length === 0}
                            style={{
                                padding: "1.2rem",
                                background: "#3B6D11",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                cursor: placingOrder ? "not-allowed" : "pointer",
                                opacity: placingOrder ? 0.7 : 1
                            }}
                        >
                            {placingOrder ? 'Placing Order...' : `Place Order - ₹${totals.finalAmount}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: "1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "border-color 0.2s"
};

export default Checkout;

