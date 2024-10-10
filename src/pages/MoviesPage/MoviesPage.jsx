import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearch } from "../../services/api";

import MovieList from "../../components/MovieList/MovieList";
import SearchMovies from "../../components/SearchMovies/SearchMovies";
import { ThreeDots } from "react-loader-spinner";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeQuery = (newQuery) => {
    setSearchParams({ query: newQuery });
  };

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (!searchQuery) return;
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchSearch(searchQuery);
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchQuery]);
  return (
    <div>
      {isLoading && (
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {error && <p>404- Something went wrong</p>}
      <SearchMovies handleChangeQuery={handleChangeQuery} />
      {movies.length > 0 ? <MovieList movies={movies} /> : <p></p>}
    </div>
  );
};
export default MoviesPage;
