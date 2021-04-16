// import { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './views/Home';
import Movies from './views/Movies';

import './styles.css';



const App = () => (
  <>
  <Route exact path = "/" component = {Home}  />
  <Route path = "/movies" component = {Movies}  />
  </>
)

export default App;
