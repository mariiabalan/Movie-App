import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovie } from "../../services/api";
import { ThreeDots } from "react-loader-spinner";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovie();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllMovies();
  }, []);

  return (
    <div>
      <h2 className={s.title}>Trending Today</h2>
      {isLoading && (
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass={s.loader}
        />
      )}
      {error && <p className={s.error}>{error}</p>}
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        !isLoading && <p className={s.noMovies}>No movies found.</p>
      )}
    </div>
  );
};

export default HomePage;
