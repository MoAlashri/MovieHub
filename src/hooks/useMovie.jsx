import axios from "axios";
import { useEffect, useState } from "react";

export default function useMovie(URL) {
  const [movies, setMovie] = useState(null); // واحد مش Array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(URL);

        // لو فيه results → يبقى API بيرجع list
        if (data.results) {
          setMovie(data.results);
        } else {
          // غير كده → بيرجع Object واحد (فيلم واحد)
          setMovie(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [URL]);

  return { movies, loading, error };
}
