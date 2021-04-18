import { Component } from 'react';

import axios from 'axios';

const key = '7ab96e660683d86731a9837125121184';

// отзывы
// https://api.themoviedb.org/3/movie/157336/reviews?api_key=7ab96e660683d86731a9837125121184

class MovieReview extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/reviews?api_key=${key}`,
    );

    this.setState({
      reviews: response.data.results,
    });
  }

  render() {
    const { reviews } = this.state;
   
    return (
      <div>
      
        <ul>
          {reviews &&
            reviews.map(review => (
              <li key={review.id}>
                <p>Author:{review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
            {reviews.length === 0 && "There are no reviews"}
        </ul>
      </div>
    );
  }
}
export default MovieReview;
