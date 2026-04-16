import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import useMovie from "../../hooks/useMovie";
import SectionHeader from "../ui/SectionHeader";
import { SkeletonCard } from "../ui/SkeletonCard";
import MediaCard from "../ui/MediaCard";
import { endpoints } from "../../utils/constants";

const BREAKPOINTS = {
  320: { slidesPerView: 1.2 },
  480: { slidesPerView: 2.2 },
  768: { slidesPerView: 3.2 },
  1024: { slidesPerView: 4.2 },
  1280: { slidesPerView: 5.2 },
};

export default function TrendingMovies() {
  const { movies, loading, error } = useMovie(endpoints.movie.trending());

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
    <section className="pb-8 mt-5">
      <SectionHeader title="Trending This Week" subtitle="Most watched movies right now" />

      <div className="px-6 md:px-10">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          loop
          freeMode
          autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={BREAKPOINTS}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MediaCard
                item={movie}
                linkTo={`/media/movie/${movie.id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}