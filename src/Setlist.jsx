import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
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
      setlist: props.setlist,
    }
    console.log('songsSelected in setlist is ', this.state.songsSelected)
    console.log('songStored 1 is ', this.state.songsStored[1])
    console.log('Setlist component state is ', this.state)

  }
  render(){
    if (this.state.songsSelected === 0){
      return(
        <div>
          <p>You haven't selected any songs! Swipe back and click on some to get started.</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <DragDropContainer
            moveCard={this.props.moveCard}
            songsSelected={this.state.songsSelected}
            songsStored={this.state.songsStored}
            setlist={this.state.setlist}
            />
        </div>
      )
    }
  }
}

export default Setlist
