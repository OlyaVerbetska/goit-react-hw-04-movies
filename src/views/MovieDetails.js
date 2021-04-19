import { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import moviesAPI from '../services/moviesAPI';

import MovieReview from '../components/MovieReview';
import MovieCast from '../components/MovieCast';
import routes from '../routes'

// список ид жанров
// //https://api.themoviedb.org/3/genre/movie/list?api_key=7ab96e660683d86731a9837125121184

// детальное описание
// //https://api.themoviedb.org/3/movie/157336?api_key={api_key}


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
    const filmID = this.props.match.params.movieId;
    moviesAPI
      .fetchDetails(filmID)
      .then(
        ({
          title,
          release_date,
          vote_average,
          overview,
          genres,
          poster_path,
        }) =>
          this.setState({
            title,
            release_date,
            vote_average,
            overview,
            genres,
            poster_path,
          }),
      );
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

        <NavLink to={`${match.url}${routes.cast}`}> Cast</NavLink>
        <NavLink to={`${match.url}${routes.reviews}`}> Reviews </NavLink>
        <Switch>
          <Route path={`${match.path}${routes.cast}`} component={MovieCast} />
          <Route path={`${match.path}${routes.reviews}`} component={MovieReview} />
        </Switch>
      </div>
    );
  }
}

export default MovieDetails;
