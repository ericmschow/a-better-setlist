import React, {Component} from 'react';
// import { DragSource } from 'react-dnd';
import DragDropContainer from './DragDropContainer';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import './Setlist.css'
import jsPDF from 'jspdf'
var debounce = require('debounce')
// Setlist is an array of Song objects
// Needs to be an array, as setlists are ordered
// Songs have:
//  id, 10character random key
//  duration, in seconds, max of 1500 
//  intensity, 1-7 representing how intense the song is
//  response, 1-7 representing how crowd responds to song
const setlistNameStyle = {
  fontSize:'1.3em',
  textAlign: 'center',
  // backgroundColor: "rgba(120, 120, 120, .6)",
  border: 'none',
  color: '#fff',
  textColor: '#fff',
  maxWidth: "90vw",
  marginBottom: '1rem'
}
const setlistFieldStyle = {
  fontSize:'1em',
  marginTop: 5,
  maxWidth: "90vw",
  textAlign: 'justified',
  // backgroundColor: "rgba(120, 120, 120, .6)",
  // border: '1px',
  color: '#fff',
  textColor: '#fff',
  hintColor: '#fff',
  // position: 'absolute',
  // bottom: '10%',
  // right: '5%'

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
      setlistNotes: 'Notes you want at the bottom of your setlist! Maybe list some people/bands to thank.',
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

  writePDF(){
    // dims 210 x 297 mm wxh
    const {setlist} = this.props
    console.log(setlist)
    let doc = new jsPDF();
    let name = this.state.setlistName
    let filename = name.toLowerCase().split(' ').join('_') + '.pdf'
    doc.setFontSize(48)
    if (name.length > 22) {doc.setFontSize(36)}
    doc.setFontStyle('bold')
    doc.text(name, 105-(name.length*4), 30)   // approximately center title
    // resize for list generation
    doc.setFontSize(30)
    let yPos = 60
    let yPosAdj = 15
    if (setlist.length > 10) {yPosAdj = 12; doc.setFontSize(24)}
    setlist.forEach((song, i)=>{
      let str = i+1 + ". " + song.name
      doc.text(str, 20, yPos)
      yPos += yPosAdj
    })
    doc.setFontSize(20)
    let notesSplit = this.state.setlistNotes.split(" ");
    console.log('notesSplit is ', notesSplit)
    let lines = []
    let line = []
    let counter = 0
    yPos += 50 // move down for notes
    notesSplit.forEach(function(word, i){
      line.push(word)
      console.log('line is ', line)
      counter++
      if (counter > 7) {
        lines.push(line.join(' '));
        line = [];
        counter = 0;
        console.log('lines is ', lines, 'and line is now ', line)
      }
    })
    lines.forEach(function(stri){
      doc.text(stri, 20, yPos)
      yPos += yPosAdj
    })
    doc.text(line.join(' '), 20, yPos) // print last line if not a full 7 words as above
    doc.setFontSize(10)
    doc.text('This setlist was created using the free app available at https://setlist.ericmschow.com!', 20, 275)
    // maybe draw rect around
    doc.save(filename)
  }

  debWritePDF = debounce(()=>{this.writePDF()}, 1000, true)


  render(){
    //console.log('songsSelected in setlist render is ', this.state.songsSelected)
    if (this.state.songsSelected.length === 0){
      return(
        <div>
          <TextField
            value={this.state.setlistName}
            textColor="#fff"
            onChange={event => this.handleChange(event, 'setlistName')}
            style={setlistNameStyle}
            inputStyle={setlistNameStyle}
            maxLength="24"
            />
          <div style={{margin: "1em"}}>
            <p style={{
                backgroundColor: "rgba(125, 125, 125, 0.4)",
                border: "2px solid #ccc"}}
              >
              You haven't selected any songs!<br/><br/> Swipe back and click on some.</p>
          </div>

          <div id="setlistNotes">
            <TextField
              textareaStyle={setlistFieldStyle}
              style={setlistFieldStyle}
              hintText="Notes"
              value={this.state.setlistNotes}
              onChange={event => this.handleChange(event, 'setlistNotes')}
              multiLine={true}
              rows={4}
              maxLength="180"
              />
          </div>
        </div>
      )
    }
    else {
      return (
        <div id="setlistContainer">
          <TextField
            value={this.state.setlistName}
            textColor="#fff"
            onChange={event => this.handleChange(event, 'setlistName')}
            style={setlistNameStyle}
            inputStyle={setlistNameStyle}
            maxLength="24"

            />
          <br/>

          <p>Total length: {this.convertDurToString(this.props.setlistDuration)}</p>
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
            <TextField
              textareaStyle={setlistFieldStyle}
              style={setlistFieldStyle}
              hintText="Notes"
              value={this.state.setlistNotes}
              onChange={event => this.handleChange(event, 'setlistNotes')}
              multiLine={true}
              rows={4}
              maxLength="180"
              />
          </div>
          <RaisedButton
            primary={true}
            width="90%"
            style={{marginBottom: "1rem"}}
            onClick={()=>this.debWritePDF()} label="Download Setlist"/>
        </div>
      )
    }
  }
}

export default Setlist
