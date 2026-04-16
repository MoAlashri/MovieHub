import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft, FaBookmark, FaCalendarAlt,
  FaClock, FaGlobe, FaPlay, FaStar, FaTv,
} from "react-icons/fa";
import axios from "axios";

import useMovie from "../hooks/useMovie";
import { useWatchlist } from "../context/WatchlistContext";
import { SkeletonMovieDetail } from "../components/ui/SkeletonCard";
import { endpoints, BASE_URL, API_KEY, getBackdropUrl, getPosterUrl, getTrailerUrl } from "../utils/constants";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ratingColor(v) {
  if (v >= 7.5) return "text-green-400";
  if (v >= 6)   return "text-yellow-400";
  return "text-red-400";
}

function runtime(mins) {
  if (!mins) return "—";
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionTitle({ children, accent = "bg-primary" }) {
  return (
    <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
      <span className={`w-1 h-7 ${accent} rounded-full`} />
      {children}
    </h2>
  );
}

function CastGrid({ cast, accent }) {
  return (
    <section className="mt-16">
      <SectionTitle accent={accent}>Cast</SectionTitle>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
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
                <div className="w-full h-28 bg-gray-800 flex items-center justify-center text-3xl">🎭</div>
              )}
            </div>
            <p className="text-xs font-bold text-white line-clamp-1">{actor.name}</p>
            <p className="text-xs text-gray-500 line-clamp-1">{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SimilarGrid({ items, type, accent }) {
  const isTV = type === "tv";
  return (
    <section className="mt-16 mb-16">
      <SectionTitle accent={accent}>Similar {isTV ? "Shows" : "Movies"}</SectionTitle>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {items.map((item) => {
          const title = item.title || item.name;
          const link  = isTV ? `/media/tv/${item.id}` : `/media/movie/${item.id}`;
          return (
            <Link key={item.id} to={link} className="group">
              <div className={`relative overflow-hidden rounded-xl mb-2 hover:ring-2 ${isTV ? "hover:ring-blue-500/50" : "hover:ring-primary/50"} transition-all`}>
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    alt={title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-800 flex items-center justify-center text-3xl">
                    {isTV ? "📺" : "🎬"}
                  </div>
                )}
                <div className="absolute bottom-1 left-1 flex items-center gap-0.5 bg-black/70 text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  <FaStar className="text-[8px]" /> {item.vote_average?.toFixed(1)}
                </div>
              </div>
              <p className="text-xs font-bold text-gray-300 line-clamp-1">{title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ErrorState({ type }) {
  const isTV = type === "tv";
  return (
    <div className="text-center py-20 text-gray-400">
      <p className="text-4xl mb-4">😕</p>
      <p className="text-lg">Failed to load {isTV ? "show" : "movie"} details.</p>
      <Link
        to={isTV ? "/TvShow" : "/Movies"}
        className={`mt-4 inline-block hover:underline ${isTV ? "text-blue-400" : "text-primary"}`}
      >
        ← Back to {isTV ? "TV Shows" : "Movies"}
      </Link>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MediaDetails() {
  // Support both new route (/media/:type/:id) and legacy routes
  // (/Movie-details/:movieId  and  /Tv-details/:showId)
  const params = useParams();
  const type = params.type ?? (params.movieId ? "movie" : "tv");
  const id   = params.id   ?? params.movieId ?? params.showId;
  const isTV = type === "tv";

  // Accent colours that change based on media type
  const accentClass   = isTV ? "bg-blue-500"  : "bg-primary";
  const accentText    = isTV ? "text-blue-400" : "text-primary";
  const accentBtn     = isTV ? "bg-blue-600 hover:bg-blue-700"      : "bg-primary hover:bg-red-700";
  const accentBookmark = isTV ? "bg-blue-600 border-blue-600 shadow-blue-500/30" : "bg-primary border-primary shadow-primary/30";
  const accentGlow    = isTV ? "bg-blue-500/10" : "bg-primary/10";

  // Fetch details
  const detailsUrl = isTV
    ? `${BASE_URL}/tv/${id}?api_key=${API_KEY}`
    : endpoints.movie.details(id);

  const { movies: media, loading, error } = useMovie(detailsUrl);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const [cast, setCast]               = useState([]);
  const [similar, setSimilar]         = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchExtras() {
      setLoadingExtra(true);
      try {
        const creditsUrl = isTV
          ? endpoints.tv.credits(id)
          : endpoints.movie.credits(id);
        const similarUrl = isTV
          ? `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`
          : endpoints.movie.similar(id);

        const [castRes, simRes] = await Promise.all([
          axios.get(creditsUrl),
          axios.get(similarUrl),
        ]);
        if (!cancelled) {
          setCast(castRes.data.cast?.slice(0, 8) ?? []);
          setSimilar(simRes.data.results?.slice(0, 8) ?? []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoadingExtra(false);
      }
    }
    fetchExtras();
    return () => { cancelled = true; };
  }, [id, isTV]);

  if (loading) return <SkeletonMovieDetail />;
  if (error)   return <ErrorState type={type} />;
  if (!media)  return <ErrorState type={type} />;

  const title  = isTV ? media.name  : media.title;
  const inList = isInWatchlist(media.id);

  return (
    <div className="text-white min-h-screen">
      {/* Backdrop */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <img
          src={getBackdropUrl(media.backdrop_path)}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        <Link
          to={isTV ? "/TvShow" : "/Movies"}
          className="absolute top-6 left-6 flex items-center gap-2 bg-black/50
                     backdrop-blur-sm hover:bg-black/70 text-white px-4 py-2
                     rounded-full text-sm font-medium transition-all"
        >
          <FaArrowLeft /> Back to {isTV ? "TV Shows" : "Movies"}
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-48 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row gap-10"
        >
          {/* Poster + actions */}
          <div className="shrink-0">
            <div className="relative">
              <img
                src={getPosterUrl(media.poster_path)}
                alt={title}
                className="w-[220px] md:w-[280px] rounded-2xl shadow-2xl border border-white/10"
              />
              <div className={`absolute -inset-3 rounded-2xl ${accentGlow} blur-2xl -z-10`} />
            </div>

            <div className="flex gap-2 mt-4 justify-center">
              <a
                href={getTrailerUrl(title)}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 ${accentBtn} px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105`}
              >
                <FaPlay /> Trailer
              </a>
              <button
                onClick={() => toggleWatchlist({ ...media, mediaType: type })}
                title={inList ? "Remove from Watchlist" : "Save to Watchlist"}
                className={`flex items-center gap-2 border px-3 py-2.5 rounded-xl text-sm transition-all hover:scale-105
                  ${inList
                    ? `${accentBookmark} text-white shadow-lg`
                    : "bg-white/10 hover:bg-white/20 border-white/10 text-white"
                  }`}
              >
                <FaBookmark />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-10 md:pt-20">
            {/* TV badge */}
            {isTV && (
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                  <FaTv /> TV Series
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-black mb-2 leading-tight">{title}</h1>

            {media.tagline && (
              <p className="text-gray-400 italic text-lg mb-4">"{media.tagline}"</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-5 text-sm">
              <span className={`flex items-center gap-1.5 font-black text-xl ${ratingColor(media.vote_average)}`}>
                <FaStar /> {media.vote_average?.toFixed(1)}
              </span>
              <span className="text-gray-400">({media.vote_count?.toLocaleString()} votes)</span>

              {/* Release date / first air date */}
              <span className={`flex items-center gap-1.5 text-gray-400`}>
                <FaCalendarAlt className={accentText} />
                {isTV ? media.first_air_date : media.release_date}
              </span>

              {/* Movie-only: runtime */}
              {!isTV && media.runtime && (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaClock className={accentText} /> {runtime(media.runtime)}
                </span>
              )}

              {/* Movie-only: language */}
              {!isTV && (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaGlobe className={accentText} /> {media.original_language?.toUpperCase()}
                </span>
              )}

              {/* TV-only: seasons & episodes */}
              {isTV && media.number_of_seasons && (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaTv className={accentText} />
                  {media.number_of_seasons} Season{media.number_of_seasons > 1 ? "s" : ""}
                </span>
              )}
              {isTV && media.number_of_episodes && (
                <span className="text-gray-400">{media.number_of_episodes} Episodes</span>
              )}

              {/* TV-only: origin country */}
              {isTV && media.origin_country?.[0] && (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <FaGlobe className={accentText} /> {media.origin_country[0]}
                </span>
              )}
            </div>

            {/* TV-only: status badge */}
            {isTV && media.status && (
              <div className="flex items-center gap-2 mb-5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold
                  ${media.status === "Returning Series"
                    ? "bg-green-500/20 border border-green-500/40 text-green-400"
                    : "bg-gray-500/20 border border-gray-500/40 text-gray-400"
                  }`}>
                  {media.status}
                </span>
              </div>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {media.genres?.map((g) => (
                <span
                  key={g.id}
                  className={`${isTV
                    ? "bg-blue-600/15 border border-blue-500/30 text-blue-400"
                    : "bg-primary/15 border border-primary/30 text-primary"
                  } px-3 py-1 rounded-full text-xs font-bold`}
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <h3 className="text-lg font-bold text-gray-200 mb-2">Overview</h3>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
              {media.overview || "No description available."}
            </p>

            {/* Movie-only: production companies */}
            {!isTV && media.production_companies?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Production</h3>
                <div className="flex gap-4 flex-wrap">
                  {media.production_companies.slice(0, 3).map((c) =>
                    c.logo_path ? (
                      <div key={c.id} className="bg-white rounded-lg px-4 py-2">
                        <img src={`https://image.tmdb.org/t/p/w200${c.logo_path}`} alt={c.name} className="h-8 object-contain" />
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

            {/* TV-only: networks */}
            {isTV && media.networks?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Networks</h3>
                <div className="flex gap-4 flex-wrap">
                  {media.networks.slice(0, 4).map((n) =>
                    n.logo_path ? (
                      <div key={n.id} className="bg-white rounded-lg px-4 py-2">
                        <img src={`https://image.tmdb.org/t/p/w200${n.logo_path}`} alt={n.name} className="h-7 object-contain" />
                      </div>
                    ) : (
                      <span key={n.id} className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-300">
                        {n.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* TV-only: seasons quick info */}
            {isTV && media.seasons?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Seasons</h3>
                <div className="flex flex-wrap gap-2">
                  {media.seasons
                    .filter((s) => s.season_number > 0)
                    .map((s) => (
                      <div key={s.id} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                        <span className="text-xs font-bold text-white">S{s.season_number}</span>
                        <span className="text-xs text-gray-400">{s.episode_count} eps</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {media.homepage && (
              <a
                href={media.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              >
                <FaGlobe className={accentText} /> Official Website
              </a>
            )}
          </div>
        </motion.div>

        {/* Cast */}
        {!loadingExtra && cast.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <CastGrid cast={cast} accent={accentClass} />
          </motion.div>
        )}

        {/* Similar */}
        {!loadingExtra && similar.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <SimilarGrid items={similar} type={type} accent={accentClass} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
