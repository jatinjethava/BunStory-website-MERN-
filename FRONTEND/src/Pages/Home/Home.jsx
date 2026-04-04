import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
    return (
        <>
            <div className='w-[96%] m-auto mb-20'>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 3000 }}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    className='rounded-2xl'
                >
                    {["/burger1.jpg", "/burger4.jpg", "/burger8.jpg"].map((img, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={img}
                                className="w-full h-150 object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default Home