import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BurgerDetail = () => {

    const navigate = useNavigate();
    const [burger, setBurger] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            toast.error("Login First After Seen Burger Details", {
                autoClose: 1500
            })
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            return;
        }
        fetBuyBurger();
    }, [token, navigate]);

    const fetBuyBurger = async () => {
        try {

            const burgers = await axios.get(`http://localhost:8100/api/burgers/getone_burger/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(burgers.data.data);

            if (!burgers) {
                toast.error("not any burger found !", {
                    autoClose: 1500
                })
                return;
            }

            setBurger(burgers.data.data);

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Do Not Fetch Any Burger";
            toast.error(msg, {
                autoClose: 1500
            });
        }
    }

    const arrayBurger = Array.isArray(burger) ? burger : [burger];

    const buyBurger = async (burgerId) => {
        try {
            // console.log(burgerId)
            if (quantity < 1) {
                toast.error("Quantity must be at least 1", {
                    autoClose: 1500
                });
                return;
            }

            const response = await axios.post(
                `http://localhost:8100/api/cart/addTocart`,
                {
                    burgerId: burgerId,
                    quantity: parseInt(quantity)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response) {
                toast.error(response.data.message || "Failed to add burger to cart", {
                    autoClose: 1500
                });
            } else {
                toast.success("Burger added to cart successfully!", {
                    autoClose: 1500
                });
                setQuantity(1);
                setTimeout(() => {
                    navigate("/cart")
                }, 1500);
            }
        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed to add burger to cart";
            toast.error(msg, {
                autoClose: 1500
            });
        }
    }

    return (
        <>
            <div className='gap-10 flex-wrap' style={{ padding: "1.5rem", display: "flex", justifyContent: "center" }}>

                {
                    arrayBurger.map((item) => (
                        <div
                            key={item._id}
                            className='flex justify-center items-center'
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                background: "white",
                                border: "0.5px solid #e5e7eb",
                                borderRadius: "12px",
                                overflow: "hidden",
                                maxWidth: "900px",
                                width: "100%",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                            }}
                        >

                            <div className='w-[50%] h-100 flex flex-col justify-center gap-5 m-3'>
                                <div className='h-80'>
                                    <img
                                        src={`http://localhost:8100/uploads/${item.image}`}
                                        alt="burger"
                                        className='h-[100%] rounded-lg object-cover'
                                    />
                                </div>

                                <div style={{ padding: "20px 20px 16px" }} className='rounded-lg bg-gray-200'>
                                    <span
                                        className='text-gray-700'
                                        style={{
                                            display: "inline-block",
                                            background: "#fff",
                                            fontSize: "11px",
                                            fontWeight: 500,
                                            padding: "3px 10px",
                                            borderRadius: "20px",
                                            letterSpacing: "0.05em",
                                            marginBottom: "10px",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Specialty
                                    </span>
                                    <h1
                                        className='text-gray-600'
                                        style={{
                                            fontFamily: "'Playfair Display', Georgia, serif",
                                            fontSize: "26px",
                                            fontWeight: 600,
                                            margin: "0 0 6px",
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {item.name}
                                    </h1>
                                    <p style={{ fontSize: "13px", margin: 0, fontStyle: "italic" }} className='text-gray-500'>
                                        " {item.description}"
                                    </p>
                                </div>
                            </div>

                            <div className='w-[50%]' style={{ padding: "18px 20px" }}>

                                <p style={{ fontSize: "11px", fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>
                                    Details
                                </p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "18px" }}>
                                    {[
                                        { key: "Patty", val: item.patty, color: "#3B6D11" },
                                        { key: "Bun", val: item.bun, color: "#854F0B" },
                                        { key: "Size", val: item.size, color: "#444441" },
                                        { key: "Spice", val: item.spice, color: "#A32D2D" },
                                    ].map(({ key, val, color }) => (
                                        <div
                                            key={key}
                                            style={{
                                                background: "#f9fafb",
                                                borderRadius: "8px",
                                                padding: "8px 10px",
                                                border: "0.5px solid #e5e7eb",
                                            }}
                                        >
                                            <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 3px" }}>{key}</p>
                                            <p style={{ fontSize: "13px", fontWeight: 500, color, margin: 0 }}>{val}</p>
                                        </div>
                                    ))}
                                </div>

                                <p style={{ fontSize: "11px", fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>
                                    Toppings
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                                    {item.toppings && item.toppings.length > 0 ? (
                                        item.toppings.map((label) => (
                                            <span
                                                key={label}
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                    padding: "4px 12px",
                                                    borderRadius: "20px",
                                                    background: "#FCEBEB",
                                                    color: "#793020",
                                                    border: `0.5px solid #F09595`,
                                                }}
                                            >
                                                {label}
                                            </span>
                                        ))
                                    ) : (
                                        <span style={{ fontSize: "12px", color: "#999" }}>No toppings</span>
                                    )}
                                </div>

                                <p style={{ fontSize: "11px", fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>
                                    Sauces
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                                    {item.sauces && item.sauces.length > 0 ? (
                                        item.sauces.map((sauce) => (
                                            <span
                                                key={sauce}
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                    padding: "4px 12px",
                                                    borderRadius: "20px",
                                                    background: "#FAEEDA",
                                                    color: "#633806",
                                                    border: "0.5px solid #EF9F27",
                                                }}
                                            >
                                                {sauce}
                                            </span>
                                        ))
                                    ) : (
                                        <span style={{ fontSize: "12px", color: "#999" }}>No Sauces</span>
                                    )
                                    }
                                </div>

                                <div style={{ height: "0.5px", background: "#e5e7eb", margin: "0 0 16px" }} />

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, color: "#3B6D11", lineHeight: 1 }}>
                                        <span style={{ fontSize: "18px", verticalAlign: "top", lineHeight: "1.6", marginRight: "2px" }}>₹</span>
                                        {item.price}
                                    </div>
                                    <div
                                        style={{
                                            background: "#f9fafb",
                                            border: "0.5px solid #e5e7eb",
                                            borderRadius: "8px",
                                            padding: "6px 14px",
                                            fontSize: "13px",
                                            color: "#6b7280",
                                        }}
                                    >
                                        {item.calories} cal
                                    </div>
                                </div>


                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#639922", flexShrink: 0 }} />
                                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#3B6D11" }}>
                                        {item.available ? "Available" : "Not Available"}
                                    </span>
                                </div>

                                <div className='gap-2 flex justify-center items-center'>
                                    <div className='h-0.5 w-[48%] bg-gray-300'></div>
                                    <div className='text-gray-700'>●</div>
                                    <div className='h-0.5 w-[48%] bg-gray-300'></div>
                                </div>

                                <div className='flex justify-between items-center mt-2'>
                                    <div>
                                        <p style={{ fontSize: "11px", fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>
                                            Quantity
                                        </p>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            min="1"
                                            className='border-2 
                                        border-gray-400 
                                        rounded-lg p-2 w-20' />
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => buyBurger(item._id)}
                                            className='cursor-pointer bg-green-500 px-2 py-1 rounded-lg text-white hover:bg-green-600 hover:scale-105 duration-150'>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default BurgerDetail