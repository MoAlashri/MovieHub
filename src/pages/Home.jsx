import React from "react";

import HeroSwiper from "../components/movies/HeroSwiper";
import TrendingMovies from "../components/movies/TrendingMovies";
import PopularMovies from "../components/movies/PopularMovies";
import PopularTVShows from "../components/movies/PopularTVShows";
import TopRatedTVShows from "../components/movies/TopRatedTVShows";
import CinematicSpotlight from "../components/movies/CinematicSpotlight";

export default function Home() {
  return (
    <>
      <HeroSwiper />
      <TrendingMovies />
      <PopularMovies />
      <PopularTVShows />
      <TopRatedTVShows />
      <CinematicSpotlight />
    </>
  );
}
