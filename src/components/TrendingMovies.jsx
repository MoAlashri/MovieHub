import React from "react";
import { FaBookmark ,FaPlay} from "react-icons/fa";
import { HiEye } from "react-icons/hi2";

import { Link } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SectionHeader from "./SectionHeader";

export default function TrendingMovies() {
  const { movies, loading, error } = useMovie(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=c5b69f7cff083601fb5d9308f3e9b4b1`,
  );

  if (loading) return <div className="m-10">Loading...</div>;
  if (error) return <div className="m-10">Error: {error.message || error}</div>;

  return (
    <section className=" text-white m-4">
           <SectionHeader title=' Trending This Week'  />
     

      <Swiper
        modules={[Autoplay]}
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

                <div className="flex flex-col gap-3 mt-2 ">
                  <a
                    href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                  >
                    <FaPlay /> Watch Trailer
                  </a>

                  <Link
                    to={`/movie/${movie.id}`}
                    className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2   "
                  >
                   <HiEye  className="text-primary text-xl"/> View Details
                  </Link>
                </div>
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
