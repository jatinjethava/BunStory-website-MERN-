import React, { useState, useEffect } from 'react'
import './Blog.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Blog = () => {

    const navigate = useNavigate();
    const [blogBanner, setBlogBanner] = useState([]);
    const [featuredBurger, setFeaturedBurger] = useState([]);
    const [fetchAllFeature, setfetchAllFeature] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("admin_token");
    useEffect(() => {
        if (!token) {
            navigate('/admin/login')
        } else {
            fetchBlogBanner();
            fetchFeature();
            allFeature();
            setLoading(false);
        }
    }, [token, navigate])

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
            })

            // console.log(result.data.data)

            if (!result) {
                return toast.error("Not Data Fetched", {
                    autoClose: 1500
                })
            }

            setBlogBanner(result.data.data);

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed to fetch Blog Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const fetchFeature = async () => {
        try {
            const token = localStorage.getItem("admin_token");

            if (!token) {
                return toast.error("token not provided. please login again", {
                    autoClose: 1500
                })
            }

            const result = await axios.get(`http://localhost:8100/api/blog/getfeature`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(result.data.data)
            if (!result) {
                return toast.error("Not Fetch Features Data", {
                    autoClose: 1500
                })
            }

            // Wrap in array if it's a single object
            const featuresArray = Array.isArray(result.data.data) ? result.data.data : [result.data.data];
            setFeaturedBurger(featuresArray);

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Fetch Feature";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const allFeature = async () => {
        try {
            const token = localStorage.getItem("admin_token");

            if (!token) {
                return toast.error("Token not Provided. login Again", {
                    autoClose: 1500
                })
            }

            const result = await axios.get(`http://localhost:8100/api/blog/getAllFeature`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(result.data.data)
            if (!result) {
                return toast.error("Not Possible To Fetch", {
                    autoClose: 1500
                })
            }

            setfetchAllFeature(result.data.data);

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Add Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading delicious content...</p>
            </div>
        );
    }

    return (
        <>
            <div className="burger-blog">
                {blogBanner && blogBanner.length > 0 ? (
                    blogBanner.map((item) => (
                        <header
                            key={item._id}
                            className="h-[60vh] flex items-center justify-center relative overflow-hidden bg-cover bg-center"
                            style={{
                                backgroundImage: `url(http://localhost:8100/BlogImage/${item.image})`
                            }}
                        >
                            <div className="hero-overlay"></div>
                            <div className="hero-content">
                                <h1 className="hero-title">{item.heading || 'Blog Post'}</h1>
                                <p className="hero-subtitle">
                                    {item.paragraph || 'Read our latest blog post'}
                                </p>
                            </div>
                        </header>
                    ))
                ) : (
                    <header className="h-[60vh] bg-gradient-to-br from-[#ff6b35] to-[#f7931e] flex items-center justify-center relative">
                        <div className="hero-content text-center">
                            <h1 className="hero-title">Blog Posts</h1>
                            <p className="hero-subtitle">Loading blog content...</p>
                        </div>
                    </header>
                )}

                <section className="featured-section">
                    <div className="container">
                        <h2 className="section-title">Featured Burger</h2>
                        {featuredBurger?.length > 0 && featuredBurger.map((item, index) => (
                            <article key={index} className="featured-burger">
                                <div className="featured-image">
                                    <img src={`http://localhost:8100/BlogImage/${item.image}`} alt={item.image} />
                                </div>
                                <div className="featured-content">
                                    <span className="category-badge">{item.feature}</span>
                                    <h3>{item.name}</h3>
                                    <div className="rating">
                                        ★ {item.rate}/5
                                    </div>
                                    <p>{item.description}</p>
                                    <div className="burger-meta">
                                        <span>{new Date(item.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="burgers-grid-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Latest Burger Reviews</h2>
                            <p className="section-subtitle">Fresh from the grill</p>
                        </div>
                        <div className="burgers-grid">
                            {
                                fetchAllFeature.length > 0 && fetchAllFeature.map((item, index) => (
                                    <article key={index} className="burger-card">
                                        <div className="burger-image">
                                            <img src={`http://localhost:8100/BlogImage/${item.image}`} alt={item.image} />
                                            <div className="image-overlay">
                                                <span className="category">{item.feature}</span>
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
                                        </div>
                                    </article>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
export default Blog