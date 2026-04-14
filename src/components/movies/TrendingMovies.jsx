import React from "react";
import { FaBookmark, FaPlay, FaStar } from "react-icons/fa";
import { HiEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import SectionHeader from "../ui/SectionHeader";
import { SkeletonCard } from "../ui/SkeletonCard";
import { useWatchlist } from "../../context/WatchlistContext";

export default function TrendingMovies() {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { movies, loading, error } = useMovie(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=c5b69f7cff083601fb5d9308f3e9b4b1`,
  );

  if (loading)
    return (
      <section className="mb-8">
        <SectionHeader title="Trending This Week" subtitle="Most watched movies right now" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-10">
          {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </section>
    );
  if (error) return null;

  return (
    <section className="pb-8">
      <SectionHeader title="Trending This Week" subtitle="Most watched movies right now" />

      <div className="px-6 md:px-10">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            480: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 5.2 },
          }}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative group rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/60 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-black/50">
                {/* Poster */}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[350px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-[420px] bg-gray-800 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* Rating badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-lg">
                  <FaStar className="text-xs" /> {movie.vote_average?.toFixed(1)}
                </div>

                {/* Bookmark */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWatchlist(movie); }}
                  title={isInWatchlist(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                  className={`absolute top-3 right-3 backdrop-blur-sm p-2 rounded-full transition-all duration-300 text-sm ${isInWatchlist(movie.id)
                    ? "bg-primary text-white shadow-lg shadow-primary/40"
                    : "bg-black/60 hover:bg-primary text-white"
                    }`}
                >
                  <FaBookmark />
                </button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                  <h3 className="text-base font-bold mb-1 text-white line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                    {movie.overview}
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={`https://www.youtube.com/results?search_query=${movie.title}+trailer`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-primary hover:bg-red-700 px-3 py-2 rounded-lg text-xs font-bold transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaPlay /> Watch Trailer
                    </a>
                    <Link
                      to={`/Movie-details/${movie.id}`}
                      className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 px-3 py-2 rounded-lg text-xs font-bold transition-all"
                    >
                      <HiEye /> View Details
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
