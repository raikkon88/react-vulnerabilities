import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import VideoList from './Screens/VideoList'
import Video from './Screens/Video'
import axios from 'axios';
import { Route, Router, Switch } from './Utils/Routing';

// Configure axios base api url
axios.defaults.baseURL = 'http://localhost:8080/api'

class App extends Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/video" component={Video} />
          <Route exact path="/" component={VideoList} />
        </Switch>
      </Router>
      
    )
  }
}


let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
