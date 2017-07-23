import React, {Component} from 'react';
import Tappable from 'react-tappable';
import TextField from 'material-ui/TextField'
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './Songs.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import RaisedButton from 'material-ui/RaisedButton'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
var debounce = require('debounce')
var apikey = require("apikeygen").apikey;

// this view has form modal for creating new song, and a list of all your songs
// stretch goal = sorting options, default alphabetically

// allows single touch to select a song
// "Make a Setlist from these songs" button sends array to setlist component

const ListStyle = {
  width: '90%',
  padding: 0,
  margin: 'auto',
  color: 'black',
  // display: 'flex',
  // flexFlow: "row wrap",

};

var SongStyle = {
  // flex: "0 1 auto",
  // display: 'inlineBlock',
  border: '1px solid gray',
  borderRadius: 3,
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'rgba(256, 256, 256, .7)',
  color: 'black',
  listStyleType:'none',
  listStylePosition:'inside',
};

var SelectedStyle = Object.assign({}, SongStyle, {
    backgroundColor: 'white',
    boxShadow: "0 0 3px 3px lightblue",
  });

const buttonStyle = {
  border: "3px solid grey",
  borderRadius: 5,
  margin: "auto",
  marginTop: 10,
  fontSize: "2.5em",
  position: 'absolute',
  bottom: 20,
}

