import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { FaStar, FaPlay, FaCalendarAlt, FaClock } from "react-icons/fa";
import { HiEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import SectionHeader from "../ui/SectionHeader";
import { SkeletonBanner } from "../ui/SkeletonCard";

export default function PopularMovies() {
  const { movies, loading, error } = useMovie(
    `https://api.themoviedb.org/3/movie/popular?api_key=c5b69f7cff083601fb5d9308f3e9b4b1`,
  );

  if (loading)
    return (
      <section>
        <SectionHeader title="Popular Movies" subtitle="Fan-favorites everyone is talking about" />
        <SkeletonBanner />
      </section>
    );
  if (error) return null;

  return (
    <section className="relative w-full text-white pb-8">
      <SectionHeader title="Popular Movies" subtitle="Fan-favorites everyone is talking about" />

      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        navigation
        loop
        className="w-full overflow-hidden"
      >
        {movies.slice(0, 10).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative flex flex-col md:flex-row items-center justify-center gap-10 px-8 md:px-20 py-16 min-h-[520px]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Poster */}
              <div className="relative z-10 shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-[200px] md:w-[280px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-700"
                />
                {/* Glow ring */}
                <div className="absolute -inset-2 rounded-2xl bg-primary/10 blur-xl -z-10" />
              </div>

              {/* Info */}
              <div className="relative z-10 max-w-xl">
                {/* Genre tags placeholder */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/20 border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                    <FaStar /> {movie.vote_average?.toFixed(1)}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black mb-3 text-white leading-tight">
                  {movie.title}
                </h3>

                <div className="flex items-center gap-5 text-gray-400 text-sm mb-5 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-primary" />
                    {movie.release_date}
                  </span>
                  <span className="text-gray-500">
                    {movie.vote_count?.toLocaleString()} votes
                  </span>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-7 line-clamp-4">
                  {movie.overview || "No description available."}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://www.youtube.com/results?search_query=${movie.title}+official+trailer`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-primary hover:bg-red-700 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
                  >
                    <FaPlay /> Watch Trailer
                  </a>
                  <Link
                    to={`/Movie-details/${movie.id}`}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
                  >
                    <HiEye /> View Details
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
