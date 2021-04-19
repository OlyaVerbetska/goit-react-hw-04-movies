import { NavLink, withRouter } from 'react-router-dom';
import routes from '../routes'

const MovieList = ({movies}) =>
( <ul>
    {movies.length > 0
  ? movies.map(({id, name, title}) => (
      <li key={id}>
        <NavLink to={`${routes.movies}/${id}`}>
       
          {title !== undefined ? title : name}
        </NavLink>
      </li>
    ))
  : 'No films matching your request'}
</ul>)

export default withRouter(MovieList);