import { Suspense, useEffect, useState, useRef } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import { ThreeDots } from "react-loader-spinner";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const back = useRef(location?.state ?? "/");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieById(movieId);
        if (data.poster_path) {
          data.poster = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
        }
        setMovie(data);
      } catch (error) {
        setError("Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className={s.loaderContainer}>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  if (error) {
    return <p className={s.error}>{error}</p>;
  }

  if (!movie) {
    return <p>No movie found.</p>;
  }

  return (
    <div className={s.container}>
      <Link className={s.btn} to={back.current}>
        ← Go back
      </Link>

      <div className={s.detailsContainer}>
        <img className={s.imgPoster} src={movie.poster} alt={movie.title} />
        <div className={s.movieInfo}>
          <h2>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <p>User score: {movie.popularity.toFixed(1)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>
            {movie.genres.length > 0
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "No genres available."}
          </p>
        </div>
      </div>

      <hr />
      <p>Additional information</p>
      <div className={s.additionalInfo}>
        <NavLink className={s.linkNav} to="cast">
          Cast
        </NavLink>
        <NavLink className={s.linkNav} to="reviews">
          Reviews
        </NavLink>
      </div>
      <hr />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
