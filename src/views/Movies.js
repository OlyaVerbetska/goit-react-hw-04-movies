import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import moviesAPI from '../services/moviesAPI';

class Movies extends Component {
  state = {
    query: '',
    movies: [],
  };

  //localStorage

  componentDidMount() {
    const mySearchMovies = localStorage.getItem('My Movies');
    const parsedMyMovies = JSON.parse(mySearchMovies);

    if (mySearchMovies) {
      this.setState({
        movies: parsedMyMovies,
      });
    } else {
      this.setState({
        movies: [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movies !== this.state.movies) {
      localStorage.setItem('My Movies', JSON.stringify(this.state.movies));
    }
  }

  changeInput = e => {
    this.setState({ query: e.currentTarget.value });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    this.getMovies();
    this.resetForm();
  };

  getMovies = () => {
    moviesAPI.fetchMoviesSearch(this.state.query).then(results =>
      this.setState({
        movies: [...results],
      }),
    );
  };

  resetForm = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <h1>Movies Page</h1>
        <form>
          <input
            type="text"
            onChange={this.changeInput}
            value={this.state.query}
          ></input>
          <button type="submit" onClick={this.handleFormSubmit}>
            Search
          </button>
        </form>
        <ul>
          {movies.length > 0
            ? movies.map(movie => (
                <li key={movie.id}>
                  <NavLink to={`${this.props.match.url}${movie.id}`}>
                    {' '}
                    {movie.title}{' '}
                  </NavLink>
                </li>
              ))
            : 'No films matching your request'}
        </ul>
      </div>
    );
  }
}

export default Movies;
