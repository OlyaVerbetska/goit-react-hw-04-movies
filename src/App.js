import { Route, Switch } from 'react-router-dom';
import{Suspense, lazy} from 'react'

// import Home from './views/Home';
// import Movies from './views/Movies';
// import MovieDetails from './views/MovieDetails';
// import NotFoundPage from './views/NotFound';
import AppBar from './components/AppBar';

import './styles.css';
import routes from './routes';

const HomeView = lazy(()=> import('./views/Home' /* webpackChunkName: "home-page" */));
const MovieView = lazy(()=> import('./views/Movies' /* webpackChunkName: "movie-page" */));
const MovieDetailsView = lazy(()=> import ('./views/MovieDetails') /* webpackChunkName: "movie-details-page" */);
const NotFoundPage = lazy(()=> import ('./views/NotFound' /* webpackChunkName: "not-found-page */))



const App = () => (
  <>
  <AppBar/>
  <Suspense fallback = {<h1>Loading...</h1>}>
  <Switch>
  <Route exact path = {routes.home} component = {HomeView}  />
  <Route path = {routes.movieDetails} component = {MovieDetailsView}  />
  <Route path = {routes.movies} component = {MovieView}  />
  <Route exact path = '/goit-react-hw-04-movies' component = {HomeView}/>
  <Route component = {NotFoundPage}/>
  </Switch>
 </Suspense>
 </>
)

export default App;
