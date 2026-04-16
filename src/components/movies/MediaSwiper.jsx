import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { FaPlay, FaStar } from "react-icons/fa";
import { HiEye } from "react-icons/hi2";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import useMovie from "../../hooks/useMovie";
import SectionHeader from "../ui/SectionHeader";
import { SkeletonBanner } from "../ui/SkeletonCard";
import { getPosterUrl, getBackdropUrl, getTrailerUrl } from "../../utils/constants";



export default function MediaSwiper({
    url,
    title,
    subtitle,
    linkPrefix = "/media/movie",
    accentColor = "primary",
    autoDelay = 4500,
    limit = 10,
}) {
    const { movies: items, loading, error } = useMovie(url);

    if (loading)
        return (
            <section>
                <SectionHeader title={title} subtitle={subtitle} />
                <SkeletonBanner />
            </section>
        );
    if (error) return null;

    const slides = items?.slice(0, limit) ?? [];

    return (
        <section className="relative w-full text-white pb-8">
            <SectionHeader title={title} subtitle={subtitle} />

            <div className="relative h-[540px]">
                <Swiper
                    modules={[Autoplay, EffectFade, Navigation]}
                    effect="fade"
                    autoplay={{ delay: autoDelay, disableOnInteraction: false }}
                    navigation
                    loop
                    className="h-full"
                >
                    {slides.map((item) => {
                        const itemTitle = item.title || item.name;
                        const detailLink = `${linkPrefix}/${item.id}`;

                        return (
                            <SwiperSlide key={item.id}>
                                {/* Background */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `url(${getBackdropUrl(item.backdrop_path)})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex items-center px-8 md:px-20">
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="flex flex-col md:flex-row items-center md:items-start gap-10 w-full max-w-5xl"
                                    >
                                        {/* Poster */}
                                        <motion.div
                                            className="relative shrink-0"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            <img
                                                src={getPosterUrl(item.poster_path)}
                                                alt={itemTitle}
                                                className="w-[180px] md:w-[240px] rounded-2xl shadow-2xl"
                                            />
                                        </motion.div>

                                        {/* Info */}
                                        <div className="flex flex-col justify-center max-w-xl">
                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                                                    <FaStar className="text-xs" />
                                                    {item.vote_average?.toFixed(1)}
                                                </span>
                                                <span className="text-gray-500 text-xs">
                                                    ({item.vote_count?.toLocaleString()} votes)
                                                </span>
                                            </div>

                                            <h2 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
                                                {itemTitle}
                                            </h2>

                                            <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {item.overview || "No description available."}
                                            </p>

                                            {/* CTAs */}
                                            <div className="flex gap-4 flex-wrap">
                                                <a
                                                    href={getTrailerUrl(itemTitle)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`flex items-center gap-2 bg-${accentColor} hover:opacity-90
                                      px-6 py-3 rounded-full text-sm font-bold
                                      transition-all duration-300 hover:scale-105`}
                                                >
                                                    <FaPlay /> Watch Trailer
                                                </a>
                                                <Link
                                                    to={detailLink}
                                                    className="flex items-center gap-2 border border-white/30
                                     hover:bg-white/10 backdrop-blur-sm px-6 py-3
                                     rounded-full text-sm font-bold transition-all hover:scale-105"
                                                >
                                                    <HiEye /> View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}