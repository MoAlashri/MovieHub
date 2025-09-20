import React from "react";
import useMovie from "../hooks/useMovie";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const { movies, loading, error } = useMovie("https://api.themoviedb.org/3/movie/popular?api_key=c5b69f7cff083601fb5d9308f3e9b4b1"
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div>
      <h1 className="pl-6 text-2xl font-bolder ">Popular Movie</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} name={movie.title} vote={Number(movie.vote_average).toFixed(1)} src={movie.backdrop_path} movieId ={movie.id} />
        ))}
      </div>
    </div>
  );
}
