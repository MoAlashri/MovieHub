import React from "react";
import { FaBookmark } from "react-icons/fa";

import useMovie from "../hooks/useMovie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function TrendingMovies() {
  const { movies, loading, error } = useMovie(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=c5b69f7cff083601fb5d9308f3e9b4b1`,
  );

  if (loading) return <div className="m-10">Loading...</div>;
  if (error) return <div className="m-10">Error: {error.message || error}</div>;

  return (
    <section className="m-10 text-white">
      <h2 className="text-2xl font-bold mb-6 border-l-8 border-red-600 pl-3">
        Trending This Week 🔥
      </h2>

      <Swiper
        modules={[Autoplay]}
        // slidesPerView={ظ4}
        spaceBetween={30}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative group rounded-xl overflow-hidden bg-transparent hover:scale-[1.03] hover:shadow-2xl hover:shadow-red-800/20 transition-all duration-500">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-[450px] bg-gray-800 flex items-center justify-center">
                  No Image
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold mb-1 text-red-500">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2 mb-1">
                  {movie.overview}
                </p>
                <p className="text-yellow-400 text-sm flex items-center gap-1">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
                <button className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1 rounded">
                  View Details
                </button>
              </div>

              
              <button className="absolute top-3 right-3 text-white bg-black/50 hover:bg-red-600 p-2 rounded-full transition-all duration-300 text-xl">
                <FaBookmark />
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
