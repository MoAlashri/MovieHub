import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function LandingSwiper() {
  const slides = [
    {
      title: "La La Land",
      description:
        "A dazzling blend of dreams, love, and music — where every note tells a story.",
      image: "/public/images//land.jpg",
    },
    {
      title: "Game of Thrones",
      description:
        "A world where honor meets betrayal — and thrones are won by fire and blood.",
      image: "/public/images/GOT2.jpg",
    },
    {
      title: "Interstellar",
      description:
        "Beyond time and space lies a story of love that transcends the stars.",
      image: "/public/images/Interstaller.jpg",
    },
    {
      title: "Breaking Bad",
      description:
        "A descent into power, choices, and consequences — chemistry has never been so dangerous.",
      image: "/public/images/Bb1.jpg",
    },
  ];

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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fadeInUp">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl opacity-90 animate-fadeIn">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
