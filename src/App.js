import { Route, Switch } from 'react-router-dom';
import{Suspence, lazy} from 'react'

import Home from './views/Home';
import Movies from './views/Movies';
import MovieDetails from './views/MovieDetails';
import NotFoundPage from './views/NotFound';
import AppBar from './components/AppBar';

import './styles.css';
import routes from './routes';



const App = () => (
  <>
  <AppBar/>
  <Switch>
  <Route exact path = {routes.home} component = {Home}  />
  <Route path = {routes.movieDetails} component = {MovieDetails}  />
  <Route path = {routes.movies} component = {Movies}  />
  <Route exact path = '/goit-react-hw-04-movies' component = {Home}/>
  <Route component = {NotFoundPage}/>
  </Switch>
 </>
)

export default App;
