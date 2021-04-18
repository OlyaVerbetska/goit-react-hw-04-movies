import { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

//https://api.themoviedb.org/3/trending/all/day?api_key=7ab96e660683d86731a9837125121184
//axios.baseUrl = 'https://api.themoviedb.org/3';
//axios.defaults.headers.common['Authentication-Callback'] = 'Bearer 7ab96e660683d86731a9837125121184';

const key = '7ab96e660683d86731a9837125121184';

class Home extends Component {
  state = {
    trending: [],
  };
  async componentDidMount() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
    );

    this.setState({
      trending: [...response.data.results],
    });
  }

  render() {
    const { trending } = this.state;
    return (
      <div>
        <h1>Home Page</h1>
        <ul>
          {trending.map(trend => (
            <li key={trend.id}>
             {/* // change next row */}
             <NavLink to ={`movies/${trend.id}`}> {trend.title === undefined ? trend.name : trend.title} </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
