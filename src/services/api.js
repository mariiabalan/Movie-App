import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2FkNDIzMmEzNjQwODM4OWExMDI0ZTVmMGI1ZTZhZiIsIm5iZiI6MTcyODMwOTA2OS42MzE4OTMsInN1YiI6IjY3MDJlNWRkOTI1ZmRmOTI1YjdkNTQ4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R6LFhDLC4lq8FeF55KTKNU8GCjbspS0iHkgCOqn3MLI",
  },
};

export const fetchMovie = async () => {
  const response = await axios.get("trending/movie/day", options);
  return response.data;
};

export const fetchMovieById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data.results;
};

export const fetchSearch = async (query) => {
  const response = await axios.get(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};
