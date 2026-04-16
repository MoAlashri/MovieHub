import { motion } from "framer-motion";
import { FaBookmark, FaPlay, FaStar } from "react-icons/fa";
import { HiEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { getPosterUrl, getTrailerUrl } from "../../utils/constants";
import { useWatchlist } from "../../context/WatchlistContext";


export default function MediaCard({ item, linkTo, showBookmark = true }) {
    const { isInWatchlist, toggleWatchlist } = useWatchlist();
    const title = item.title || item.name;
    const poster = getPosterUrl(item.poster_path);
    const rating = item.vote_average?.toFixed(1);
    const inList = isInWatchlist(item.id);

    return (
        <motion.div
            className="relative group rounded-xl overflow-hidden cursor-pointer
                 hover:ring-2 hover:ring-primary/50 transition-all duration-300
                 shadow-md hover:shadow-xl hover:shadow-black/50"
            whileHover={{ y: -4 }}
        >
            {/* Poster */}
            {poster ? (
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-[280px] md:h-[320px] object-cover
                     group-hover:scale-110 transition-transform duration-700"
                />
            ) : (
                <div className="w-full h-[280px] md:h-[320px] bg-gray-800
                        flex items-center justify-center text-gray-500 text-sm">
                    No Image
                </div>
            )}

            {/* Rating badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1
                      bg-black/75 backdrop-blur-sm text-yellow-400
                      text-xs font-bold px-2 py-0.5 rounded-lg">
                <FaStar className="text-[10px]" /> {rating}
            </div>

            {/* Bookmark button */}
            {showBookmark && (
                <button
                    onClick={(e) => { e.stopPropagation(); toggleWatchlist(item); }}
                    title={inList ? "Remove from Watchlist" : "Add to Watchlist"}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-all text-xs
            ${inList
                            ? "bg-primary text-white shadow-md shadow-primary/40"
                            : "bg-black/60 text-white hover:bg-primary"
                        }`}
                >
                    <FaBookmark />
                </button>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      flex flex-col justify-end p-3">
                <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{title}</h3>
                <div className="flex flex-col gap-1.5">
                    <a
                        href={getTrailerUrl(title)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1
                       bg-primary hover:bg-red-700 py-1.5 rounded-lg
                       text-xs font-bold transition-all"
                    >
                        <FaPlay className="text-[10px]" /> Trailer
                    </a>
                    <Link
                        to={linkTo}
                        className="flex items-center justify-center gap-1
                       bg-white/15 hover:bg-white/25 border border-white/20
                       py-1.5 rounded-lg text-xs font-bold transition-all"
                    >
                        <HiEye /> Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}