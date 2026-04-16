import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaSearch } from "react-icons/fa";
import axios from "axios";
import MediaCard from "./MediaCard";
export default function MediaGrid({
    title,
    heroBg,
    genres,
    sortOptions,
    buildUrl,
    buildSearchUrl,
    getLinkTo,
    mediaType = "movie",
}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [sortBy, setSortBy] = useState(sortOptions[0].value);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        let cancelled = false;
        async function fetch() {
            setLoading(true);
            try {
                const url = search
                    ? buildSearchUrl(search, page)
                    : buildUrl({ sortBy, page, genreId: selectedGenre });
                const { data } = await axios.get(url);
                if (!cancelled) {
                    setItems(data.results || []);
                    setTotalPages(Math.min(data.total_pages, 20));
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetch();
        return () => { cancelled = true; };
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
            {/* Hero banner */}
            <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-gray-900" />
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-3"
                    >
                        {title}
                    </motion.h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder={`Search ${title.toLowerCase()}...`}
                            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl
                         focus:outline-none focus:border-primary/60 focus:bg-white/10
                         transition-all text-white placeholder-gray-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary hover:bg-red-700 px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-105"
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
                            {genres.map((g) => (
                                <button
                                    key={g.id}
                                    onClick={() => handleGenre(g.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    ${selectedGenre === g.id
                                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                                            : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary/40"
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
                            {sortOptions.map((s) => (
                                <button
                                    key={s.value}
                                    onClick={() => handleSort(s.value)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                    ${sortBy === s.value
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

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {Array(20).fill(0).map((_, i) => (
                            <div key={i} className="animate-pulse rounded-xl bg-gray-800 h-72" />
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-5xl mb-4">🎭</p>
                        <p className="text-xl font-semibold">No results found</p>
                        <p className="text-sm mt-2">Try adjusting your search or filters</p>
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
                            {items.map((item) => (
                                <MediaCard
                                    key={item.id}
                                    item={item}
                                    linkTo={getLinkTo(item)}
                                    mediaType={mediaType}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Pagination */}
                {!loading && items.length > 0 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20
                         disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm transition-all"
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
                                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all
                    ${p === page
                                            ? "bg-primary text-white shadow-lg shadow-primary/30"
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
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20
                         disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm transition-all"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}