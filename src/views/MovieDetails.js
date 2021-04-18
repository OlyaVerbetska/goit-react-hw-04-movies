import { Component } from 'react';
import axios from 'axios';

//https://api.themoviedb.org/3/movie/353390?api_key=7ab96e660683d86731a9837125121184

//https://api.themoviedb.org/3/genre/movie/list?api_key=7ab96e660683d86731a9837125121184

//https://api.themoviedb.org/3/movie/157336?api_key={api_key}
const key = '7ab96e660683d86731a9837125121184';
const imagesUrl = 'https://image.tmdb.org/t/p/w500';

class MovieDetails extends Component {
  state = {
    title: null,
    release_date: '',
    vote_average: null,
    overview: null,
    genres: [],
    poster_path: null,
  };
  async componentDidMount() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=${key}`,
    );

    const {
      title,
      release_date,
      vote_average,
      overview,
      genres,
      poster_path,
    } = response.data;

    this.setState({
      title,
      release_date,
      vote_average,
      overview,
      genres,
      poster_path,
    });
  }

  render() {
    const {
      title,
      release_date,
      vote_average,
      overview,
      genres,
      poster_path,
    } = this.state;
    const userScore = vote_average * 10;
    const releaseYear = release_date.slice(0, 4);
    return (
      <div>
        <h1>
          {title} ({releaseYear})
        </h1>
        <img src={`${imagesUrl}${poster_path}`} alt={title} height="300px" />
        <p>User Score: {userScore}%</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h2>Genres</h2>
        {genres.map(genre => (
          <span>{genre.name}</span>
        ))}
      </div>
    );
  }
}
export default MovieDetails;
