import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const fallbackImages = ["/burger1.jpg", "/burger4.jpg", "/burger8.jpg"];

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const token = localStorage.getItem("admin_token");

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        }
    }, [token, navigate]);

    const fetchBannerData = async () => {
        try {
            const result = await axios.get(`http://localhost:8100/api/home/gethome`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!result?.data?.data) {
                console.warn("No banner data received, using fallback images");
                setData(fallbackImages.map((img, idx) => ({
                    _id: idx,
                    image: img,
                    header: "Delicious Burgers",
                    content: "Enjoy our delicious handcrafted burgers"
                })));
                return;
            }
            // console.log("Banner data loaded:", result.data.data);
            setData(result.data.data);
        } catch (error) {
            console.error("Error fetching banner:", error);
            const msg = error.response?.data?.message ?? "Failed to fetch banner";
            toast.error(msg, { autoClose: 1500 });
            // Use fallback images on error
            setData(fallbackImages.map((img, idx) => ({
                _id: idx,
                image: img,
                header: "Delicious Burgers",
                content: "Enjoy our delicious handcrafted burgers"
            })));
        }
    };

    useEffect(() => {
        fetchBannerData();
    });

    return (
        <div className="w-[96%] m-auto mb-20">
            {data && data.length > 0 ? (
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 3000 }}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    className="rounded-2xl overflow-hidden"
                >
                    {data.map((item) => (
                        <SwiperSlide key={item._id || Math.random()}>
                            <div className="relative w-full h-[500px] md:h-[600px]">
                                <img
                                    src={item.image.startsWith('http') ? item.image : `http://localhost:8100/HomeImage/${item.image}`}
                                    alt={item.header || 'Banner'}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                                    <h1 className="text-white text-3xl md:text-5xl font-bold">
                                        {item.header}
                                    </h1>
                                    <p className="max-w-2xl mt-4 text-white text-sm md:text-lg">
                                        {item.content}
                                    </p>
                                    <Link
                                        to="/burgerlist"
                                        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
                                    >
                                        Order Now
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="w-full h-[500px] md:h-[600px] rounded-2xl bg-gray-400 flex items-center justify-center">
                    <p className="text-white text-lg">Loading banner...</p>
                </div>
            )}
        </div>
    );
};

export default Home;