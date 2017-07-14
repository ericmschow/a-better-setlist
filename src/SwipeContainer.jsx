import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo400} from 'material-ui/styles/colors'
import Setlist from './Setlist.jsx'
import Songs from './Songs.jsx'
import Chart from './Graphs.jsx'
import Tappable from 'react-tappable'
const styles = {
  slide: {
    padding: 15,
    height: '100vh',
    color: '#fff',
    borderLeft: "1px solid #333",
    borderRight: "1px solid #333",
  },
  slide1: {
    background: "#cc3350 url('/img/stage_empty.jpeg') no-repeat fixed",
    // backgroundSize: "auto 125%",
    backgroundSize: 'cover',
    backgroundPosition: "-35vw 5vh"
  },
  slide2: {
    background: "#00ff00",
    background: "#00ff00 url('/img/stage_rainbow.jpeg') no-repeat fixed",
    // backgroundSize: "auto 125%",
    backgroundPosition: "0vw center",
    backgroundSize: 'cover',
  },
  slide3: {
    background: "#0000ff",
    background: "#0000ff url('/img/mixer1.jpeg') no-repeat fixed",
    // backgroundSize: "auto 125%",
    backgroundSize: 'cover',
    backgroundPosition: "150vw center",
  },
  chartBackground: {
    // background: "url('/img/mixer2.jpeg') no-repeat fixed",
    // backgroundSize: "cover",
    // marginLeft: "-50%",
    // transform: "translate(-200%, 0px)",
    // height: '100vh',
  },
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: indigo400,
        primary2Color: indigo400,
        primary3Color: indigo400,
        accent1Color: indigo400,
        pickerHeaderColor: indigo400,
    },
});

class SwipeContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      songsTest: [
        {
          id: 'apgkrGJfre',
          name: 'Fifteen',
          duration: 300,
          intensity: 6
        } ,
        {
          id: 'KfjeriFvsi',
          name: 'Forest Temple',
          duration: 540,
          intensity: 4
        } ,
        {
        id: 'PfkeUnbmDf',
        name: 'The Complex',
        duration: 420,
        intensity: 5
        }
      ],
      songsStored: JSON.parse(localStorage.songs),
      songsSelected: [],
      index: 0,
    }
    // this.state.songsSelected = [this.state.songsTest[1].id, this.state.songsTest[2].id]  // uncomment to add selected
    // console.log('songStored is ', this.state.songsStored)
    //localStorage.songs = JSON.stringify(this.state.songsTest)    // uncomment to reinitialize dummy songs
  }
  componentDidUpdate(){
    console.log('swipecontainer index is ', this.state.index)
  }
  toUpdateSongsSelected(newSongs){
    this.setState({songsSelected: newSongs})
    //this.setState({songsSelected: ss.push(song.id)});
    // console.log('songsSelected in SwipeContainer Updated: ', this.state.songsSelected)
  }

  handleChange = (value) => {
    console.log('handleChange args:', arguments)
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index: index,
    });
  };

  render() {
    const {index} = this.state
    return (
      <MuiThemeProvider muiTheme={muiTheme}><div>
        <Tabs value={index} fullWidth onChange={this.handleChange}>
          <Tab label="SONGS" value={0}/>
          <Tab label="SETLIST" value={1}/>
          <Tab label="GRAPHS" value={2}/>
        </Tabs>
      <SwipeableViews
        index={index}
        onChangeIndex={this.handleChangeIndex}
        resistance= {true}
        enableMouseEvents={true}>

        <div style={Object.assign({}, styles.slide, styles.slide1)}>
          <h3>Your Songs</h3>
          <p>Tap to select, hold for options!</p>
          <Songs
            callbackToUpdateSongsSelected={(songs) => {this.toUpdateSongsSelected(songs)}}
            songsStored = {this.state.songsStored}
            songsSelected = {this.state.songsSelected}/>
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide2)}>
          <div style={styles.chartBackground}>
            <div >
              <Setlist songsSelected = {this.state.songsSelected}
            songsStored = {this.state.songsStored}/>
            </div>
          </div>
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>
          <h3>Your Graphs</h3>
          <Chart
            songsSelected = {this.state.songsSelected}
            songsStored = {this.state.songsStored}/>
        </div>
      </SwipeableViews>
      </div></MuiThemeProvider>
    )
  }
}

export default SwipeContainer;
