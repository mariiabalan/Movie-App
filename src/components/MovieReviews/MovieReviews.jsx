import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import s from "./MovieReviews.module.css";
import { ThreeDots } from "react-loader-spinner";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviewsMovie, setreviewsMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieReviews(movieId);
        setreviewsMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (reviewsMovie.length === 0) {
    return <p>There are no reviews yet</p>;
  } else {
    return (
      <div>
        <ul className={s.list}>
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
          {error && <p>404</p>}
          {reviewsMovie.map(({ id, author, content }) => {
            if (author) {
              return (
                <li key={id} className={s.item}>
                  <h3>Author: {author}</h3>
                  <p className={s.text}> {content}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
};

export default Reviews;
