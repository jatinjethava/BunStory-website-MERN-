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
    const [blogBanner, setBlogBanner] = useState([]);

    const token = localStorage.getItem("admin_token");
    const fetchBlogBanner = async () => {
        try {
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

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchBlogBanner();
        }

    }, [token, navigate, fetchBlogBanner])

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
            console.log(result.data.data)
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

            window.location.reload();

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Add Blog Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const DeleteBanner = async (id) => {
        try {
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

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Delete Blog Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
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
            </div>
        </div>
    )
}

export default BlogBanner