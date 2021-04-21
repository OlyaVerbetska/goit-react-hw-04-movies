import { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import moviesAPI from '../services/moviesAPI';
import imagePlacer from '../ImagePlacer.jpg';

import '../views/MovieDetails.scss'
import routes from '../routes';

const reviewComponent = lazy(() =>
  import(
    '../components/MovieReview' /*webpackChunkName: "movie-review-component" */
  ),
);
const castComponent = lazy(() =>
  import(
    '../components/MovieCast' /*webpackChunkName: "movie-cast-component" */
  ),
);

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
  handleGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push('/');
  };

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
      <div className="movieDetails">
        <button
          type="button"
          onClick={this.handleGoBack}
          className="movieDetails__button"
        >
          Go Back
        </button>
        <h1 className="title">
          {title} {releaseYear && <span>({releaseYear})</span>}
        </h1>
        <div className="movieDetails__description">
          <div className="movieDetails__description--img">
            {poster_path ? (
              <img
                src={`${imagesUrl}${poster_path}`}
                alt={title}
                height="400px"
              />
            ) :  <img
            src={imagePlacer}
            className="movieCast-image"
            alt={title}
           
          /> }
          </div>
          <div className="movieDetails__description--text">
            <p>User Score: {userScore}%</p>

            {overview && (
              <>
                
                <h2 className="subtitle">Overview</h2> <p>{overview}</p>
              </>
            )}
            {genres.length > 0 && (
              <>
                {' '}
                <h2 className="subtitle">Genres</h2>
                <p>
                  {genres.map(genre => (
                    <span
                      key={genre.name}
                      className="movieDetails__description--text-genres"
                    >
                      {genre.name}
                    </span>
                  ))}
                </p>
              </>
            )}
     
          </div>
        </div>
        <h2 className="subtitle">Additional information</h2>

        <NavLink
          to={{
            pathname: `${match.url}${routes.cast}`,
            state: {
              from: this.props.location,
            },
          }}
          className="movieDetails__additional"
          activeClassName="movieDetails__additional--active"
        >
          Cast
        </NavLink>
        <NavLink
          to={{
            pathname: `${match.url}${routes.reviews}`,
            state: {
              from: this.props.location,
            },
          }}
          className="movieDetails__additional"
          activeClassName="movieDetails__additional--active"
        >
          {' '}
          Reviews{' '}
        </NavLink>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Switch>
            <Route
              path={`${match.path}${routes.cast}`}
              component={castComponent}
              onClick={this.handleGoBack}
            />
            <Route
              path={`${match.path}${routes.reviews}`}
              component={reviewComponent}
              onClick={this.handleGoBack}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MovieDetails;

// Почему нельзя так??
/* <button onClick={this.props.history.goBack}>Go Back</button> */
