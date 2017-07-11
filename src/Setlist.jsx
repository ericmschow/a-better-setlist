import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import Container from './Container';

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
    this.setlist = props.setlist
    // read from localstorage and get songs
  }
  render(){
    return(
      <div>
        <Container setlist={this.setlist}/>
      </div>
    )
  }
}

export default Setlist
