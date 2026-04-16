import { endpoints, MOVIE_GENRES, SORT_OPTIONS } from "../utils/constants";
import MediaGrid from "../components/ui/MediaGrid";

const HERO_BG =
  "https://image.tmdb.org/t/p/original/u8DU5fkLoM5tTRukzPC31oGPxaQ.jpg";

function buildUrl({ sortBy, page, genreId }) {
  const genre = genreId ? `&with_genres=${genreId}` : "";
  return endpoints.movie.discover(`&sort_by=${sortBy}&page=${page}${genre}`);
}

export default function Movies() {
  return (
    <MediaGrid
      title="🎬 Movies"
      heroBg={HERO_BG}
      genres={MOVIE_GENRES}
      sortOptions={SORT_OPTIONS.movie}
      buildUrl={buildUrl}
      buildSearchUrl={endpoints.movie.search}
      getLinkTo={(item) => `/media/movie/${item.id}`}
      mediaType="movie"
    />
  );
}