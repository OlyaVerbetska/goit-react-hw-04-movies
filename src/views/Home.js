import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moviesAPI from '../services/moviesAPI';

class Home extends Component {
  state = {
    trending: [],
  };

  componentDidMount() {
    moviesAPI.fetchTrending().then(results =>
      this.setState({
        trending: [...results],
      }),
    );
  }

  render() {
    const { trending } = this.state;
    return (
      <div>
        <h1>Home Page</h1>
        <ul>
          {trending.map(trend => (
            <li key={trend.id}>
              {/* // change next row */}
              <NavLink to={`movies/${trend.id}`}>
                {' '}
                {trend.title === undefined ? trend.name : trend.title}{' '}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
