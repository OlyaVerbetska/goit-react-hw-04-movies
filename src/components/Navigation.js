import routes from '../routes';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <NavLink to={routes.home}>Home</NavLink>
      <NavLink to={routes.movies}>Movies</NavLink>
    </ul>
  </nav>
);

export default Navigation;
