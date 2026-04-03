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
        image: null,
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
    const { id } = useParams();

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
                            available: result.data.data.available ?? true,
                            featured: result.data.data.featured ?? false,
                            image: result.data.data.image || null,
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

                const result = await axios.post("http://localhost:8100/api/burgers/create", form, {
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
                setTimeout(() => {
                    navigate('/burgerlist');
                }, 2000);

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
                    featured: false,
                    image: null,
                });

            } catch (error) {
                const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message
                    : "Failed to add burger. Please try again.";
                toast.error(msg, { autoClose: 1500 });
            }
        } else {

            try {

                const result = await axios.put(`http://localhost:8100/api/burgers/update_burger/${id}`, form, {
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
                    setTimeout(() => {
                        navigate("/burgerlist");
                    }, 2000);
                }

            } catch (error) {
                const msg = error.response?.data?.message || "Failed to update burger. Please try again.";
                toast.error(msg, { autoClose: 1500 });
            }
        }

    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please Login First After Access This Site. ", {
                autoClose: 1000,
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            return;
        }
    });


    return (
        <div className="min-h-screen bg-white py-10 px-4">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center text-xl shadow-md">🍔</div>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-800 tracking-tight">
                            {!isUpdate ? "Add New Burger" : "Update Burger"}
                        </h1>
                        <p className="text-xs text-zinc-400">
                            Fill in the details to
                            {!isUpdate ? "Add " : "Update "}
                            to your menu
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Basic Info */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 space-y-4">
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
                    </div>

                    {/* Size & Spice */}
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

                    {/* Toppings */}
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
                </form>
            </div>
        </div>

    )
}

export default AddBurger