import { Component } from 'react';
import moviesAPI from '../services/moviesAPI';
import MovieList from '../components/MovieList'

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
       <MovieList movies = {trending}/>
      </div>
    );
  }
}

export default Home;
