import React from "react";

import Landing from "../components/Landing";
import TrendingMovies from "../components/TrendingMovies";
import PopularMovies from "../components/PopularMovies";
import PopularTVShows from "../components/PopularTVShows";
import TopRatedTVShows from "../components/TopRatedTVShows";
// import EndHero from "../components/EndHero";
import CreditsOutro from "../components/CinematicSpotlight";

export default function Home() {
  return (
    <>
      <Landing />
      <TrendingMovies />
      <PopularMovies />
      <PopularTVShows />
      <TopRatedTVShows />
      {/* <EndHero /> */}
      <CreditsOutro />
    </>
  );
}
