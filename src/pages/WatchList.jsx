import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookmark, FaStar, FaTrash, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

export default function WatchList() {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();

  function clearAll() {
    clearWatchlist();
  }

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Hero */}
      <div className="relative h-56 md:h-72 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black" />
        {/* Decorative orbs */}
        <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-20 w-60 h-60 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaBookmark className="text-5xl text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black mb-2">My Watchlist</h1>
            <p className="text-gray-400 text-base">
              {watchlist.length > 0
                ? `${watchlist.length} title${watchlist.length === 1 ? "" : "s"} saved`
                : "Your personal movie collection"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {watchlist.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <FaBookmark className="text-5xl text-gray-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-300 mb-3">
              Nothing saved yet
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-md">
              Browse movies and TV shows and click the bookmark icon to add them to your watchlist.
            </p>
            <div className="flex gap-4">
              <Link
                to="/Movies"
                className="flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                🎬 Browse Movies
              </Link>
              <Link
                to="/TvShow"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
              >
                📺 Browse TV Shows
              </Link>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-3xl">
              {[
                { icon: "🔖", title: "Save Titles", desc: "Bookmark any movie or show to your personal list" },
                { icon: "⚡", title: "Quick Access", desc: "Find all your saved titles in one place" },
                { icon: "🎯", title: "Never Miss Out", desc: "Keep track of what you want to watch next" },
              ].map((f, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Watchlist Grid */
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-300">
                {watchlist.length} Saved Title{watchlist.length !== 1 ? "s" : ""}
              </h2>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium border border-red-500/20 hover:border-red-500/40 px-4 py-2 rounded-lg transition-all"
              >
                <FaTrash /> Clear All
              </button>
            </div>

            <AnimatePresence>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {watchlist.map((movie) => (
                  <motion.div
                    key={movie.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-300"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/75 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-lg">
                      <FaStar className="text-[10px]" /> {movie.vote_average?.toFixed(1)}
                    </div>

                    <button
                      onClick={() => removeFromWatchlist(movie.id)}
                      className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-full transition-all text-sm cursor-pointer z-50"
                    >
                      <FaTrash />
                    </button>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-3">
                      <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{movie.title || movie.name}</h3>
                      <div className="flex flex-col gap-1.5">
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title || movie.name)}+trailer`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1 bg-primary hover:bg-red-700 py-1.5 rounded-lg text-xs font-bold transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaPlay className="text-[10px]" /> Trailer
                        </a>
                        <Link
                          to={`/media/${movie.mediaType ?? (movie.title ? "movie" : "tv")}/${movie.id}`}
                          className="flex items-center justify-center gap-1 bg-white/15 hover:bg-white/25 border border-white/20 py-1.5 rounded-lg text-xs font-bold transition-all"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
