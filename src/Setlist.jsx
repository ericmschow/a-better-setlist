import React, {Component} from 'react';
// import { DragSource } from 'react-dnd';
import DragDropContainer from './DragDropContainer';

// Setlist is an array of Song objects
// Needs to be an array, as setlists are ordered
// Songs have:
//  id
//  duration
//  intensity
//
// Setlist allows import/export of setlist to localStorage

const setlistNameStyle = {
  fontSize:'2em',
  textAlign: 'center',
  backgroundColor: "rgba(120, 120, 120, .6)",
  border: 'none',
  color: '#fff',
}

class Setlist extends Component {
  constructor(props){
    super(props)
    this.state = {
      songsSelected: props.songsSelected,
      songsStored: props.songsStored,
      setlistName: 'Your Setlist',
      setlistDuration: null,
    }
    // console.log('songsSelected in setlist is ', this.state.songsSelected)
    // console.log('songStored 1 is ', this.state.songsStored[1])
    // console.log('Setlist component state is ', this.state)

  }

  updateSetlistDuration(duration){
    // callback to receive total duration from DragDropContainer
    this.setState({setlistDuration: duration})
  }

  convertDurToString(input){
    let minutes = Math.floor(input/60);
    let seconds = (input%60).toString()
    seconds = seconds.length == 1 ? '0'+seconds : seconds
    let durString = minutes.toString() + ":" + seconds
    return durString
  }

  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  }

  render(){
    //console.log('songsSelected in setlist render is ', this.state.songsSelected)
    if (this.state.songsSelected.length === 0){
      return(
        <div>
          <input type='text'
            value={this.state.setlistName}
            onChange={event => this.handleChange(event, 'setlistName')}
            style={setlistNameStyle}/>
          <div style={{margin: "1em"}}>
            <p>You haven't selected any songs!<br/><br/> Swipe back and click on some to get started.</p>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <input type='text'
            value={this.state.setlistName}
            onChange={event => this.handleChange(event, 'setlistName')}
            style={setlistNameStyle}
            />
          <p>Total length: {this.convertDurToString(this.state.setlistDuration)}</p>
          <p>Drag to reorder!</p>
          <DragDropContainer
            songsSelected={this.state.songsSelected}
            songsStored={this.state.songsStored}
            callbackToUpdateDur={(dur)=>this.updateSetlistDuration(dur)}
            />
        </div>
      )
    }
  }
}

export default Setlist
