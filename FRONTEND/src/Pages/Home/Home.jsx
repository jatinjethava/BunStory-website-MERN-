import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="w-[96%] m-auto mb-20">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 3000 }}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    className="rounded-2xl overflow-hidden"
                >
                    {["/burger1.jpg", "/burger4.jpg", "/burger8.jpg"].map((img, i) => (
                        <SwiperSlide key={i}>
                            {/* Parent must be relative */}
                            <div className="relative w-full h-[500px] md:h-[600px]">

                                {/* Image */}
                                <img
                                    src={img}
                                    alt="burger"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-black/50"></div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                                    <h1 className="text-white text-3xl md:text-5xl font-bold">
                                        Hi, I Am Burger King
                                    </h1>

                                    <p className="max-w-2xl mt-4 text-white text-sm md:text-lg">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                                        soluta eligendi facilis sunt eum, laudantium culpa error totam.
                                    </p>

                                    <Link to={"/burgerlist"} className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition">
                                        Order Now
                                    </Link>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default Home