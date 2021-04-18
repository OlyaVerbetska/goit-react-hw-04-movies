import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

//https://api.themoviedb.org/3/search/movie?query=cat&api_key=7ab96e660683d86731a9837125121184

axios.baseUrl = 'https://api.themoviedb.org/3';
const key = '7ab96e660683d86731a9837125121184';

class Movies extends Component {
  state = {
    query: '',
    movies: [],
  };


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
    this.getMovies(this.state.query);
    this.resetForm();
  };

  async getMovies(query) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${key}`,
    );
   // console.log(response.data.results);
    
    this.setState({
      movies: [...response.data.results],
    });
  }
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
            ? movies.map(movie => <li key={movie.id}>
             <NavLink to={`${this.props.match.url}${movie.id}`}> {movie.title} </NavLink>
              </li>)
            : 'No films matching your request'}
        </ul>
      </div>
    );
  }
}

export default Movies;
