import routes from '../routes';
import { NavLink } from 'react-router-dom';
import '../styles.css';
const Navigation = () => (
  <nav>
    <ul className="Navigation__list">
      <li className="Navigation__list--item">
        {' '}
        <NavLink exact to={routes.home} className="Navigation__list--link" activeClassName="Navigation__list--active-link">
          Home
        </NavLink>
      </li>
      <li className="Navigation__list--item">
        {' '}
        <NavLink to={routes.movies} className="Navigation__list--link" activeClassName="Navigation__list--active-link">
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
