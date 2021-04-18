import {Component} from 'react';
import axios from 'axios';
const key = '7ab96e660683d86731a9837125121184';
const imagesUrl = 'https://image.tmdb.org/t/p/w500';

//wJiGedOCZhwMx9DezY8uwbNxmAY.jpg

// в ролях
// https://api.themoviedb.org/3/movie/157336/credits?api_key=7ab96e660683d86731a9837125121184


class MovieCast extends Component {
    state = {
        casts:[],
    }
    async componentDidMount() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/credits?api_key=${key}`,
        );
        console.log(response.data.cast);
    
        this.setState({
            casts: response.data.cast,
        });
     
      }
    
    render(){
        const {casts} = this.state;
        return (
            <div>
              <ul>
                {casts &&
                  casts.map(cast => (
                    <li key={cast.cast_id}>
                         {cast.profile_path && <img src={`${imagesUrl}${cast.profile_path}`} alt={cast.name} height="100px" />}
                      <p>{cast.name}</p>
                     
                     
                      <p>Character: {cast.character}</p> 
                    </li>
                  ))}
              </ul>
            </div>
          );
    }
}

export default MovieCast;