import { Route, NavLink, Switch } from 'react-router-dom';

import Home from './views/Home';
import Movies from './views/Movies';
import NotFoundPage from './views/NotFound'

import './styles.css';



const App = () => (
  <>
  <ul>
    <NavLink to ="/">Home</NavLink>
    <NavLink to ="/movies/">Movies</NavLink>
    </ul>
  <Switch>
  <Route exact path = "/" component = {Home}  />
  <Route path = "/movies" component = {Movies}  />
  <Route exact path = '/goit-react-hw-04-movies' component = {Home}/>
  <Route component = {NotFoundPage}/>
  </Switch>
  </>
)

export default App;
