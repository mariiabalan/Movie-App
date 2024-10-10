import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import { ThreeDots } from "react-loader-spinner";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [castMovie, setCastMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieCast(movieId);
        setCastMovie(data);
      } catch {
        setError("Failed to load cast information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  const baseUrl = "https://image.tmdb.org/t/p/w500/";

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

  if (castMovie.length === 0) {
    return <p className={s.noInfo}>There is no information about the cast.</p>;
  }

  return (
    <ul className={s.list}>
      {castMovie.map(({ id, name, profile_path, character }) => (
        <li key={id} className={s.item}>
          {profile_path ? (
            <img src={baseUrl + profile_path} alt={name} className={s.photo} />
          ) : (
            <div className={s.placeholder}>No Image Available</div>
          )}
          <p className={s.actorName}>{name}</p>
          <p className={s.character}>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
