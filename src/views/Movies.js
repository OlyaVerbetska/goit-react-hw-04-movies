import { Component } from 'react';
import axios from 'axios';

axios.baseUrl = 'https://api.themoviedb.org/3';
const key = '7ab96e660683d86731a9837125121184';

class Movies extends Component {
  state = {
    query: '',
    movies: [],
  };

  changeInput = e => {
    this.setState({ query: e.currentTarget.value });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    console.log(this.state.query);
    this.getMovies(this.state.query);
    this.resetForm();
  };

  async getMovies(query) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${key}`,
    );
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
            ? movies.map(movie => <li key={movie.id}>{movie.title}</li>)
            : 'No films matching your request'}
        </ul>
      </div>
    );
  }
}

export default Movies;
