import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBurger = ({ props }) => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        description: "",
        patty: "",
        bun: "",
        size: "Single",
        spice: "Mild",
        toppings: [],
        sauces: [],
        price: "",
        calories: "",
        available: true,
        featured: false,
        image: null
    });

    const [focused, setFocused] = useState("");

    const SIZES = ["Single", "Double", "Triple"];

    const SPICE = ["Mild", "Medium", "Hot", "Extra Hot"];

    const PATTIES = ["Beef", "Chicken", "Veggie", "Vegan"];

    const BUNS = ["Sesame", "Brioche", "Gluten-Free", "Lettuce Wrap"];

    const TOPPINGS = ["Lettuce", "Tomato", "Onion", "Pickles", "Cheese", "Bacon", "Mushrooms"];

    const SAUCES = ["Ketchup", "Mustard", "Mayo", "BBQ", "Special Sauce"];

    const toggle = (key, value) => {

        const arr = form[key];
        if (arr.includes(value)) {
            setForm({ ...form, [key]: arr.filter((i) => i !== value) });
        } else {
            setForm({ ...form, [key]: [...arr, value] });
        }
    }

    const [isUpdate, setIsUpdate] = useState(false);
    const [id, setId] = useState(null);
    const handleUpdate = async (id) => {
        setId(id);
    }

    useEffect(() => {
        if (id) {
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, [id]);

    useEffect(() => {
        if (id && isUpdate) {
            const fetchBurgerData = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const result = await axios.get(`http://localhost:8100/api/burgers/getone_burger/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (result.data.success) {
                        setForm({
                            name: result.data.data.name || "",
                            description: result.data.data.description || "",
                            patty: result.data.data.patty || "",
                            bun: result.data.data.bun || "",
                            size: result.data.data.size || "Single",
                            spice: result.data.data.spice || "Mild",
                            toppings: result.data.data.toppings || [],
                            sauces: result.data.data.sauces || [],
                            price: result.data.data.price || "",
                            calories: result.data.data.calories || "",
                            image: result.data.data.image || null,
                            available: result.data.data.available ?? true,
                            featured: result.data.data.featured ?? false
                        });
                    }
                } catch (error) {
                    const msg = error.response?.data?.message || "Failed to fetch burger data";
                    toast.error(msg);
                }
            };
            fetchBurgerData();
        }
    }, [id, isUpdate]);

    const [burger, setBurger] = useState([]);

    const getAllBurger = async () => {
        try {

            const burgers = await axios.get(`http://localhost:8100/api/burgers/get_burger`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(burgers.data.data);

            if (!burgers) {
                toast.error("not any burger added !", {
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

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            toast.error("Please Login First After Access This Site. ", {
                autoClose: 1000,
            });
            setTimeout(() => {
                navigate("/admin/login");
            }, 2000);
            return;
        }
        getAllBurger();
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name) {
            toast.error("Burger name is required");
            return;
        }

        if (!form.price) {
            toast.error("Price is required");
            return;
        }

        if (!form.patty) {
            toast.error("Please select a patty type");
            return;
        }

        if (!form.bun) {
            toast.error("Please select a bun type");
            return;
        }

        if (form.price < 0) {
            toast.error("Price cannot be negative");
            return;
        }

        if (form.calories && form.calories < 0) {
            toast.error("Calories cannot be negative");
            return;
        }

        if (!form.image) {
            toast.error("Image Is Required");
            return;
        }

        if (form.toppings.length > 10) {
            toast.error("You can select up to 10 toppings");
            return;
        }

        if (form.sauces.length > 5) {
            toast.error("You can select up to 5 sauces");
            return;
        }

        if (form.description.length > 300) {
            toast.error("Description cannot exceed 300 characters");
            return;
        }

        if (form.name.length > 50) {
            toast.error("Burger name cannot exceed 50 characters");
            return;
        }

        if (form.price > 10000) {
            toast.error("Price seems too high");
            return;
        }

        if (form.calories > 5000) {
            toast.error("Calories seem too high");
            return;
        }

        if (form.toppings.length === 0) {
            toast.error("Please select at least one topping");
            return;
        }

        if (form.sauces.length === 0) {
            toast.error("Please select at least one sauce");
            return;
        }

        if (form.description.split(" ").length > 50) {
            toast.error("Description cannot exceed 50 words");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first to add a burger");
            return;
        }

        if (!isUpdate) {
            try {

                const formData = new FormData();
                formData.append('name', form.name);
                formData.append('description', form.description);
                formData.append('patty', form.patty);
                formData.append('bun', form.bun);
                formData.append('size', form.size);
                formData.append('spice', form.spice);
                formData.append('price', form.price);
                formData.append('calories', form.calories);
                formData.append('available', form.available);
                formData.append('featured', form.featured);
                // Append each topping and sauce as separate entries
                form.toppings.forEach(topping => formData.append('toppings', topping));
                form.sauces.forEach(sauce => formData.append('sauces', sauce));
                if (form.image) formData.append('image', form.image);

                const result = await axios.post("http://localhost:8100/api/burgers/create", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (result.data.success === false) {
                    toast.error(result.data.message || "Failed to add burger. Please try again.");
                    return;
                }

                toast.success("Burger added successfully!", {
                    autoClose: 1500
                });
                getAllBurger();

                setForm({
                    name: "",
                    description: "",
                    patty: "",
                    bun: "",
                    size: "Single",
                    spice: "Mild",
                    toppings: [],
                    sauces: [],
                    price: "",
                    calories: "",
                    available: true,
                    featured: false
                });

            } catch (error) {
                const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message
                    : "Failed to add burger. Please try again.";
                toast.error(msg, { autoClose: 1500 });
            }
        } else {

            try {

                const formData = new FormData();
                formData.append('name', form.name);
                formData.append('description', form.description);
                formData.append('patty', form.patty);
                formData.append('bun', form.bun);
                formData.append('size', form.size);
                formData.append('spice', form.spice);
                formData.append('price', form.price);
                formData.append('calories', form.calories);
                formData.append('available', form.available);
                formData.append('featured', form.featured);
                // Append each topping and sauce as separate entries
                form.toppings.forEach(topping => formData.append('toppings', topping));
                form.sauces.forEach(sauce => formData.append('sauces', sauce));
                if (form.image && form.image instanceof File) {
                    formData.append('image', form.image);
                }

                const result = await axios.put(`http://localhost:8100/api/burgers/update_burger/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (result.data.success === false) {
                    toast.error(result.data.message || "Failed to update burger");
                    return;
                }

                if (result.status === 200) {
                    toast.success("Updated Successfully", {
                        autoClose: 1500
                    })
                    setIsUpdate(false);
                    setId(null);
                    setTimeout(() => {
                        getAllBurger();

                        setForm({
                            name: "",
                            description: "",
                            patty: "",
                            bun: "",
                            size: "Single",
                            spice: "Mild",
                            toppings: [],
                            sauces: [],
                            price: "",
                            calories: "",
                            available: true,
                            featured: false
                        });


                    }, 1000)
                }

            } catch (error) {
                const msg = error.response?.data?.message || "Failed to update burger. Please try again.";
                toast.error(msg, { autoClose: 1500 });
            }
        }

    }

    const handleDelete = async (key) => {
        try {
            const result = await axios.delete(`http://localhost:8100/api/burgers/deleteBurger/${key}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (result) {
                toast.success("Burger Deleted Successfully", {
                    autoClose: 1500
                })
                setTimeout(() => {
                    getAllBurger();
                }, 1000);
                return;
            }

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "may be frontend issuse";
            toast.error(msg, { autoClose: 1500 });
        }
    }


    return (
        <>
            <div className="flex">
                <div className='w-80 p-5'></div>
                <div className="w-300 min-h-screen bg-white py-10 px-4 ">
                    <div className="w-full mx-auto space-y-6">

                        <form onSubmit={handleSubmit} className=" space-y-5">

                            <div className='flex flex-col justify-center items-start gap-5'>

                                <div className="w-full bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-4">
                                    <div className="max-w-full flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center text-xl shadow-md">🍔</div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-zinc-800 tracking-tight">
                                                {!isUpdate ? "Add New Burger" : "Update Burger"}
                                            </h1>
                                            <p className="text-xs text-zinc-400">
                                                Fill in the details to
                                                {!isUpdate ? " Add " : " Update "}
                                                to your menu
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Basic Info</p>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-500">Burger Name *</label>
                                        <input
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            onFocus={() => setFocused("name")}
                                            onBlur={() => setFocused("")}
                                            placeholder="e.g. Classic Smash Burger"
                                            className={`w-full rounded-xl border bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 outline-none transition-all ${focused === "name" ? "border-amber-400 ring-2 ring-amber-100" : "border-zinc-200"}`}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-500">Description</label>
                                        <textarea
                                            rows={3}
                                            value={form.description}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            onFocus={() => setFocused("desc")}
                                            onBlur={() => setFocused("")}
                                            placeholder="Describe the burger — flavors, ingredients, what makes it special..."
                                            className={`w-full rounded-xl border bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 outline-none transition-all resize-none ${focused === "desc" ? "border-amber-400 ring-2 ring-amber-100" : "border-zinc-200"}`}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-zinc-500">Price (₹) *</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={form.price}
                                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                                onFocus={() => setFocused("price")}
                                                onBlur={() => setFocused("")}
                                                placeholder="199"
                                                className={`w-full rounded-xl border bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 outline-none transition-all ${focused === "price" ? "border-amber-400 ring-2 ring-amber-100" : "border-zinc-200"}`}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-zinc-500">Calories (kcal)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={form.calories}
                                                onChange={(e) => setForm({ ...form, calories: e.target.value })}
                                                onFocus={() => setFocused("cal")}
                                                onBlur={() => setFocused("")}
                                                placeholder="520"
                                                className={`w-full rounded-xl border bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 outline-none transition-all ${focused === "cal" ? "border-amber-400 ring-2 ring-amber-100" : "border-zinc-200"}`}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-zinc-500">Burger Image</label>
                                        <input
                                            type="file"
                                            name='image'
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                // console.log(file)
                                                if (file) setForm({ ...form, image: file });
                                            }}
                                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-500 file:rounded-lg file:border-0 file:bg-amber-500 file:text-white file:text-xs file:font-medium file:px-3 file:py-1.5 hover:file:bg-amber-600"
                                        />
                                    </div>
                                </div>

                                <div className='w-full flex flex-col justify-center gap-10'>

                                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-4">
                                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Size & Heat</p>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-zinc-500">Size</label>
                                            <div className="flex gap-2">
                                                {SIZES.map((s) => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => setForm({ ...form, size: s })}
                                                        className={`flex-1 rounded-xl py-2 text-sm font-medium transition-all ${form.size === s ? "bg-amber-500 text-white shadow-md shadow-amber-200" : "bg-zinc-50 border border-zinc-200 text-zinc-500 hover:border-amber-300"}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-zinc-500">Spice Level</label>
                                            <div className="flex gap-2">
                                                {SPICE.map((s, i) => {
                                                    const emoji = ["🟢", "🟡", "🔴", "🔥"][i];
                                                    return (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            onClick={() => setForm({ ...form, spice: s })}
                                                            className={`flex-1 rounded-xl py-2 text-xs font-medium transition-all flex flex-col items-center gap-0.5 ${form.spice === s ? "bg-red-500 text-white shadow-md shadow-red-200" : "bg-zinc-50 border border-zinc-200 text-zinc-500 hover:border-red-300"}`}
                                                        >
                                                            <span className="text-base">{emoji}</span>
                                                            {s}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Patty & Bun */}
                                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-4">
                                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Patty & Bun</p>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-zinc-500">Patty Type *</label>
                                            <div className="flex flex-wrap gap-2">
                                                {PATTIES.map((p) => (
                                                    <button
                                                        key={p}
                                                        type="button"
                                                        onClick={() => setForm({ ...form, patty: p })}
                                                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${form.patty === p ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}
                                                    >
                                                        {p}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-zinc-500">Bun Type *</label>
                                            <div className="flex flex-wrap gap-2">
                                                {BUNS.map((b) => (
                                                    <button
                                                        key={b}
                                                        type="button"
                                                        onClick={() => setForm({ ...form, bun: b })}
                                                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${form.bun === b ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
                                                    >
                                                        {b}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full m-auto flex flex-col justify-center items-end gap-5'>
                                    <div className='w-full flex flex-col justify-center gap-5'>

                                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Toppings</p>
                                                {form.toppings.length > 0 && (
                                                    <span className="bg-amber-100 text-amber-600 text-xs font-semibold px-2 py-0.5 rounded-full">{form.toppings.length} selected</span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {TOPPINGS.map((t) => {
                                                    const active = form.toppings.includes(t);
                                                    return (
                                                        <button
                                                            key={t}
                                                            type="button"
                                                            onClick={() => toggle("toppings", t)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${active ? "bg-green-500 border-green-500 text-white shadow-sm shadow-green-200" : "bg-green-50 border-green-100 text-green-700 hover:border-green-300"}`}
                                                        >
                                                            {active ? "✓ " : ""}{t}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Sauces */}
                                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Sauces</p>
                                                {form.sauces.length > 0 && (
                                                    <span className="bg-red-100 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full">{form.sauces.length} selected</span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {SAUCES.map((s) => {
                                                    const active = form.sauces.includes(s);
                                                    return (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            onClick={() => toggle("sauces", s)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${active ? "bg-red-500 border-red-500 text-white shadow-sm shadow-red-200" : "bg-red-50 border-red-100 text-red-700 hover:border-red-300"}`}
                                                        >
                                                            {active ? "✓ " : ""}{s}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Toggles */}
                                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-3">
                                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Availability</p>
                                            {[
                                                { key: "available", label: "Available on Menu", sub: "Customers can order this burger" },
                                                { key: "featured", label: "Featured Burger", sub: "Show in the highlights section" },
                                            ].map(({ key, label, sub }) => (
                                                <div key={key} className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-zinc-700">{label}</p>
                                                        <p className="text-xs text-zinc-400">{sub}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                                                        className={`w-11 h-6 rounded-full transition-all duration-200 relative ${form[key] ? "bg-amber-500" : "bg-zinc-200"}`}
                                                    >
                                                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${form[key] ? "left-5" : "left-0.5"}`} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Summary pill */}
                                        {(form.name || form.price) && (
                                            <div className="bg-amber-500 rounded-2xl p-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-white font-semibold text-sm">{form.name || "Unnamed Burger"}</p>
                                                    <p className="text-amber-100 text-xs">{form.size} · {form.patty || "—"} patty · {form.toppings.length} toppings</p>
                                                </div>
                                                <p className="text-white font-bold text-lg">{form.price ? `₹${form.price}` : "—"}</p>
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold rounded-2xl py-3.5 text-sm transition-all active:scale-95 shadow-lg shadow-zinc-900/20 flex items-center justify-center gap-2"
                                        >
                                            <span>
                                                {!isUpdate ? "Add to Menu" : "Update Menu"}
                                            </span>
                                            <span>🍔</span>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>

                    <div className='gap-10 flex-wrap' style={{ padding: "1.5rem", display: "flex", justifyContent: "center" }}>

                        {
                            burger.map((item) => (
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

                                        {/* Header */}
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
                                                <button
                                                    onClick={() => handleUpdate(item._id)}
                                                    className='cursor-pointer bg-green-500 px-2 py-1 rounded-lg text-white hover:bg-green-600 hover:scale-105 duration-150'>Update</button>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className='cursor-pointer bg-red-500 px-2 py-1 rounded-lg text-white hover:bg-red-600 hover:scale-105 duration-150'>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>

    )
}

export default AddBurger