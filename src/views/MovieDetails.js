import { Component } from 'react';
import axios from 'axios';
import { Route, NavLink, Switch } from 'react-router-dom';

import MovieReview from '../components/MovieReview';
import MovieCast from '../components/MovieCast';

// список ид жанров
// //https://api.themoviedb.org/3/genre/movie/list?api_key=7ab96e660683d86731a9837125121184

// детальное описание
// //https://api.themoviedb.org/3/movie/157336?api_key={api_key}

const key = '7ab96e660683d86731a9837125121184';
const imagesUrl = 'https://image.tmdb.org/t/p/w500';

class MovieDetails extends Component {
  state = {
    title: null,
    release_date: '',
    vote_average: null,
    overview: null,
    genres: [],
    poster_path: '/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg',
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
    const { match } = this.props;
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
        <button onClick={this.props.history.goBack}>Go Back</button>
        <h1>
             
             {title} {releaseYear && <span>({releaseYear})</span>}
        </h1>
        <img src={`${imagesUrl}${poster_path}`} alt={title} height="100px" />
        <p>User Score: {userScore}%</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h2>Genres</h2>
        <p>
          {genres.map(genre => (
            <span key={genre.name}>{genre.name}</span>
          ))}
        </p>

        <NavLink to={`${match.url}/cast`}> Cast</NavLink>
        <NavLink to={`${match.url}/reviews`}> Reviews </NavLink>
        <Switch>
          <Route  path={`${match.path}/cast`} component={MovieCast} />
          <Route  path={`${match.path}/reviews`} component={MovieReview} />
        </Switch>
      </div>
    );
  }
}

export default MovieDetails;
