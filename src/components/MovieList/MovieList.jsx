import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css"; // Імпортуємо стилі

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <ul className={s.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={s.movieItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={s.movieLink}
            >
              <p className={s.movieTitle}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
