import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import { motion } from "framer-motion";
import {
  FaStar, FaPlay, FaBookmark, FaGlobe, FaClock,
  FaCalendarAlt, FaArrowLeft, FaHeart,
} from "react-icons/fa";
import { SkeletonMovieDetail } from "../components/UI/SkeletonCard";
import axios from "axios";
import { useWatchlist } from "../context/WatchlistContext";

const API_KEY = "c5b69f7cff083601fb5d9308f3e9b4b1";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { movies: movie, loading, error } = useMovie(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
  );
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  useEffect(() => {
    async function fetchExtras() {
      setLoadingExtra(true);
      try {
        const [castRes, simRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`),
        ]);
        setCast(castRes.data.cast?.slice(0, 8) || []);
        setSimilar(simRes.data.results?.slice(0, 8) || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingExtra(false);
      }
    }
    fetchExtras();
  }, [movieId]);

  if (loading) return <SkeletonMovieDetail />;
  if (error)
    return (
      <div className="text-center py-20 text-red-400">
        Failed to load movie details.
      </div>
    );
  if (!movie)
    return (
      <div className="text-center py-20 text-gray-400">Movie not found.</div>
    );

  const ratingColor =
    movie.vote_average >= 7.5
      ? "text-green-400"
      : movie.vote_average >= 6
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="text-white min-h-screen">
      {/* Hero backdrop */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Back button */}
        <Link
          to="/Movies"
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
        >
          <FaArrowLeft /> Back
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-48 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row gap-10"
        >
          {/* Poster */}
          <div className="shrink-0">
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-[220px] md:w-[280px] rounded-2xl shadow-2xl border border-white/10"
              />
              <div className="absolute -inset-3 rounded-2xl bg-primary/10 blur-2xl -z-10" />
            </div>

            {/* Action buttons under poster */}
            <div className="flex gap-2 mt-4 justify-center">
              <a
                href={`https://www.youtube.com/results?search_query=${movie.title}+official+trailer`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-primary hover:bg-red-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
              >
                <FaPlay /> Trailer
              </a>
              <button
                onClick={() => toggleWatchlist(movie)}
                title={isInWatchlist(movie.id) ? "Remove from Watchlist" : "Save to Watchlist"}
                className={`flex items-center gap-2 border px-3 py-2.5 rounded-xl text-sm transition-all hover:scale-105 ${
                  isInWatchlist(movie?.id)
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
                }`}
              >
                <FaBookmark />
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-2.5 rounded-xl text-sm transition-all hover:scale-105">
                <FaHeart />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 pt-10 md:pt-20">
            {/* Title & tagline */}
            <h1 className="text-4xl md:text-6xl font-black mb-2 leading-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-gray-400 italic text-lg mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-5 text-sm">
              <span className={`flex items-center gap-1.5 font-black text-xl ${ratingColor}`}>
                <FaStar /> {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-gray-400">({movie.vote_count?.toLocaleString()} votes)</span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <FaCalendarAlt className="text-primary" />
                {movie.release_date}
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <FaClock className="text-primary" />
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <FaGlobe className="text-primary" />
                {movie.original_language?.toUpperCase()}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="bg-primary/15 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-bold"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <h3 className="text-lg font-bold text-gray-200 mb-2">Overview</h3>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
              {movie.overview || "No description available."}
            </p>

            {/* Production companies */}
            {movie.production_companies?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Production</h3>
                <div className="flex gap-4 flex-wrap">
                  {movie.production_companies.slice(0, 3).map((c) =>
                    c.logo_path ? (
                      <div key={c.id} className="bg-white rounded-lg px-4 py-2">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${c.logo_path}`}
                          alt={c.name}
                          className="h-8 object-contain"
                        />
                      </div>
                    ) : (
                      <span key={c.id} className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-300">
                        {c.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Homepage */}
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              >
                <FaGlobe className="text-primary" /> Official Website
              </a>
            )}
          </div>
        </motion.div>

        {/* Cast */}
        {!loadingExtra && cast.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-1 h-7 bg-primary rounded-full" />
              Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center group">
                  <div className="relative overflow-hidden rounded-xl mb-2">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-28 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-28 bg-gray-800 flex items-center justify-center text-3xl">
                        🎭
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold text-white leading-tight line-clamp-1">
                    {actor.name}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">{actor.character}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Similar Movies */}
        {!loadingExtra && similar.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 mb-16"
          >
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-1 h-7 bg-primary rounded-full" />
              Similar Movies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {similar.map((m) => (
                <Link
                  key={m.id}
                  to={`/Movie-details/${m.id}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-2 hover:ring-2 hover:ring-primary/50 transition-all">
                    {m.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${m.poster_path}`}
                        alt={m.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-800 flex items-center justify-center text-3xl">
                        🎬
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 flex items-center gap-0.5 bg-black/70 text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      <FaStar className="text-[8px]" /> {m.vote_average?.toFixed(1)}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-300 line-clamp-1">
                    {m.title}
                  </p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
