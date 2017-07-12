import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import Setlist from './Setlist.jsx'
import Songs from './Songs.jsx'
const styles = {
  slide: {
    padding: 15,
    height: '100vh',
    color: '#fff',
  },
  slide1: {
    background: '#4caf50',
  },
  slide2: {
    background: '#0f0f43',
  },
  slide3: {
    background: '#C15C5C',
  },
};

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
    }
    this.state.songsSelected = [this.state.songsTest[1].id, this.state.songsTest[2].id]
    console.log('songStored is ', this.state.songsStored)
    //localStorage.songs = JSON.stringify(this.state.songsTest)    // uncomment to reinitialize dummy songs
  }
  toUpdateSongsSelected(newSongs){
    this.setState({songsSelected: newSongs})

    //this.setState({songsSelected: ss.push(song.id)});
    console.log('songsSelected Updated: ', this.state.songsSelected)
  }
  render() {
    return (
      <SwipeableViews
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
          <h3>Your Setlist</h3>
          <p>Drag to reorder!</p>
          <Setlist songsSelected = {this.state.songsSelected}
            songsStored = {this.state.songsStored}/>
        </div>
        <div style={Object.assign({}, styles.slide, styles.slide3)}>
          <h3>Your Graphs</h3>
        </div>
      </SwipeableViews>
    )
  }
}

export default SwipeContainer;
