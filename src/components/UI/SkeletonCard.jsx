import React from "react";

export function SkeletonCard({ height = "4200px" }) {
  return (
    <div
      className="animate-pulse rounded-xl overflow-hidden bg-gray-800"
      style={{ height }}
    >
      <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900" />
    </div>
  );
}

export function SkeletonBanner() {
  return (
    <div className="w-full h-[87vh] animate-pulse bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-12 w-80 bg-gray-700 rounded-lg mx-auto" />
        <div className="h-4 w-96 bg-gray-800 rounded mx-auto" />
        <div className="h-4 w-72 bg-gray-800 rounded mx-auto" />
      </div>
    </div>
  );
}

export function SkeletonMovieDetail() {
  return (
    <div className="animate-pulse flex gap-8 p-8 max-w-6xl mx-auto">
      <div className="w-64 h-96 bg-gray-800 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-4 pt-4">
        <div className="h-10 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-1/3" />
        <div className="h-4 bg-gray-800 rounded" />
        <div className="h-4 bg-gray-800 rounded" />
        <div className="h-4 bg-gray-800 rounded w-5/6" />
        <div className="flex gap-3 mt-4">
          <div className="h-8 w-20 bg-gray-700 rounded-full" />
          <div className="h-8 w-20 bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}










