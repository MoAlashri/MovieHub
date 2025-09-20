import React from "react";
import MovieList from "../components/MovieList";
import Pagination from "../components/UI/Pagination";

export default function Home() {
  return (
    <div>
      <div className="p-6 m-8 mt-0 bg-gray-200 rounded">
        <h1 className="mb-3 text-2xl font-bold ">Welcome to our Movie App</h1>
        <p className="mb-3 text-sm text-gray-400">
          Lorem ipsum dolor ss aliquid maiores doloribus magnam accusant
          incidunt ea tempore aut.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            className="p-2 w-[80%] rounded  outline-none focus:ring-4 ring-blue-300 transition-all placeholder-gray-800  "
            placeholder="Search Here .... "
          />
          <button className="px-4 py-2 font-semibold text-white transition-all bg-blue-500 rounded hover:bg-blue-600 ">
            Search
          </button>
        </div>
      </div>
      <MovieList />
      <Pagination />
    </div>
  );
}
