import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("moviehub-watchlist") || "[]");
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem("moviehub-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = useCallback(
    (id) => watchlist.some((item) => item.id === id),
    [watchlist],
  );

  const addToWatchlist = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFromWatchlist = useCallback((id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toggleWatchlist = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  }, []);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
}
