import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogBanner = () => {

    const navigate = useNavigate();
    const [data, setdata] = useState({
        heading: "",
        paragraph: "",
        image: null
    });
    const [form, setForm] = useState({
        feature: "",
        name: "",
        rate: 0,
        description: "",
        date: "",
        image: null
    });
    const [blogBanner, setBlogBanner] = useState([]);
    const [updating, setUpdating] = useState(false);

    const fetchBlogBanner = async () => {
        try {
            const token = localStorage.getItem("admin_token");

            if (!token) {
                return toast.error("No token found. Please login again.", {
                    autoClose: 1500
                })
            }

            const result = await axios.get(`http://localhost:8100/api/blog/getBlogBanner`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!result) {
                return toast.error("Not Any Blog Banner Fetched", {
                    autoClose: 1500
                })
            }

            setBlogBanner(result.data.data);

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To fetch Blog Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const [fetchBlog, setFetchBlog] = useState([]);

    const fetchBlogs = async () => {
        try {
            const result = await axios.get(`http://localhost:8100/api/blog/getAllFeature`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(result.data.data)
            if (!result) {
                return toast.error("Blog Not fetched", {
                    autoClose: 1500
                })
            }

            setFetchBlog(result.data.data)

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To fetch Blogs";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const token = localStorage.getItem("admin_token");

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchBlogBanner();
            fetchBlogs();
        }

    }, [token, navigate])

    const handleInput = (e) => {
        const { name, value, files } = e.target;
        setdata({
            ...data,
            [name]: files ? files[0] : value
        })
    }

    const addBlogBanner = async (e) => {
        e.preventDefault();

        if (!data.heading) {
            return toast.error("Heading is required", {
                autoClose: 1500
            })
        }

        if (!data.paragraph) {
            return toast.error("Paragraph is required", {
                autoClose: 1500
            })
        }

        if (!data.image) {
            return toast.error("Image is required", {
                autoClose: 1500
            })
        }

        try {
            const token = localStorage.getItem("admin_token");

            if (!token) {
                return toast.error("No token found. Please login again.", {
                    autoClose: 1500
                })
            }

            const formData = new FormData();
            formData.append("heading", data.heading);
            formData.append("paragraph", data.paragraph);
            formData.append("image", data.image);

            const result = await axios.post(`http://localhost:8100/api/blog/addBlogBanner`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(result.data.data)
            if (!result) {
                return toast.error("May Be Frontend Error. Not Blog Banner Added", {
                    autoClose: 1500
                })
            }

            toast.success("Blog Banner Added Successfully", {
                autoClose: 1500
            })

            setdata({
                heading: "",
                paragraph: "",
                image: null
            })

            fetchBlogBanner();

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Add Blog Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const DeleteBanner = async (id) => {
        try {
            const token = localStorage.getItem("admin_token");

            if (!token) {
                return toast.error("No token found. Please login again.", {
                    autoClose: 1500
                })
            }

            const result = await axios.delete(`http://localhost:8100/api/blog/delBlogBanner/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!result) {
                return toast.error("Not Deleted", {
                    autoClose: 1500
                })
            }

            toast.success("Blog Banner Deleted", {
                autoClose: 1500
            })
            fetchBlogBanner();

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Delete Blog Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: files ? files[0] : value
        })
        // console.log(form)
    }

    const formatDateForInput = (date) => {
        if (!date) return "";

        const d = new Date(date);
        return d.toISOString().split("T")[0];
    };
    const [submitted, setSubmitted] = useState(false);

    const submitFeature = async (e) => {
        e.preventDefault();

        if (!form.feature) {
            return toast.error("Select Any One Feature Tag", {
                autoClose: 1500
            })
        }

        if (!form.name) {
            return toast.error("Burger Name Is Required", {
                autoClose: 1500
            })
        }

        if (!form.rate) {
            return toast.error("Please Give Your Rating", {
                autoClose: 1500
            })
        }

        if (!form.description) {
            return toast.error("Please Write Some Description", {
                autoClose: 1500
            })
        }

        if (!form.date) {
            return toast.error("Add Date For Blog", {
                autoClose: 1500
            })
        }

        if (!form.image) {
            return toast.error("Image Is Required", {
                autoClose: 1500
            })
        }

        try {
            const formData = new FormData();
            formData.append("feature", form.feature);
            formData.append("name", form.name);
            formData.append("rate", form.rate);
            formData.append("description", form.description);
            formData.append("date", form.date);
            formData.append("image", form.image);

            const result = await axios.post(`http://localhost:8100/api/blog/addfeature`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!result) {
                return toast.error("Blog Not Added", {
                    autoClose: 1500
                })
            }

            setForm(result.data.data);

            toast.success("Blog Is Added Successfully", {
                autoClose: 2000
            })
            fetchBlogs();
            setSubmitted(true);

            setTimeout(() => {
                setForm({
                    feature: "",
                    name: "",
                    rate: 0,
                    description: "",
                    date: "",
                    image: null
                });
                setSubmitted(false);
            }, 2000);
            window.location.reload();

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Problem to add blog";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const [id, setId] = useState(null);
    const UpdatedID = (id) => {

        const blogToUpdate = fetchBlog.find(blog => blog._id === id);

        if (blogToUpdate) {
            setForm({
                feature: blogToUpdate.feature || "",
                name: blogToUpdate.name || "",
                rate: blogToUpdate.rate || 0,
                description: blogToUpdate.description || "",
                date: blogToUpdate.date || "",
                image: blogToUpdate.image || null
            });
        }

        setId(id);
        setUpdating(true);
    }
    const UpdateBlogs = async (e) => {
        e.preventDefault();

        if (!form.feature) {
            return toast.error("Select Any One Feature Tag", {
                autoClose: 1500
            })
        }

        if (!form.name) {
            return toast.error("Burger Name Is Required", {
                autoClose: 1500
            })
        }

        if (!form.rate) {
            return toast.error("Please Give Your Rating", {
                autoClose: 1500
            })
        }

        if (!form.description) {
            return toast.error("Please Write Some Description", {
                autoClose: 1500
            })
        }

        if (!form.date) {
            return toast.error("Add Date For Blog", {
                autoClose: 1500
            })
        }

        if (!form.image) {
            return toast.error("Image Is Required", {
                autoClose: 1500
            })
        }

        try {
            const formData = new FormData();
            formData.append("feature", form.feature);
            formData.append("name", form.name);
            formData.append("rate", form.rate);
            formData.append("description", form.description);
            formData.append("date", form.date);
            formData.append("image", form.image);

            const result = await axios.put(`http://localhost:8100/api/blog/updateFeature/${id}`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(result.data.data)
            if (!result) {
                return toast.error("Blog Not Updated", {
                    autoClose: 1500
                })
            }

            setForm(result.data.data);

            toast.success("Blog Is Updated Successfully", {
                autoClose: 2000
            })
            setSubmitted(true)
            fetchBlogs();

            setTimeout(() => {
                setUpdating(false);
            }, 1500)

            setTimeout(() => {
                setForm({
                    feature: "",
                    name: "",
                    rate: 0,
                    description: "",
                    date: "",
                    image: null
                });
                setSubmitted(false);
                setId(null);
            }, 2000);

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Problem to add blog";
            toast.error(msg, {
                autoClose: 1500
            })
        }

    }

    const DeleteBlog = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:8100/api/blog/deleteFeature/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!result) {
                return toast.error("May be some issuse in delete blog", {
                    autoClose: 1500
                })
            }

            toast.success("Blog Deleted Successfully", {
                autoClose: 1500
            })
            fetchBlogs();

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Delete Blog";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const close = () => {
        setUpdating(false);
        setForm({
            feature: "",
            name: "",
            rate: 0,
            description: "",
            date: "",
            image: null
        });
        setSubmitted(false);
    }

    return (
        <div className="flex">
            <div className='w-80 p-5'></div>
            <div className='mx-5 px-5'>
                <div>
                    <h1 className='text-4xl py-3'>
                        Add Blog Banner
                    </h1>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat quibusdam itaque architecto blanditiis facere voluptatem aspernatur cum voluptate delectus. Odit, fugiat sapiente. Nisi ullam id aliquid ab saepe mollitia.</h1>
                </div>
                <div className=''>
                    <form className='mt-10 flex flex-wrap flex-col justify-center gap-5 bg-gray-50 p-5 rounded-lg'>
                        <div className='flex flex-wrap flex-col justify-center items-start'>
                            <label className='text-1xl'>Heading</label>
                            <input
                                type="text"
                                name="heading"
                                value={data?.heading || ""}
                                placeholder='Type Your Heading'
                                onChange={handleInput}
                                className='py-2 px-1 rounded-lg border-2 border-red-400 w-100'
                            />
                        </div>
                        <div className='flex flex-wrap flex-col justify-center items-start'>
                            <label className='text-1xl'>Contents</label>
                            <textarea
                                type="text"
                                name="paragraph"
                                value={data?.paragraph || ""}
                                placeholder='Write Your paragraph'
                                onChange={handleInput}
                                className='py-2 px-1 rounded-lg border-2 border-red-400 w-100'
                            />
                        </div>
                        <div className='flex flex-wrap flex-col justify-center items-start'>
                            <label className='text-1xl'>Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                placeholder='Type Your Heading'
                                onChange={handleInput}
                                className='py-2 px-2 rounded-lg border-2 border-red-400 w-100 file:rounded-lg file:bg-red-500 file:py-1 file:px-2 file:text-white'
                            />
                        </div>

                        <div>
                            <button type='submit' onClick={addBlogBanner}
                                className='px-5 py-2 flex flex-wrap flex-col justify-center items-start bg-gray-700 text-white hover:bg-gray-600 hover:scale-105 duration-200 rounded-lg'
                            >
                                Add Blog Banner
                            </button>
                        </div>
                    </form>
                </div>

                {
                    blogBanner.map((item, index) => (
                        <div key={index} className='mt-5'>

                            <div className="relative mb-10">

                                <img
                                    src={`http://localhost:8100/BlogImage/${item.image}`}
                                    alt={item.heading}
                                    className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                                />

                                <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

                                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-10 text-white">

                                    <h2 className="text-2xl md:text-4xl font-bold mb-3">
                                        {item.heading}
                                    </h2>

                                    <p className="text-sm md:text-lg max-w-xl mb-4 line-clamp-3">
                                        {item.paragraph}
                                    </p>

                                    <button
                                        onClick={() => DeleteBanner(item._id)}
                                        className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 hover:scale-105 transition duration-200"
                                    >
                                        Delete Banner
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                }

                <div>
                    <div>
                        <div className="min-h-screen flex items-center justify-center p-6 font-sans">
                            <div className="w-full max-w-2xl">
                                <div className="mb-8 text-center">
                                    <span className="inline-block bg-red-600 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                                        Burger Entry
                                    </span>
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                                        🍔 Add Burger Blog
                                    </h1>
                                    <p className="text-gray-500 mt-1 text-sm">Fill in the details below to list your burger.</p>
                                </div>

                                <div className="bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden">

                                    <div className="h-2 bg-gradient-to-r from-red-500 via-gray-300 to-gray-300" />

                                    <div className="p-8 space-y-6">

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                                    Feature Tag
                                                </label>
                                                <select
                                                    name="feature"
                                                    value={form?.feature || ""}
                                                    onChange={handleChange}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                                >
                                                    <option value="">Choose Any One Option </option>
                                                    <option value="classic">classic</option>
                                                    <option value="bbq">bbq</option>
                                                    <option value="cheese">cheese</option>
                                                    <option value="spicy">spicy</option>
                                                    <option value="double-patty">double-patty</option>
                                                    <option value="veg">veg</option>
                                                    <option value="chicken">chicken</option>
                                                    <option value="premium">premium</option>
                                                    <option value="loaded">loaded</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                                    Burger Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={form?.name || ""}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Smash Burger"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                                Rating <span className="text-amber-500">★</span>
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="range"
                                                    name="rate"
                                                    min="0"
                                                    max="5"
                                                    step="0.1"
                                                    value={form?.rate || ""}
                                                    onChange={handleChange}
                                                    className="flex-1 accent-red-500 h-2"
                                                />
                                                <span className="bg-red-600 text-white font-black text-sm px-3 py-1.5 rounded-xl min-w-[52px] text-center">
                                                    {parseFloat(form?.rate || 0).toFixed(1)}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={form?.description || ""}
                                                onChange={handleChange}
                                                rows={4}
                                                placeholder="Describe the burger..."
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                            />
                                            <p className="text-right text-xs text-gray-400 mt-1">{form?.description || ""} chars</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                                Blog Date
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={formatDateForInput(form?.date || "")}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                                Burger Image
                                            </label>
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleChange}
                                                className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-3 px-4 cursor-pointer bg-gray-50 hover:bg-gray-100 file:bg-red-500 file:px-2 file:rounded-lg file:text-white file:py-1"
                                            />
                                        </div>

                                        <button
                                            onClick={submitFeature}
                                            className={`w-full py-4 rounded-2xl font-black text-white tracking-wide text-base transition-all duration-300 shadow-lg ${submitted
                                                ? "bg-green-500 scale-95"
                                                : "bg-red-600 hover:bg-red-700 hover:shadow-red-200 hover:shadow-xl active:scale-95"
                                                }`}
                                        >
                                            {submitted ? "✅ Saved Successfully!" : "Save Blog Feature →"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <section className="burgers-grid-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">Latest Burger Blogs</h2>
                                <p className="section-subtitle">Fresh from the grill</p>
                            </div>
                            <div className="burgers-grid">
                                {
                                    fetchBlog?.length > 0 && fetchBlog.map((item) => (
                                        <article key={item._id} className="burger-card">
                                            <div className="burger-image">
                                                <img src={`http://localhost:8100/BlogImage/${item.image}`} alt={item.image} />
                                                <div className="image-overlay">
                                                    <span className="category">
                                                        {item.feature}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="burger-content">
                                                <h3>{item.name}</h3>
                                                <p>{item.description}</p>
                                                <div className="burger-footer">
                                                    <div className="rating">★ {item.rate}</div>
                                                    <span className="date">
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <button type='submit' onClick={(e) => UpdatedID(item._id)}
                                                        className='px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 duration-150 hover:scale-105'
                                                    >
                                                        Update Blog
                                                    </button>
                                                    <button type='submit' onClick={(e) => DeleteBlog(item._id)}
                                                        className='px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 duration-150 hover:scale-105'
                                                    >
                                                        Delete Blog
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                }

                            </div>
                        </div>
                    </section>
                </div>

                {
                    updating ? (
                        <>
                            <div className="transition-all duration-300 ease-in-out inset-0 bg-black/50 fixed" />
                            <div className="transition-all duration-300 ease-in-out w-180 bg-white rounded-3xl shadow-xl border border-amber-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed">
                                <button className='absolute top-3 right-5 bg-red-500 px-2 py-0.5 text-white rounded-lg hover:bg-red-400 hover:scale-110' onClick={close}>
                                    close
                                </button>

                                <div className="p-8 space-y-6">

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                                Feature Tag
                                            </label>
                                            <select
                                                name="feature"
                                                value={form?.feature || ""}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                            >
                                                <option value="">Choose Any One Option </option>
                                                <option value="classic">classic</option>
                                                <option value="bbq">bbq</option>
                                                <option value="cheese">cheese</option>
                                                <option value="spicy">spicy</option>
                                                <option value="double-patty">double-patty</option>
                                                <option value="veg">veg</option>
                                                <option value="chicken">chicken</option>
                                                <option value="premium">premium</option>
                                                <option value="loaded">loaded</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                                Burger Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form?.name || ""}
                                                onChange={handleChange}
                                                placeholder="e.g. Smash Burger"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                            Rating <span className="text-amber-500">★</span>
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                name="rate"
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                value={form?.rate || ""}
                                                onChange={handleChange}
                                                className="flex-1 accent-red-500 h-2"
                                            />
                                            <span className="bg-red-600 text-white font-black text-sm px-3 py-1.5 rounded-xl min-w-[52px] text-center">
                                                {parseFloat(form?.rate || 0).toFixed(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={form?.description || ""}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Describe the burger..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                        />
                                        <p className="text-right text-xs text-gray-400 mt-1">{form?.description || ""} chars</p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                            Blog Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formatDateForInput(form?.date || "")}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                                            Burger Image
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-3 px-4 cursor-pointer bg-gray-50 hover:bg-gray-100 file:bg-red-500 file:px-2 file:rounded-lg file:text-white file:py-1"
                                        />
                                    </div>

                                    <button
                                        onClick={UpdateBlogs}
                                        className={`w-full py-4 rounded-2xl font-black text-white tracking-wide text-base transition-all duration-300 shadow-lg ${submitted
                                            ? "bg-green-500 scale-95"
                                            : "bg-red-600 hover:bg-red-700 hover:shadow-red-200 hover:shadow-xl active:scale-95"
                                            }`}
                                    >
                                        {
                                            submitted
                                                ? "✅ Saved Successfully!"
                                                : updating
                                                    ? "Update Blog"
                                                    : "Add Blog"
                                        }
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : ("")
                }
            </div>
        </div>
    )
}

export default BlogBanner