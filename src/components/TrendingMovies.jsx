import React from 'react'
// import useMovie from "../hooks/useMovie";
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import required modules
export default function TrendingMovies() {

    // const {movies, loading , error} = useMovie()

  return (
  <div className='m-10 '> 
      <Swiper
       modules={[Autoplay]}
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        // centeredSlides={true}
       autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  )
}
