import React from "react";
import MovieList from "../components/MovieList";
import Pagination from "../components/UI/Pagination";
import Landing from "../components/Landing";

export default function Home() {
  return (
    <>
    <Landing/>
    <MovieList />
    <Pagination />
    </>
  );
}
