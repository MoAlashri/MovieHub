import React from "react";
import HeroSwiper from "../components/movies/HeroSwiper";
import TrendingMovies from "../components/movies/TrendingMovies";
import CinematicSpotlight from "../components/movies/CinematicSpotlight";
import { endpoints } from "../utils/constants";
import MediaSwiper from "../components/movies/MediaSwiper";

export default function Home() {
  return (
    <>
      <HeroSwiper />

      <TrendingMovies />
      {/* Popular Movies */}
      <MediaSwiper
        url={endpoints.movie.popular()}
        title="Popular Movies"
        subtitle="Fan-favorites everyone is talking about"
        linkPrefix="/media/movie"
      />

      {/* Popular TV Shows */}
      <MediaSwiper
        url={endpoints.tv.popular()}
        title="Popular TV Shows"
        subtitle="Stream the most-watched series"
        linkPrefix="/media/tv"
      />

      {/* Popular TV Shows */}
      <MediaSwiper
        url={endpoints.tv.topRated()}
        title="Top Rated Shows"
        subtitle="The highest-rated series of all time"
        linkPrefix="/media/tv"
        limit={25}
      />

      <CinematicSpotlight />

    </>
  );
}
