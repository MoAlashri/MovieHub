import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { FaStar, FaPlay, FaGlobe, FaCalendarAlt, FaTv } from "react-icons/fa";
import { Link } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import SectionHeader from "./SectionHeader";

export default function PopularTVShows() {
  const { movies: shows, loading, error } = useMovie(
    `https://api.themoviedb.org/3/tv/popular?api_key=c5b69f7cff083601fb5d9308f3e9b4b1&language=en-US&page=1`
  );

  const [casts, setCasts] = useState({});

  async function fetchCast(tvId) {
    if (casts[tvId]) return; // لو الكاست اتحمل قبل كده
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=c5b69f7cff083601fb5d9308f3e9b4b1&language=en-US`
      );
      const data = await res.json();
      setCasts((prev) => ({ ...prev, [tvId]: data.cast.slice(0, 5) })); // أول 5 ممثلين
    } catch (err) {
      console.error("Error fetching cast:", err);
    }
  }

  if (loading) return <div className="m-10 text-white">Loading...</div>;
  if (error) return <div className="m-10 text-red-500">Error: {error.message}</div>;

  return (
    <section className="relative w-full h-[90vh] text-white overflow-hidden">
            <SectionHeader title=' Popular Tv Shows'/>
      
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        loop
        onSlideChange={(swiper) => {
          const currentShow = shows[swiper.realIndex];
          if (currentShow) fetchCast(currentShow.id);
        }}
        className="h-full"
      >
        {shows.slice(0, 15).map((show) => (
          <SwiperSlide key={show.id}>
            {/* Background Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 h-full flex items-center px-6 md:px-20">
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl w-full max-w-6xl"
              >
                {/* Poster */}
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-[250px] md:w-[300px] rounded-2xl shadow-xl"
                />

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3, delay: 0.2 }}
                  className="flex flex-col justify-center max-w-xl"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-400 drop-shadow-lg">
                    {show.name}
                  </h2>

                  {/* Meta info */}
                  <div className="flex items-center gap-6 text-gray-300 text-sm mb-4 flex-wrap">
                    <span className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      {show.vote_average?.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400" />
                      {show.first_air_date}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaGlobe className="text-green-400" />
                      {show.origin_country?.[0] || "Unknown"}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaTv className="text-purple-400" />
                      {show.number_of_seasons
                        ? `${show.number_of_seasons} Seasons`
                        : "TV Show"}
                    </span>
                  </div>

                  {/* Overview */}
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                    {show.overview || "No description available."}
                  </p>

                  {/* Cast Section */}
                  {casts[show.id] && (
                    <div className="flex gap-4 mt-4 flex-wrap">
                      {casts[show.id].map((actor) => (
                        <div
                          key={actor.id}
                          className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm"
                        >
                          <img
                            src={
                              actor.profile_path
                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                : "https://via.placeholder.com/50x75?text=?"
                            }
                            alt={actor.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm text-gray-200">
                            {actor.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-4 flex-wrap mt-6">
                    <a
                      href={`https://www.youtube.com/results?search_query=${show.name}+tv+show+trailer`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                    >
                      <FaPlay /> Watch Trailer
                    </a>
                    <Link
                      to={`/tv/${show.id}`}
                      className="border border-gray-300 hover:bg-white hover:text-black px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
