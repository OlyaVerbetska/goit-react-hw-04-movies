import { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import{Suspense, lazy} from 'react'

import moviesAPI from '../services/moviesAPI';
//import imagePlacer from '../ImagePlacer.jpg'

// import MovieReview from '../components/MovieReview';
// import MovieCast from '../components/MovieCast';
import routes from '../routes'

const reviewComponent = lazy(()=>import('../components/MovieReview' /*webpackChunkName: "movie-review-component" */ ));
const castComponent = lazy(()=>import('../components/MovieCast' /*webpackChunkName: "movie-cast-component" */ ));


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
  handleGoBack = () =>{
    const {  location, history } = this.props;
    if(location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push("/")
    
  }

  render() {
    const { match} = this.props;

  
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
        <button type ="button" onClick={this.handleGoBack}>Go Back</button>
        <h1>
          {title} {releaseYear && <span>({releaseYear})</span>}
        </h1>
        {poster_path && <img src={`${imagesUrl}${poster_path}`} alt={title} height="100px" /> }
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
        <Suspense fallback= {<h2>Loading...</h2>}>
        <Switch>
          <Route path={`${match.path}${routes.cast}`} component={castComponent}  onClick={this.handleGoBack} />
          <Route path={`${match.path}${routes.reviews}`} component={reviewComponent}  onClick={this.handleGoBack} />
        </Switch>
        </Suspense>
      </div>
    );
  }
}


export default MovieDetails;

// Почему нельзя так??
/* <button onClick={this.props.history.goBack}>Go Back</button> */