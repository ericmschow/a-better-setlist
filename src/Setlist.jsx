import React, {Component} from 'react';
// import { DragSource } from 'react-dnd';
import DragDropContainer from './DragDropContainer';
import './Setlist.css'
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
const setlistFieldStyle = {
  fontSize:'1em',
  marginTop: 5,
  width: '90%',
  textAlign: 'justified',
  backgroundColor: "rgba(120, 120, 120, .6)",
  border: 'none',
  color: '#fff',
  position: 'absolute',
  bottom: '10%',
  right: '5%'

}
// export function Notes() {
//     return(
//             )
//   }

class Setlist extends Component {
  constructor(props){
    super(props)
    this.state = {
      songsSelected: props.songsSelected,
      songsStored: props.songsStored,
      setlistName: 'Your Setlist',
      setlistDuration: null,
      setlistNotes: 'People/bands to thank: ',
    }
    // console.log('songsSelected in setlist is ', this.state.songsSelected)
    // console.log('songStored 1 is ', this.state.songsStored[1])
    // console.log('Setlist component state is ', this.state)

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
          <div id="setlistNotes">
            <label>Notes:</label>
            <textarea
                      style={setlistFieldStyle}
                      value={this.state.setlistNotes}
                      onChange={event => this.handleChange(event, 'setlistNotes')}
                      rows={4}
                      />
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
          <div id="dragDropDiv">
            <DragDropContainer
              songsSelected={this.state.songsSelected}
              songsStored={this.state.songsStored}

              callbackWithSetlist={()=>this.props.returnSetlist()}
              setlist={this.props.setlist}
              />
          </div>
          <div id="setlistNotes">
            <label>Notes:</label>
            <textarea
                      style={setlistFieldStyle}
                      value={this.state.setlistNotes}
                      onChange={event => this.handleChange(event, 'setlistNotes')}
                      rows={4}
                      />
          </div>
        </div>
      )
    }
  }
}

export default Setlist
