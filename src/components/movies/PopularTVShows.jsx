import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaPlay, FaGlobe, FaCalendarAlt, FaTv } from "react-icons/fa";
import { HiEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import SectionHeader from "../ui/SectionHeader";
import { SkeletonBanner } from "../ui/SkeletonCard";

export default function PopularTVShows() {
  const { movies: shows, loading, error } = useMovie(
    `https://api.themoviedb.org/3/tv/popular?api_key=c5b69f7cff083601fb5d9308f3e9b4b1&language=en-US&page=1`,
  );
  const [casts, setCasts] = useState({});
  const [currentShow, setCurrentShow] = useState(null);

  async function fetchCast(tvId) {
    if (casts[tvId]) return;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=c5b69f7cff083601fb5d9308f3e9b4b1&language=en-US`,
      );
      const data = await res.json();
      setCasts((prev) => ({ ...prev, [tvId]: data.cast?.slice(0, 5) }));
    } catch (err) {
      console.error("Error fetching cast:", err);
    }
  }

  if (loading)
    return (
      <section>
        <SectionHeader title="Popular TV Shows" subtitle="Stream the most-watched series" />
        <SkeletonBanner />
      </section>
    );
  if (error) return null;

  return (
    <section className="relative w-full text-white pb-8">
      <SectionHeader title="Popular TV Shows" subtitle="Stream the most-watched series" />

      <div className="relative h-[600px]">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          navigation
          loop
          onSlideChange={(swiper) => {
            const show = shows[swiper.realIndex % shows.length];
            if (show) {
              setCurrentShow(show.id);
              fetchCast(show.id);
            }
          }}
          className="h-full"
        >
          {shows.slice(0, 15).map((show) => (
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
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center px-8 md:px-20">
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row items-center md:items-start gap-10 w-full max-w-6xl"
                >
                  {/* Poster */}
                  <motion.div
                    className="relative shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.name}
                      className="w-[180px] md:w-[240px] rounded-2xl shadow-2xl"
                    />
                    <div className="absolute -inset-2 rounded-2xl bg-blue-500/10 blur-xl -z-10" />
                  </motion.div>

                  {/* Info */}
                  <div className="flex flex-col justify-center max-w-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                        TV Show
                      </span>
                      <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                        <FaStar className="text-xs" /> {show.vote_average?.toFixed(1)}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
                      {show.name}
                    </h2>

                    <div className="flex items-center gap-5 text-gray-400 text-xs mb-4 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-blue-400" />
                        {show.first_air_date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaGlobe className="text-green-400" />
                        {show.origin_country?.[0] || "Unknown"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaTv className="text-purple-400" />
                        TV Series
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">
                      {show.overview || "No description available."}
                    </p>

                    {/* Cast */}
                    {casts[show.id] && (
                      <div className="flex gap-2 mb-5 flex-wrap">
                        {casts[show.id].map((actor) => (
                          <div
                            key={actor.id}
                            className="flex items-center gap-2 bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-xl backdrop-blur-sm"
                          >
                            <img
                              src={
                                actor.profile_path
                                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                  : "https://via.placeholder.com/40x40?text=?"
                              }
                              alt={actor.name}
                              className="w-7 h-7 rounded-full object-cover border border-white/20"
                            />
                            <span className="text-xs text-gray-200 font-medium">
                              {actor.name.split(" ")[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-4 flex-wrap">
                      <a
                        href={`https://www.youtube.com/results?search_query=${show.name}+tv+show+trailer`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
                      >
                        <FaPlay /> Watch Trailer
                      </a>
                      <Link
                        to={`/TvShow`}
                        className="flex items-center gap-2 border border-white/30 hover:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
                      >
                        <HiEye /> View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
