import axios from 'axios';

const key = '7ab96e660683d86731a9837125121184';

//https://api.themoviedb.org/3/movie/615457/reviews?api_key=7ab96e660683d86731a9837125121184

const fetchTrending = async () => {
  return await axios
    .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
    .then(response => response.data.results);
};

const fetchDetails = async filmID => {
  return await axios
    .get(`https://api.themoviedb.org/3/movie/${filmID}?api_key=${key}`)
    .then(response => response.data);
};

const fetchMoviesSearch = async query => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${key}`,
    )
    .then(response => response.data.results);
};

const fetchMovieReview = async filmID => {
  return await axios
    .get(`https://api.themoviedb.org/3/movie/${filmID}/reviews?api_key=${key}`)
    .then(response => response.data.results);
};

const fetchMovieCast = async filmID => {
  return await axios
    .get(`https://api.themoviedb.org/3/movie/${filmID}/credits?api_key=${key}`)
    .then(response => response.data.cast);
};

//eslint-disable-next-line
export default {
  fetchTrending,
  fetchDetails,
  fetchMoviesSearch,
  fetchMovieReview,
  fetchMovieCast,
};
