import { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import moviesAPI from '../services/moviesAPI';

const imagesUrl = 'https://image.tmdb.org/t/p/w500';

//wJiGedOCZhwMx9DezY8uwbNxmAY.jpg

class MovieCast extends Component {
  state = {
    casts: [],
  };
  async componentDidMount() {
    const filmID = this.props.match.params.movieId;
    moviesAPI.fetchMovieCast(filmID).then(cast =>
      this.setState({
        casts: cast,
      }),
    );
  }

  render() {
    const { casts } = this.state;
    return (
      <div>
        <ul>
          {casts &&
            casts.map(cast => (
              <li key={cast.cast_id}>
                {cast.profile_path && (
                  <img
                    src={`${imagesUrl}${cast.profile_path}`}
                    alt={cast.name}
                    height="100px"
                  />
                )}
                <p>{cast.name}</p>

                <p>Character: {cast.character}</p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(MovieCast);
