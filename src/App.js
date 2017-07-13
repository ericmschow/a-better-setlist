import React, { Component } from 'react';
import './App.css';
import SwipeContainer from './SwipeContainer.jsx'
// import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>A Better Setlist</h2>
        </div>
        <SwipeContainer/>
      </div>
    );
  }
}

export default App;
