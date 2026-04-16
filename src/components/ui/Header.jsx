import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiCameraMovie } from "react-icons/bi";
import { LuTv } from "react-icons/lu";
import { FaRegBookmark, FaSearch, FaTimes, FaFilm } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { HiUser, HiUserAdd } from "react-icons/hi";
import axios from "axios";
import { useWatchlist } from "../../context/WatchlistContext";

const API_KEY = "c5b69f7cff083601fb5d9308f3e9b4b1";

const navLinks = [
  { to: "/Movies", label: "Movies", icon: <BiCameraMovie /> },
  { to: "/TvShow", label: "TV Shows", icon: <LuTv /> },
  { to: "/WatchList", label: "Watchlist", icon: <FaRegBookmark /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Live search with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=1`,
        );
        setSearchResults(data.results?.slice(0, 6) || []);
      } catch (e) {
        console.error(e);
      } finally {
        setSearching(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  function handleResultClick(result) {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    if (result.media_type === "movie" || result.title) {
      navigate(`/media/movie/${result.id}`);
    } else {
      navigate(`/media/tv/${result.id}`);
    }
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "h-[60px] bg-black/90 backdrop-blur-xl shadow-xl shadow-black/50 border-b border-white/5"
          : "h-[72px] bg-black/50 backdrop-blur-md border-b border-white/5"
          }`}
      >
        <div className="h-full max-w-[1600px] mx-auto px-5 flex items-center justify-between gap-4">
          {/* ── Logo ── */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <FaFilm className="text-white text-sm" />
            </div>
            <span
              className={`font-black text-white tracking-tight transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl"
                }`}
            >
              Movie<span className="text-primary">Hub</span>
            </span>
          </NavLink>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 h-full">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive
                    ? "text-white bg-white/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-primary" : ""}>{icon}</span>
                    {label}
                    {/* Watchlist count badge */}
                    {to === "/WatchList" && watchlist.length > 0 && (
                      <span className="ml-0.5 bg-primary text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                        {watchlist.length > 9 ? "9+" : watchlist.length}
                      </span>
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Right Section ── */}
          <div className="flex items-center gap-2">
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Search"
            >
              <FaSearch className="text-sm" />
            </button>

            {/* Auth buttons — Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/Login">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20">
                  <HiUser className="text-base" /> Login
                </button>
              </NavLink>
              <NavLink to="/Register">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold bg-primary hover:bg-red-700 text-white transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-primary/40 hover:scale-105">
                  <HiUserAdd className="text-base" /> Sign Up
                </button>
              </NavLink>
            </div>

            {/* Mobile: search + hamburger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <FaSearch className="text-sm" />
            </button>
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/5 flex flex-col py-4 px-5 gap-1 md:hidden"
            >
              {navLinks.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                      ? "text-white bg-white/10 border border-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`text-lg ${isActive ? "text-primary" : ""}`}>{icon}</span>
                      {label}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                <NavLink
                  to="/Login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1"
                >
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all">
                    <HiUser /> Login
                  </button>
                </NavLink>
                <NavLink
                  to="/Register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1"
                >
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary hover:bg-red-700 text-white text-sm font-bold transition-all">
                    <HiUserAdd /> Sign Up
                  </button>
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Full-Screen Search Overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex flex-col items-center pt-24 px-6"
            onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
          >
            {/* Close button */}
            <button
              onClick={closeSearch}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <FaTimes />
            </button>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="w-full max-w-2xl"
            >
              <p className="text-gray-400 text-sm text-center mb-6 tracking-widest uppercase">
                Search Movies & TV Shows
              </p>

              {/* Search input */}
              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full pl-14 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-xl placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Results */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 bg-gray-900/90 border border-white/10 rounded-2xl overflow-hidden"
                  >
                    {searchResults.map((result, i) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-all text-left ${i < searchResults.length - 1 ? "border-b border-white/5" : ""
                          }`}
                      >
                        {result.poster_path || result.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${result.poster_path || result.profile_path}`}
                            alt={result.title || result.name}
                            className="w-10 h-14 object-cover rounded-lg shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-14 bg-gray-800 rounded-lg flex items-center justify-center text-xl shrink-0">
                            🎬
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">
                            {result.title || result.name}
                          </p>
                          <p className="text-gray-500 text-xs mt-0.5 capitalize">
                            {result.media_type || "movie"} •{" "}
                            {(result.release_date || result.first_air_date || "").split("-")[0]}
                          </p>
                        </div>
                        {result.vote_average > 0 && (
                          <span className="text-yellow-400 text-xs font-bold shrink-0">
                            ⭐ {result.vote_average?.toFixed(1)}
                          </span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
                {searching && (
                  <div className="mt-4 text-center text-gray-500 text-sm py-6">
                    Searching...
                  </div>
                )}
                {!searching && searchQuery && searchResults.length === 0 && (
                  <div className="mt-4 text-center text-gray-500 text-sm py-6">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
