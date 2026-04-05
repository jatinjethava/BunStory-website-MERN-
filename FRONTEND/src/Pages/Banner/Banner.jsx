import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Banner = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        header: "",
        content: "",
        image: null
    });
    const [banner, setBanner] = useState([]);

    const token = localStorage.getItem("admin_token");
    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        }
    })

    useEffect(() => {
        fetchBanner();
    }, [token]);

    const fetchBanner = async () => {
        try {
            const result = await axios.get(`http://localhost:8100/api/home/gethome`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(result.data.data)

            if (!result) {
                return toast.error("Banner Not Fetch", {
                    autoClose: 1500
                });
            }

            setBanner(result.data.data);

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Fecth Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    const handleInput = (e) => {
        const { name, value, files } = e.target;

        setData({
            ...data,
            [name]: files ? files[0] : value
        })
    }

    const addBanner = async (e) => {
        e.preventDefault();

        if (!data.header) {
            return toast.error("Heading Is Required !", {
                autoClose: 1500
            });
        }

        if (!data.content) {
            return toast.error("Content Is Required !", {
                autoClose: 1500
            });
        }

        if (!data.image) {
            return toast.error("Image Is Required !", {
                autoClose: 1500
            });
        }

        try {

            const formData = new FormData();
            formData.append("header", data.header);
            formData.append("content", data.content);
            formData.append("image", data.image);

            const result = await axios.post(`http://localhost:8100/api/home/addHome`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!result) {
                return toast.error("Not Add Banner", {
                    autoClose: 1500
                })
            }

            setData({
                header: "",
                content: "",
                image: null
            });

            toast.success("Banner Added Successfully", {
                autoClose: 1500
            });

            fetchBanner();
            window.location.reload();

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Add Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }

    }

    const DeleteBanner = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:8100/api/home/deleteHome/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!result) {
                return toast.error("Banner Not Deleted", {
                    autoClose: 1500
                })
            }

            toast.success("Banner Deleted Successfully", {
                autoClose: 1500
            })

            fetchBanner();

        } catch (error) {
            const msg = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Failed To Delete Banner";
            toast.error(msg, {
                autoClose: 1500
            })
        }
    }

    return (
        <>
            <div className="flex">
                <div className='w-80 p-5'></div>
                <div className='mx-5 px-5'>
                    <div>
                        <h1 className='text-4xl py-3'>
                            Add Banner
                        </h1>
                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat quibusdam itaque architecto blanditiis facere voluptatem aspernatur cum voluptate delectus. Odit, fugiat sapiente. Nisi ullam id aliquid ab saepe mollitia.</h1>
                    </div>
                    <div className=''>
                        <form className='mt-10 flex flex-wrap flex-col justify-center gap-5 bg-gray-50 p-5 rounded-lg'>
                            <div className='flex flex-wrap flex-col justify-center items-start'>
                                <label className='text-1xl'>Heading</label>
                                <input
                                    type="text"
                                    name="header"
                                    value={data.header}
                                    placeholder='Type Your Heading'
                                    onChange={handleInput}
                                    className='py-2 px-1 rounded-lg border-2 border-red-400 w-100'
                                />
                            </div>
                            <div className='flex flex-wrap flex-col justify-center items-start'>
                                <label className='text-1xl'>Contents</label>
                                <textarea
                                    type="text"
                                    name="content"
                                    value={data.content}
                                    placeholder='Write Your Content'
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
                                <button type='submit' onClick={addBanner}
                                    className='px-5 py-2 flex flex-wrap flex-col justify-center items-start bg-gray-700 text-white hover:bg-gray-600 hover:scale-105 duration-200 rounded-lg'
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {
                        banner.map((item, index) => (
                            <div key={index} className='mt-5 flex justify-start items-center'>
                                <div className='w-150 p-5'>
                                    <div className='text-3xl'>
                                        {item.header}
                                    </div>
                                    <div>
                                        "{item.content}"
                                    </div>
                                    <div>
                                        <button type='button' onClick={(e) => DeleteBanner(item._id)} className='mt-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 hover:scale-105 duration-150'>
                                            Delete Banner
                                        </button>
                                    </div>
                                </div>
                                <div className='w-150 flex justify-center items-center'>
                                    <img src={`http://localhost:8100/HomeImage/${item.image}`} alt={item.image} className='h-65 w-120 rounded-2xl' />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Banner