const modalStyles = {
  zIndex: 10,
  marginTop: 48,
  // backgroundColor: "rgba(255, 255, 255, .8)",
  background: "#rgba(30, 30, 30, .8) url('/img/sheets1.jpeg') no-repeat fixed",
    // top                   : '50%',
    // left                  : '25%',
    // right                 : 'auto',
    // bottom                : 'auto',
    // marginRight           : '-50%',
    // transform             : 'translate(-50%, -50%)'

};

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class Songs extends Component {
  constructor(props){
    super(props)
    this.updateSetlist = props.callbackToUpdateSongsSelected
    this.state = {
      songsSelected: props.songsSelected, // empty array to be filled with song ids in order selected
      songsStored: props.songsStored,
      modalAddIsOpen: false,    // set to false when done testing modal
      modalEditIsOpen: false,
      formSongName: '',
      formSongDuration: 200,
      formSongIntensity: 4,
      formSongResponse: 4,
      editSongId: '',
      editSongName: '',
      editSongDuration: '',
      editSongIntensity: '',
      editSongResponse: '',
      errorModalClassName: 'hidden',
    }
    this.openAddModal = this.openAddModal.bind(this);
    this.closeModals = this.closeModals.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    // console.log("props is ", props)
    // console.log('this.songs is ', this.state.songsStored)
    // console.log('song 1 is ', this.state.songsStored[1])
    // if (this.state.songsStored.length > 6) {
    //   console.log('more than 6 songs')
    //   SongStyle = Object.assign({}, SongStyle, {
    //     width: '30%',
    //     float: 'left',
    //   });
    //   SelectedStyle = Object.assign({}, SongStyle, {
    //     backgroundColor: 'white',
    //     boxShadow: "0 0 3px 3px lightblue",
    //   });
    // }
  }

  updateDur(){
    let totalDuration = 0
    this.props.setlist.forEach((song)=> {
      totalDuration += song.duration
    })
    console.log('updateSetlistDuration', totalDuration)
    // console.log('total duration is ', totalDuration)
    this.props.callbackToUpdateDur(totalDuration)
  }

  openAddModal() {
    this.setState({modalAddIsOpen: true});
  }

  openEditModal(song) {
    // opens edit modal with selected song as default
    // will not overwrite partially completed song in Add modal
    this.setState({
        oldSong: song,
        editSongId: song.id,
        editSongName: song.name,
        editSongDuration: song.duration,
        editSongIntensity: song.intensity,
        editSongResponse: song.response,
        modalEditIsOpen: true
      });
  }

// set both modals to closed to help prevent glitch with modalAdd not resetting
  closeModals() {
    this.setState({modalEditIsOpen: false, modalAddIsOpen: false});
  }

  convertDurToString(input){
    let minutes = Math.floor(input/60);
    let seconds = (input%60).toString()
    seconds = seconds.length == 1 ? '0'+seconds : seconds
    let durString = minutes.toString() + ":" + seconds
    return durString
  }

  debDur = debounce(this.updateDur, 350, false)

  tapSong(song) {
    const {songsSelected} = this.state;
    // on tapping a song, adds SelectedStyle and appends to this.songsSelected
    // if already SelectedStyle, swap to SongStyle and remove from this.songsSelected
    // console.log('tapped on ', song)
    let newSongs = songsSelected
    if (songsSelected.includes(song.id)){
      let index = songsSelected.indexOf(song.id)
      newSongs.splice(index, 1);

    }
    else {
      newSongs.push(song.id)
    }
    this.updateSetlist(newSongs)
    this.debDur()
  }

  addSong() {
    // called via addModal submit button
    // prevent empty string
    if (this.state.formSongName.length === 0){
      this.setState({errorModalClassName: 'visible'})
      return;
    }
    var {songsStored} = this.state;
    let newSong = {
      id: apikey(10),   // generate random ID
      name: this.state.formSongName,    // get info from form
      duration: this.state.formSongDuration,
      intensity: this.state.formSongIntensity,
      response: this.state.formSongResponse,
      durString: this.convertDurToString(this.state.formSongDuration),
    }
    songsStored.push(newSong)   // add to memory array
    // reset state to have default song info for next time
    let newState = Object.assign(
      {},
      this.state,
      {songsStored: songsStored},
      {formSongName: ''},
      {formSongDuration: 200},
      {formSongIntensity: 4},
      {formSongResponse: 4},
      {modalAddIsOpen: false},
      )
    this.setState(newState)
    localStorage.songs = JSON.stringify(songsStored)  // store memory array
  }

  editSong() {
    // called via editModal submit button
    if (this.state.editSongName.length === 0){
      this.setState({errorModalClassName: 'visible'})
      return;
    }
    var {songsStored} = this.state;
    let newSong = {
      id: this.state.editSongId,
      name: this.state.editSongName,
      duration: this.state.editSongDuration,
      intensity: this.state.editSongIntensity,
      response: this.state.editSongResponse,
      durString: this.convertDurToString(this.state.editSongDuration),
    }
    let index = songsStored.indexOf(this.state.oldSong);
    // console.log('index is ', index)
    songsStored[index] = newSong;
    let newState = Object.assign(
      {},
      this.state,
      {songsStored: songsStored},
      {modalEditIsOpen: false},
      {errorModalClassName: 'hidden'},
      )
    this.setState(newState)
    localStorage.songs = JSON.stringify(songsStored)
  }

  // stretch goal - add animation
  deleteSong(){
    var {songsStored} = this.state;
    console.log('delete song')
    let index = songsStored.indexOf(this.state.oldSong);
    console.log('index is ', index)
    songsStored.splice(index, 1);
    let newState = Object.assign(
      {},
      this.state,
      {songsStored: songsStored},
      {modalEditIsOpen: false},
      )
    this.setState(newState)
    localStorage.songs = JSON.stringify(songsStored)
  }

  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  }

  handleSliderChange(value, key) {
    this.setState({[key]: value})
  }

  componentWillMount(){
    if (this.state.songsStored.length > 6) {
      console.log('more than 6 songs')
      SongStyle = Object.assign({}, SongStyle, {
        // width: '40%'
      });
      SelectedStyle = Object.assign({}, SongStyle, {
        backgroundColor: 'white',
        boxShadow: "0 0 3px 3px lightblue",
      })
    }
    // put back to normal if songs deleted
    else {
      // SongStyle = Object.assign({}, SongStyle, {
      //   width: '90%'
      // });
      SelectedStyle = Object.assign({}, SongStyle, {
        backgroundColor: 'white',
        boxShadow: "0 0 3px 3px lightblue",
      });
    }
  }

  render() {
    let songRenderArray = []
    let {songsStored} = this.state;
    let instructions = (songsStored < 5 ? (<p>Tap to select, hold for options!</p>) :  null)
    // sort songs alphabetically
    // extra sort options as stretch goal
    songsStored = songsStored.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    // make array of songs to render
    songsStored.map((s) => {
      // if song has been tapped on, render with SelectedStyle
      if (this.state.songsSelected.includes(s.id)) {
        songRenderArray.push(
          <Tappable
            key={s.id}
            preventDefault={true}
            onTap={(event) => this.tapSong(s)}
            onPress={(event) => this.openEditModal(s)}>
            <li
              key={s.id}
              style={SelectedStyle}
            >
              <strong>{s.name}</strong>
              <br/>
              {s.durString} | Intensity: {s.intensity}/7 | Response: {s.response}/7
            </li>
          </Tappable>
        )
      }
      else{
        songRenderArray.push(
          <Tappable
            key={s.id}
            preventDefault={true}
            onTap={(event) => this.tapSong(s)}
            onPress={(event) => this.openEditModal(s)}>
            <li
              key={s.id}
              style={SongStyle}
            >
              <strong>{s.name}</strong>
              <br/>

              {s.durString} | Intensity: {s.intensity}/7 | Response: {s.response}/7
            </li>
          </Tappable>
        )
      }
    })
    // actually return
    return (
      <div>
        <Modal
          isOpen={this.state.modalEditIsOpen}
          onRequestClose={this.closeModals}
          style={modalStyles}
          contentLabel="Edit Song"
        >
          <h2>Edit Song</h2>
          <form style={{backgroundColor: "#fff"}}>
            <br/>
            <TextField
              style={{size: '1.5em'}}
              hintText="Song name"
              value={this.state.editSongName}
              maxLength={20}
              minLength={1}
              onChange={event => this.handleChange(event, 'editSongName')}
            />
            <br/> <br/>
            <label>
              Length: {this.convertDurToString(this.state.editSongDuration)}
              <Slider
                min={1} max={1500}
                value={this.state.editSongDuration}
                onChange={value => this.handleSliderChange(value, "editSongDuration")}
              />
            </label>
            <br/>
            <label>
              Song Intensity: {this.state.editSongIntensity} / 7
              <Slider
                min={1} max={7} step={1}
                handle={handle}
                value={this.state.editSongIntensity}
                onChange={value => this.handleSliderChange(value, "editSongIntensity")}
              />
            </label>
            <br/>
            <label>
              Crowd Response: {this.state.editSongResponse} / 7
              <Slider
                min={1} max={7} step={1}
                handle={handle}
                value={this.state.editSongResponse}
                onChange={value => this.handleSliderChange(value, "editSongResponse")}
              />
            </label>
          </form>
          <RaisedButton
            label='Tap to Save'
            primary={true}
            style={{position:'absolute', bottom: 100, width: '85%'}}
            onClick={()=>this.editSong()}
          />
          <br/>
          <br/>
          <Tappable
            style={{backgroundColor: "#ef5350"}}
            preventDefault={true}
            onPress={()=>this.deleteSong()}>
            <RaisedButton
              label='Hold to Delete'
              disabled={true}
              disabledBackgroundColor="#ef5350"
              disabledLabelColor="#fff"
              style={{position:'absolute', bottom: 40, width: '85%'}}
            />
          </Tappable>
        </Modal>
        <Modal
          isOpen={this.state.modalAddIsOpen}
          onRequestClose={this.closeModals}
          style={modalStyles}
          contentLabel="Add Song"
        >
          <h2>Add Song</h2>
          <form>
            <br/>
            <TextField
              hintText="Song name"
              value={this.state.formSongName}
              maxLength={20}
              onChange={event => this.handleChange(event, 'formSongName')}
            />
            <br/>
            <p className="hidden">
              Sorry, your song must have a name!
            </p>
            <br/>
            <p style={{marginBottom: ".5em"}}>
              Length: {this.convertDurToString(this.state.formSongDuration)}
            </p>
            <Slider
              min={1} max={1500}
              value={this.state.formSongDuration}
              onChange={value => this.handleSliderChange(value, "formSongDuration")}
            />
            <br/>
            <p style={{marginBottom: '.5em'}}>
              Song Intensity: {this.state.formSongIntensity} / 7
            </p>
            <Slider
              min={1} max={7} step={1}
              handle={handle}
              value={this.state.formSongIntensity}
              onChange={value => this.handleSliderChange(value, "formSongIntensity")}
            />
            <br/>
            <p style={{marginBottom: '.5em'}}>
              Crowd Response: {this.state.formSongResponse} / 7
            </p>
            <Slider
              min={1} max={7} step={1}
              handle={handle}
              value={this.state.formSongResponse}
              onChange={value => this.handleSliderChange(value, "formSongResponse")}
            />
          </form>
          <RaisedButton
            style={{position:'absolute', bottom: 40, width: '85%'}}
            label='Tap to Save'
            primary={true}
            onClick={()=>this.addSong()}
          />
        </Modal>

        {instructions}
        <ul style={ListStyle}>
          <Tappable onTap={()=>this.openAddModal()}>
            <li className="songClass">
              <strong>Add a new song!</strong>
              <br/>Press here
            </li>
          </Tappable>

          {songRenderArray}
        </ul>
      </div>
    )
  }
}

export default Songs
