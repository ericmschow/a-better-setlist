import React, { Component } from 'react';
import './App.css';
import SwipeContainer from './SwipeContainer.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
import bg1 from "./crowd1.jpeg";
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {index: 0}
  }

  render() {
    return (
      <div className="App">
        <div className="App-header" style={{background: `#7382bb url('${bg1}') no-repeat`,}}>
          <br/>
          <h2>A Better Setlist</h2>
        </div>
        <SwipeContainer/>
      </div>

    );
  }
}

export default App;
