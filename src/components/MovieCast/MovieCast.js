import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moviesAPI from '../../services/moviesAPI';
//import imagePlacer from '../ImagePlacer.jpg';
import PropTypes from 'prop-types';
import imagePlacer from '../../ImagePlacer.jpg'

import '../MovieCast/MovieCast.scss';

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
        <ul className="movieCast">
          {casts &&
            casts.map(({cast_id,profile_path,name,character }) => (
              <li className="movieCast--item" key={cast_id}>
                {profile_path ? (
                  <img
                    src={`${imagesUrl}${profile_path}`}
                    alt={name}
                    className="movieCast-image"
                  />
                ) :( <img
                  src={imagePlacer}
                  className="movieCast-image"
                  alt={name}
                 
                />) }
              
                <p className="movieCast--item--name">{name}</p>

                <p>
                  Character:<br/><span> {character}</span>
                </p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
MovieCast.propTypes = {
  match: PropTypes.shape({
      isExact: PropTypes.bool,
      params: PropTypes.shape({ movieId: PropTypes.string }),
      path: PropTypes.string,
      url: PropTypes.string,
  }),
};

export default withRouter(MovieCast);
