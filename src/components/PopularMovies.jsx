import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { FaStar, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import SectionHeader from "./SectionHeader";

export default function PopularMovies() {
  const { movies, loading, error } = useMovie(
    `https://api.themoviedb.org/3/movie/popular?api_key=c5b69f7cff083601fb5d9308f3e9b4b1`,
  );

  if (loading) return <div className="m-10 text-white">Loading...</div>;
  if (error)
    return <div className="m-10 text-red-500">Error: {error.message}</div>;

  return (
    <section className="relative w-full text-white py-16">
      <SectionHeader title=' Popular Movies Showcase'/>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
        className="max-w-[100%] mx-auto rounded-sm overflow-hidden"
      >
        {movies.slice(0, 10).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative flex flex-col md:flex-row items-center justify-center gap-6 px-6 md:px-12 py-10 "
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-[250px] md:w-[320px] rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-700"
              />

              <div className="max-w-[600px]">
                <h3 className="text-3xl font-bold mb-3 text-red-500">
                  {movie.title}
                </h3>
                <p className="flex items-center gap-2 text-yellow-400 mb-2">
                  <FaStar /> {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-5 line-clamp-4">
                  {movie.overview || "No description available."}
                </p>

                <div className="flex flex-wrap gap-3">
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
                    className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
