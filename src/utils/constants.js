//TMDB API
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
export const IMG_URL = "https://image.tmdb.org/t/p";

// Image helpers 
export const getPosterUrl = (path, size = "w500") => path ? `${IMG_URL}/${size}${path}` : null;
export const getBackdropUrl = (path, size = "original") => path ? `${IMG_URL}/${size}${path}` : null;

//Trailer helper 
export const getTrailerUrl = (title) => {
    const q = encodeURIComponent(`${title} official trailer`);
    return `https://www.youtube.com/results?search_query=${q}`;
};

//API endpoint builders 
export const endpoints = {
    movie: {
        popular: () => `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
        trending: () => `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
        topRated: () => `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
        details: (id) => `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
        credits: (id) => `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
        similar: (id) => `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`,
        discover: (params = "") => `${BASE_URL}/discover/movie?api_key=${API_KEY}${params}`,
        search: (query, page = 1) =>
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    },
    tv: {
        popular: () => `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
        topRated: () => `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
        credits: (id) => `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`,
        discover: (params = "") => `${BASE_URL}/discover/tv?api_key=${API_KEY}${params}`,
        search: (query, page = 1) =>
            `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    },
    search: {
        multi: (query) =>
            `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`,
    },
};

//Genre lists 
export const MOVIE_GENRES = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 878, name: "Sci-Fi" },
    { id: 10749, name: "Romance" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 80, name: "Crime" },
    { id: 53, name: "Thriller" },
];

export const TV_GENRES = [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 9648, name: "Mystery" },
    { id: 10768, name: "War & Politics" },
];

export const SORT_OPTIONS = {
    movie: [
        { value: "popularity.desc", label: "Most Popular" },
        { value: "vote_average.desc", label: "Top Rated" },
        { value: "release_date.desc", label: "Newest" },
        { value: "revenue.desc", label: "Box Office" },
    ],
    tv: [
        { value: "popularity.desc", label: "Most Popular" },
        { value: "vote_average.desc", label: "Top Rated" },
        { value: "first_air_date.desc", label: "Newest" },
    ],
};