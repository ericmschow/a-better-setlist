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

class Setlist extends Component {
  constructor(props){
    super(props)
    this.state = {
      songsSelected: props.songsSelected,
      songsStored: props.songsStored,
      setlistName: 'Your Setlist'
    }
    // console.log('songsSelected in setlist is ', this.state.songsSelected)
    // console.log('songStored 1 is ', this.state.songsStored[1])
    // console.log('Setlist component state is ', this.state)

  }

  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  }

  render(){
    console.log('songsSelected in setlist render is ', this.state.songsSelected)
    if (this.state.songsSelected.length === 0){
      return(
        <div>
          <input type='text'
            value={this.state.setlistName}
            onChange={event => this.handleChange(event, 'setlistName')} 
            style={{
              fontSize:'2em',
              textAlign: 'center',
              backgroundColor: "rgba(120, 120, 120, .6)",
              border: 'none',
              color: '#fff',
            }}/>
          <div style={{margin: "1em"}}>
            <p>You haven't selected any songs!<br/><br/> Swipe back and click on some to get started.</p>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <h3>Your Setlist</h3>
          <p>Drag to reorder!</p>
          <DragDropContainer
            songsSelected={this.state.songsSelected}
            songsStored={this.state.songsStored}
            />
        </div>
      )
    }
  }
}

export default Setlist
