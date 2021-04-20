import { Component } from 'react';
import moviesAPI from '../services/moviesAPI';
import SearchForm from '../components/SearchForm';
import MovieList from '../components/MovieList';

class Movies extends Component {
  state = {
    
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

  handleFormSubmit = query => {
    this.getMovies(query);
  };

  getMovies = query => {
    moviesAPI.fetchMoviesSearch(query).then(results =>
      this.setState({
        movies: [...results],
      }),
    );
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <SearchForm onSubmit={this.handleFormSubmit} />
        <MovieList movies={movies} />
      </div>
    );
  }
}

export default Movies;
