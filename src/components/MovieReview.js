import { Component } from 'react';
import moviesAPI from '../services/moviesAPI';

class MovieReview extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const filmID = this.props.match.params.movieId;
    moviesAPI.fetchMovieReview(filmID).then(results =>
      this.setState({
        reviews: results,
      }),
    );
  }

  render() {
    const { reviews } = this.state;

    return (
      <div>
        <ul className = "movieReviews--list">
          {reviews &&
            reviews.map(review => (
              <li key={review.id}>
                <p className = "movieReviews--list--name">Author:    {review.author}</p>
                <p className = "movieReviews--list--text">{review.content}</p>
              </li>
            ))}
          {reviews.length === 0 && 'There are no reviews'}
        </ul>
      </div>
    );
  }
}
export default MovieReview;
