import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaPlay, FaCalendarAlt, FaSearch, FaFilter } from "react-icons/fa";
import { HiEye } from "react-icons/hi2";
import axios from "axios";

const API_KEY = "c5b69f7cff083601fb5d9308f3e9b4b1";

const GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 9648, name: "Mystery" },
  { id: 10768, name: "War & Politics" },
];

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "first_air_date.desc", label: "Newest" },
];

export default function TvShow() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchShows() {
      setLoading(true);
      try {
        let url;
        if (search) {
          url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(search)}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=${sortBy}&page=${page}${selectedGenre ? `&with_genres=${selectedGenre}` : ""}&vote_count.gte=100`;
        }
        const { data } = await axios.get(url);
        setShows(data.results || []);
        setTotalPages(Math.min(data.total_pages, 20));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchShows();
  }, [page, selectedGenre, sortBy, search]);

  function handleSearch(e) {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  }

  function handleGenre(id) {
    setSelectedGenre(selectedGenre === id ? null : id);
    setSearch("");
    setSearchInput("");
    setPage(1);
  }

  function handleSort(val) {
    setSortBy(val);
    setPage(1);
  }

  return (
    <div className="min-h-screen text-white pb-20">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://image.tmdb.org/t/p/original/yyjerNXGVfzfMmDJ9MN8Mklb5u0.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-gray-900" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-3"
          >
            📺 TV Shows
          </motion.h1>
          <p className="text-gray-300 text-lg">
            Binge-worthy series from around the world
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search TV shows..."
              className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/60 focus:bg-white/10 transition-all text-white placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-105"
          >
            Search
          </button>
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }}
              className="bg-white/10 hover:bg-white/20 px-4 py-3.5 rounded-xl font-bold transition-all"
            >
              Clear
            </button>
          )}
        </form>

        {/* Genres + Sort */}
        {!search && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGenre(g.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedGenre === g.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-blue-500/40"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-2 text-gray-400 text-sm">
                <FaFilter /> Sort:
              </span>
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleSort(s.value)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    sortBy === s.value
                      ? "bg-white/20 text-white border border-white/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TV Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array(20).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl overflow-hidden bg-gray-800 h-72" />
            ))}
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📺</p>
            <p className="text-xl font-semibold">No shows found</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${selectedGenre}-${sortBy}-${search}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            >
              {shows.map((show) => (
                <motion.div
                  key={show.id}
                  className="relative group rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-black/50"
                  whileHover={{ y: -4 }}
                >
                  {show.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-72 bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}

                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/75 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-lg">
                    <FaStar className="text-[10px]" /> {show.vote_average?.toFixed(1)}
                  </div>

                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-600/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    TV
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-3">
                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">
                      {show.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                      <FaCalendarAlt className="text-[10px]" /> {show.first_air_date?.split("-")[0]}
                    </p>
                    <a
                      href={`https://www.youtube.com/results?search_query=${show.name}+tv+show+trailer`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 py-1.5 rounded-lg text-xs font-bold transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaPlay className="text-[10px]" /> Trailer
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!loading && shows.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm transition-all"
            >
              ← Prev
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                    p === page
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white/5 hover:bg-white/15 text-gray-300"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
