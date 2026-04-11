import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [burgers, setBurgers] = useState({});
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const token = localStorage.getItem("token");

    const fetchCart = async () => {
        if (!token) return;
        try {
            const result = await axios.get(`http://localhost:8100/api/cart/getcart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = result.data;
            // console.log('Cart data:', data);
            const items = data.cart ? data.cart.items : [];
            setCartItems(items);
            let tot = 0;
            items.forEach(item => tot += item.price * item.quantity);
            setTotal(tot);
            setLoading(false);
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to fetch cart";
            toast.error(msg, { autoClose: 1500 });
            setLoading(false);
        }
    };

    const fetchBurgerDetails = async (burgerId) => {
        try {
            const result = await axios.get(`http://localhost:8100/api/burgers/getone_burger/${burgerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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

    const updateQuantity = async (burgerId, newQty) => {
        if (newQty < 1) return;
        try {
            await axios.put(`http://localhost:8100/api/cart/updatecart`,
                { burgerId, quantity: newQty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCart(); // refetch
            toast.success('Cart updated', {
                autoClose: 1500
            });
        } catch (error) {
            toast.error('Update failed', {
                autoClose: 1500
            });
        }
    };

    const removeItem = async (burgerId) => {
        try {
            await axios.delete(`http://localhost:8100/api/cart/deletecart/${burgerId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCart();
            toast.success('Item removed', {
                autoClose: 1500
            });
        } catch (error) {
            toast.error('Remove failed');
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete(`http://localhost:8100/api/cart/clearcart`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCart();
            toast.success('Cart cleared');
        } catch (error) {
            toast.error('Clear failed');
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
        if (cartItems.length > 0) {
            loadBurgers();
        }
    }, [cartItems]);

    if (loading) return <div className="flex justify-center items-center h-64">Loading cart...</div>;

    return (
        <>
            <div style={{ padding: "2rem", fontFamily: "'DM Sans', sans-serif" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 700, textAlign: "center", marginBottom: "2rem", color: "#1f2937" }}>Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Your cart is empty</h2>
                        <a href="/burgerlist" style={{ color: "#3B6D11", textDecoration: "none", fontWeight: 500 }}>Continue Shopping →</a>
                    </div>
                ) : (
                    <>
                        <div style={{ display: "grid", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                            {cartItems.map((item) => {
                                const burger = burgers[item.burgerId];
                                if (!burger) return null;
                                const subtotal = item.price * item.quantity;
                                return (
                                    <div key={item.burgerId} style={{
                                        background: "white",
                                        border: "0.5px solid #e5e7eb",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                                    }}>
                                        <div style={{ display: "flex", padding: "1.5rem" }}>
                                            <div style={{ width: "200px", height: "200px", marginRight: "2rem" }}>
                                                <img
                                                    src={`http://localhost:8100/uploads/${burger.image}`}
                                                    alt={burger.name}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: "0.5rem" }}>{burger.name}</h2>
                                                <p style={{ color: "#6b7280", marginBottom: "1rem", fontStyle: "italic" }}>{burger.description}</p>

                                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                                    <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "#3B6D11" }}>
                                                        ₹{item.price}
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#f9fafb", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                                                        <button onClick={() => updateQuantity(item.burgerId, item.quantity - 1)}>-</button>
                                                        <span style={{ minWidth: "2rem", textAlign: "center", fontWeight: 500 }}>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.burgerId, item.quantity + 1)}>+</button>
                                                    </div>
                                                    <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>Subtotal: ₹{subtotal}</div>
                                                </div>

                                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                                    <button
                                                        onClick={() => removeItem(item.burgerId)}
                                                        style={{
                                                            padding: "0.5rem 1rem",
                                                            background: "#ef4444",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "6px",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ maxWidth: "1200px", margin: "2rem auto 0", textAlign: "right" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "400px", marginLeft: "auto", fontSize: "1.5rem", fontWeight: 600 }}>
                                <span>Total: ₹{total}</span>
                            </div>
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1rem", maxWidth: "400px", marginLeft: "auto" }}>
                                <button
                                    onClick={clearCart}
                                    style={{
                                        padding: "1rem 2rem",
                                        background: "#6b7280",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: 500
                                    }}
                                >
                                    Clear Cart
                                </button>
                                <button
                                    onClick={() => navigate('/checkout')} // Assume checkout route or order
                                    style={{
                                        padding: "1rem 2rem",
                                        background: "#3B6D11",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontWeight: 500
                                    }}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;

