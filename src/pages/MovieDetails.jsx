import React from "react";
import { useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import { CiHeart } from "react-icons/ci";
import { Rating } from "@mui/material";
import { IoMdLink } from "react-icons/io";

export default function MovieDetails() {
  const { movieId } = useParams();

  const {
    movies: movie,
    loading,
    error,
  } = useMovie(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=c5b69f7cff083601fb5d9308f3e9b4b1`,
  );

  if (loading) return <h2 className="text-center text-xl">Loading...</h2>;
  if (error)
    return (
      <h2 className="text-center text-xl text-red-500">
        Error: {error.message}
      </h2>
    );
  if (!movie)
    return <h2 className="text-center text-xl">No movie data found</h2>;

  return (
    <>
    <div className="flex gap-4 p-6 max-w-[1000px] m-auto">
      <div className="w-1/4">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="bg-gray-100 p-5 rounded-lg w-3/4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>

        <div className="flex items-center justify-between pr-14 gap-3 mt-1 text-gray-600 text-xs">
          <span>{movie.release_date}</span>
          <span className="pr-4 text-3xl text-yellow-600">
            <CiHeart />
          </span>
        </div>

        <div className="flex items-center gap-3 my-4">
          <Rating
            name="read-only"
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            sx={{
              color: "black",
              "& .MuiRating-iconEmpty": {
                color: "rgba(0,0,0,0.6)",
              },
            }}
          />
          <span className="text-gray-700 font-bold font-mono">
            {movie.vote_count}
          </span>
        </div>

        <p className="text-lg font-semibold font-sans">{movie.overview}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          {movie.genres.map((g) => (
            <span
              key={g.id}
              className="bg-yellow-400 text-white font-bold px-3 py-1 rounded-full text-sm"
            >
              {g.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-20 mt-4 text-gray-600">
          <span>
            Duration:{" "}
            {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
          </span>
          <span>Language: {movie.original_language?.toUpperCase()}</span>
        </div>

        <div className="mt-5">
          {movie.production_companies?.length > 0 &&
            movie.production_companies[0].logo_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${movie.production_companies[0].logo_path}`}
                alt={movie.production_companies[0].name}
                className="w-40 h-20 object-contain mb-5"
              />
            )}

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl bg-gray-300 p-2 font-bold inline-flex items-center gap-2 hover:bg-slate-400 transition duration-300"
            >
              Website <IoMdLink className="font-bold text-lg" />
            </a>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
