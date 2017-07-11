import React, {Component} from 'react';

// this view has form for creating new song, and a list of all your songs
// stretch goal = sorting options, default alphabetically

// allows single touch to select a song
// "Make a Setlist from these songs" button sends array to setlist component

const ListStyle = {
  width: '90%',
  margin: 0,
  padding: 0,
  margin: 'auto',
  color: 'black',

};

const SongStyle = {
  border: '1px solid gray',
  borderRadius: 3,
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  color: 'black',
  listStyleType:'none',
  listStylePosition:'inside',
};

const SelectedStyle = {
  borderRadius: 3,
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'lightblue',
  color: 'black',
  listStyleType:'none',
  listStylePosition:'inside',
  boxShadow: "0 0 2px 2px lightblue",
};

class Songs extends Component {
  constructor(props){
    super(props)
    this.updateSetlist = props.callbackToUpdateSongsSelected
    this.state = {
      selectedSongs: [], // empty array to be filled with song ids in order selected
      songsStored: props.songsStored,
    }
    // console.log("props is ", props)
    // console.log('this.songs is ', this.state.songsStored)
    // console.log('song 1 is ', this.state.songsStored[1])
  }

  tapSong() {
    // on tapping a song, adds SelectedStyle and appends to this.selectedSongs
    // if already SelectedStyle, swap to SongStyle and remove from this.selectedSongs
  }

  longPressSong() {
    // on touching a song, presents options EDIT or DELETE
  }

  addSong() {
    // called via submit button
    // adds song to localStorage
    // sets state
  }

  editSong() {
    // called via selecting EDIT in longPressSong
    // opens song edit form with song info as default
  }

  render() {
    let songRenderArray = []
    this.songs.map((s) => {
      songRenderArray.push(
        <li style={SongStyle}>
          <strong>{s.name}</strong>
          <br/>

          Length: {s.duration}m <span style={{color: 'blue'}}>|</span> Intensity: {s.intensity}/7
        </li>
      )
    })
    return (
      <div>
        <ul style={ListStyle}>
          {songRenderArray}
          <li style={SelectedStyle}>
            <strong>Aura</strong>
            <br/>

            Length: 6m <span style={{color: 'blue'}}>|</span> Intensity: 3/7
          </li>
          <li style={Object.assign({}, SongStyle, {backgroundColor: 'rgba(255, 255, 255, .6)'})}>
            <strong>Add a new song!</strong>
            <br/>Press here
          </li>
        </ul>
        <button onTouchTap={() => {this.updateSetlist(this.state.selectedSongs)}} value="Sub"/ >
      </div>
    )
  }
}

export default Songs
