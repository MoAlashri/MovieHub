import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import useMovie from "../hooks/useMovie";

export default function LandingSwiper() {
  const { movies, loading, error } = useMovie(
    `https://api.themoviedb.org/3/movie/popular?api_key=c5b69f7cff083601fb5d9308f3e9b4b1`
  );

  if (loading)
    return <p className="text-white text-center mt-10 text-lg">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10">Error loading movies.</p>;

  const slides = movies.slice(0,5 ) ;

  return (
    <div className="w-full h-[87vh]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {movie.title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl opacity-90">
                  {movie.overview?.slice(0, 150)}...
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
