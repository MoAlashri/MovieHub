import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { FaBookmark, FaChevronDown, FaPlay, FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import useMovie from "../../hooks/useMovie";
import { SkeletonBanner } from "../ui/SkeletonCard";
import { useWatchlist } from "../../context/WatchlistContext";
import { endpoints, getBackdropUrl, getTrailerUrl } from "../../utils/constants";

const SWIPER_CONFIG = {
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { clickable: true },
};

export default function HeroSwiper() {
  const { movies, loading } = useMovie(endpoints.movie.popular());
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (loading) return <SkeletonBanner />;

  const slides = movies?.slice(0, 6) ?? [];

  function handleScrollDown() {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }

  return (
    <div className="relative w-full h-[92vh] overflow-hidden">
      <Swiper modules={[Autoplay, Pagination, EffectFade]} {...SWIPER_CONFIG} className="h-full">
        {slides.map((movie) => (
          <SwiperSlide key={movie.id}>
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms]"
              style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 bg-primary/20 border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <HiSparkles className="text-sm" /> Now Trending
                </span>
                <span className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <FaStar className="text-xs" /> {movie.vote_average?.toFixed(1)}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-4"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
              >
                {movie.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-gray-300 text-sm mb-5">
                <span className="border border-gray-600 px-2 py-0.5 rounded">
                  {movie.release_date?.split("-")[0]}
                </span>
                <span className="text-gray-400">{movie.vote_count?.toLocaleString()} votes</span>
              </div>

              {/* Overview */}
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 line-clamp-3 max-w-xl">
                {movie.overview}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={getTrailerUrl(movie.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 bg-primary hover:bg-red-700 text-white
                             font-bold px-7 py-3.5 rounded-full transition-all duration-300
                             hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
                >
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                    <FaPlay className="text-xs ml-0.5" />
                  </span>
                  Watch Trailer
                </a>

                <Link
                  to={`/media/movie/${movie.id}`}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30
                             text-white font-semibold px-7 py-3.5 rounded-full backdrop-blur-sm
                             transition-all duration-300 hover:scale-105"
                >
                  More Info
                </Link>

                <button
                  onClick={() => toggleWatchlist({ ...movie, mediaType: "movie" })}
                  title={isInWatchlist(movie.id) ? "Remove from Watchlist" : "Save to Watchlist"}
                  className={`flex items-center gap-2 border border-white/30 text-white p-3.5
                              rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105
                              ${isInWatchlist(movie.id)
                      ? "bg-primary border-primary shadow-lg shadow-primary/30"
                      : "bg-white/5 hover:bg-white/15"
                    }`}
                >
                  <FaBookmark />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                   flex flex-col items-center gap-1 text-white/50 text-xs
                   animate-bounce hover:text-white/80 transition-colors"
        aria-label="Scroll down"
      >
        <span className="tracking-widest uppercase">Scroll</span>
        <FaChevronDown />
      </button>
    </div>
  );
}