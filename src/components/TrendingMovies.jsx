import React from 'react'
import useMovie from "../hooks/useMovie";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import required modules
export default function TrendingMovies() {

    const {movies, loading , error} = useMovie( `https://api.themoviedb.org/3/trending/movie/week?api_key=c5b69f7cff083601fb5d9308f3e9b4b1`)

  if (loading) return <div className="m-10">Loading...</div>
  if (error) return <div className="m-10">Error: {error.message || error}</div>

  return (
  <div className='m-10 '> 
        <h2 className="text-2xl font-bold mb-6 border-l-8 border-primary pl-2 ">Trending This Week 🔥 </h2>
      <Swiper
       modules={[Autoplay]}
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        freeMode={true}
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
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="bg-gray-800 hover:bg-gray-800/40 transition-all duration-500 rounded-lg overflow-hidden  shadow-md pb-1">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">No image</div>
              )}
              <h3 className="mt-2 text-sm font-medium">{movie.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
