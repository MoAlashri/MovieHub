import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { FaStar, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import "swiper/css";
import "swiper/css/effect-fade";
import SectionHeader from "./SectionHeader";

export default function TopRatedTVShows() {
  const { movies: shows, loading, error } = useMovie(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=c5b69f7cff083601fb5d9308f3e9b4b1&language=en-US&page=1`
  );

  if (loading) return <div className="m-10 text-white">Loading...</div>;
  if (error) return <div className="m-10 text-red-500">Error: {error.message}</div>;

  return (
    <section className="relative w-full h-[85vh] text-white">
            <SectionHeader title=' Top Rated Shows '/>
      
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {shows.slice(0, 25).map((show) => (
          <SwiperSlide key={show.id}>
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center md:justify-start px-6 md:px-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl w-full max-w-5xl"
              >
                {/* Poster */}
                <motion.img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-[250px] md:w-[300px] rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />

                {/* Info */}
                <div className="flex flex-col justify-center">
                  <motion.h2
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-3xl md:text-4xl font-bold mb-3 text-red-500 drop-shadow-lg"
                  >
                    {show.name}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-center gap-3 text-yellow-400 mb-4"
                  >
                    <FaStar /> {show.vote_average?.toFixed(1)} / 10
                    <span className="text-sm text-gray-300 ml-3">
                      ({show.vote_count} votes)
                    </span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 line-clamp-4"
                  >
                    {show.overview || "No description available."}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex gap-4 flex-wrap"
                  >
                    <a
                      href={`https://www.youtube.com/results?search_query=${show.name}+tv+show+trailer`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-red-500/40 transition-all duration-300"
                    >
                      <FaPlay /> Watch Trailer
                    </a>
                    <Link
                      to={`/tv/${show.id}`}
                      className="border border-gray-300 hover:bg-gray-100 hover:text-black px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
