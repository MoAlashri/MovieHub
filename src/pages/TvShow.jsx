import { endpoints, TV_GENRES, SORT_OPTIONS } from "../utils/constants";
import MediaGrid from "../components/ui/MediaGrid";

const HERO_BG =
  "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg";

function buildUrl({ sortBy, page, genreId }) {
  const genre = genreId ? `&with_genres=${genreId}` : "";
  return endpoints.tv.discover(
    `&sort_by=${sortBy}&page=${page}${genre}&vote_count.gte=100`,
  );
}

export default function TvShow() {
  return (
    <MediaGrid
      title="📺 TV Shows"
      heroBg={HERO_BG}
      genres={TV_GENRES}
      sortOptions={SORT_OPTIONS.tv}
      buildUrl={buildUrl}
      buildSearchUrl={endpoints.tv.search}
      getLinkTo={(item) => `/media/tv/${item.id}`}
      mediaType="tv"
    />
  );
}