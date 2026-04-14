import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { FaStar, FaPlay, FaFire } from "react-icons/fa";
import { HiEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import SectionHeader from "../ui/SectionHeader";
import { SkeletonBanner } from "../ui/SkeletonCard";

export default function TopRatedTVShows() {
  const { movies: shows, loading, error } = useMovie(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=c5b69f7cff083601fb5d9308f3e9b4b1&language=en-US&page=1`,
  );

  if (loading)
    return (
      <section>
        <SectionHeader title="Top Rated Shows" subtitle="The highest-rated series of all time" />
        <SkeletonBanner />
      </section>
    );
  if (error) return null;

  return (
    <section className="relative w-full text-white pb-8">
      <SectionHeader title="Top Rated Shows" subtitle="The highest-rated series of all time" />

      <div className="relative h-[560px]">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center md:justify-start px-8 md:px-20">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row items-center md:items-end gap-8 w-full max-w-5xl"
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
                      className="w-[160px] md:w-[220px] rounded-2xl shadow-2xl border-2 border-white/10"
                    />
                    {/* Rank badge */}
                    <div className="absolute -top-3 -left-3 bg-gradient-to-br from-yellow-500 to-orange-500 text-black text-xs font-black px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
                      <FaFire /> TOP
                    </div>
                    <div className="absolute -inset-2 rounded-2xl bg-red-500/10 blur-xl -z-10" />
                  </motion.div>

                  {/* Info */}
                  <div className="pb-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-full text-sm font-black">
                        <FaStar /> {show.vote_average?.toFixed(1)} / 10
                      </div>
                      <span className="text-gray-400 text-xs">
                        ({show.vote_count?.toLocaleString()} votes)
                      </span>
                    </div>

                    <motion.h2
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="text-3xl md:text-5xl font-black mb-4 text-white leading-tight"
                    >
                      {show.name}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 max-w-xl"
                    >
                      {show.overview || "No description available."}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: 0.6 }}
                      className="flex gap-4 flex-wrap"
                    >
                      <a
                        href={`https://www.youtube.com/results?search_query=${show.name}+tv+show+trailer`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-primary hover:bg-red-700 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
                      >
                        <FaPlay /> Watch Trailer
                      </a>
                      <Link
                        to={`/TvShow`}
                        className="flex items-center gap-2 border border-white/30 hover:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
                      >
                        <HiEye /> View Details
                      </Link>
                    </motion.div>
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
