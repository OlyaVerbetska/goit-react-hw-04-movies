import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moviesAPI from '../services/moviesAPI';
import imagePlacer from '../ImagePlacer.jpg';
import '../styles.css';

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
            casts.map(cast => (
              <li className="movieCast--item" key={cast.cast_id}>
                {cast.profile_path && (
                  <img
                    src={`${imagesUrl}${cast.profile_path}`}
                    alt={cast.name}
                    className="movieCast-image"
                  />
                )}
                {cast.profile_path === null && (
                  <img
                    src={imagePlacer}
                    className="movieCast-image"
                    alt={cast.name}
                   
                  />
                )}

                <p className="movieCast--item--name">{cast.name}</p>

                <p>
                  Character:<br/><span> {cast.character}</span>
                </p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
// MovieCast.defaultProps = {
//   avatar: imagePlacer,
// };

// MovieCast.propTypes = {
//   avatar: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   status: PropTypes.bool.isRequired,
// };

export default withRouter(MovieCast);
