import React, {Component} from 'react';
import Tappable from 'react-tappable';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './Songs.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
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

};

const SongStyle = {
  border: '1px solid gray',
  borderRadius: 3,
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'rgba(256, 256, 256, .8)',
  color: 'black',
  listStyleType:'none',
  listStylePosition:'inside',
};

const SelectedStyle = {
  border: '1px solid gray',
  borderRadius: 3,
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  color: 'black',
  listStyleType:'none',
  listStylePosition:'inside',
  boxShadow: "0 0 3px 3px lightblue",
};

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
      editSongId: '',
      editSongName: '',
      editSongDuration: '',
      editSongIntensity: '',
    }
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    // console.log("props is ", props)
    // console.log('this.songs is ', this.state.songsStored)
    // console.log('song 1 is ', this.state.songsStored[1])
  }

  openAddModal() {
    this.setState({modalAddIsOpen: true});
  }

  closeAddModal() {
    this.setState({modalAddIsOpen: false});
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
        modalEditIsOpen: true
      });
  }

  closeEditModal() {
    this.setState({modalEditIsOpen: false});
  }

  convertDurToString(input){
    let minutes = Math.floor(input/60);
    let seconds = (input%60).toString()
    seconds = seconds.length == 1 ? '0'+seconds : seconds
    let durString = minutes.toString() + ":" + seconds
    return durString
  }

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
  }

  addSong() {
    var {songsStored} = this.state;
    let newSong = {
      id: apikey(10),
      name: this.state.formSongName,
      duration: this.state.formSongDuration,
      intensity: this.state.formSongIntensity,
      durString: this.convertDurToString(this.state.formSongDuration),
    }
    songsStored.push(newSong)
    let newState = Object.assign(
      {},
      this.state,
      {songsStored: songsStored},
      {formSongName: ''},
      {formSongDuration: 3},
      {formSongIntensity: 4},
      {modalAddIsOpen: false},
      )
    this.setState(newState)
    localStorage.songs = JSON.stringify(songsStored)
    // called via submit button
    // adds song to localStorage
    // sets state

  }

  editSong() {
    var {songsStored} = this.state;
    let newSong = {
      id: this.state.editSongId,
      name: this.state.editSongName,
      duration: this.state.editSongDuration,
      intensity: this.state.editSongIntensity,
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
      )
    this.setState(newState)
    localStorage.songs = JSON.stringify(songsStored)
  }

  // stretch goal - add animation
  deleteSong(){
    var {songsStored} = this.state;
    let index=songsStored.indexOf(this.state.oldSong);
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

  render() {
    let songRenderArray = []
    let {songsStored} = this.state;
    songsStored = songsStored.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    const {editSongDuration, formSongDuration} = this.state;
    let addMinutes = Math.floor(formSongDuration/60);
    let addSeconds = (formSongDuration%60).toString()
    addSeconds = addSeconds.length == 1 ? '0'+addSeconds : addSeconds
    let editMinutes = Math.floor(editSongDuration/60);
    let editSeconds = (editSongDuration%60).toString()
    editSeconds = editSeconds.length == 1 ? '0'+editSeconds : editSeconds
    // console.log('songsStored in songs render is ', songsStored)
    songsStored.map((s) => {

      if (this.state.songsSelected.includes(s.id)) {
        songRenderArray.push(
          <Tappable
            key={s.id}
            preventDefault={true}
            onTap={(event) => this.tapSong(s)}
            onPress={(event) => this.openEditModal(s)}>
            <li
              key={s.id}
              style={SelectedStyle} >
              <strong>{s.name}</strong>
              <br/>

              Length: {s.durString} <span style={{color: 'blue'}}>|</span> Intensity: {s.intensity}/7
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
              style={SongStyle} >
              <strong>{s.name}</strong>
              <br/>

              Length: {s.durString} <span style={{color: 'blue'}}>|</span> Intensity: {s.intensity}/7
            </li>
          </Tappable>
        )
      }
    })
    return (
      <div>
        <Modal
          isOpen={this.state.modalEditIsOpen}
          onRequestClose={this.closeEditModal}
          style={modalStyles}
          contentLabel="Edit Song"
          >
          <h2>Edit Song</h2>
          <form>
            <label>
              Name:
              <br/>
              <input type="text"
                style={{border: "1px solid grey",
                  borderRadius: 2,
                  padding: "3px 0",
                  width: "100%"
                }}
                value={this.state.editSongName}
                onChange={event => this.handleChange(event, 'editSongName')} />
            </label>
            <br/> <br/>
            <label>
              Length: {editMinutes}:{editSeconds}
              <Slider
                min={0} max={1500}

                value={this.state.editSongDuration}

                onChange={value => this.handleSliderChange(value, "editSongDuration")}
                />
            </label>
            <br/>
            <label>
              Intensity: {this.state.editSongIntensity} / 7
              <Slider
                min={0} max={7} step={1}
                handle={handle}
                value={this.state.editSongIntensity}

                onChange={value => this.handleSliderChange(value, "editSongIntensity")}
                />
            </label>
          </form>
          <button
            style={Object.assign({}, buttonStyle, {right: 20})}
            onClick={()=>this.editSong()}>Save
          </button>
          <button
            style={Object.assign({}, buttonStyle,
            {color: 'red',left: 20,  border: "3px solid red",})
            }
            onClick={()=>this.deleteSong()}>Delete
          </button>
        </Modal>



        <Modal
          isOpen={this.state.modalAddIsOpen}
          onRequestClose={this.closeAddModal}
          style={modalStyles}
          contentLabel="Add Song"
        >

          <h2>Add Song</h2>

          <form>
            <label>
              Name:
              <br/>
              <input type="text"
                style={{border: "1px solid grey",
                  borderRadius: 2,
                  padding: "3px 0",
                  width: "100%"
                }}
                value={this.state.formSongName}
                onChange={event => this.handleChange(event, 'formSongName')} />
            </label>
            <br/> <br/>
            <label>
              Length: {addMinutes}:{addSeconds}
              <Slider
                min={0} max={1500}

                value={this.state.formSongDuration}

                onChange={value => this.handleSliderChange(value, "formSongDuration")}
                />
            </label>
            <br/>
            <label>
              Intensity: {this.state.formSongIntensity} / 7
              <Slider
                min={0} max={7} step={1}
                handle={handle}
                value={this.state.formSongIntensity}

                onChange={value => this.handleSliderChange(value, "formSongIntensity")}
                />
            </label>
          </form>
          <button
            style={{
              border: "1px solid grey",
              borderRadius: 2,
              margin: "auto",
              marginTop: 10,
            }}
            onClick={()=>this.addSong()}>Add Song</button>
        </Modal>

        <ul style={ListStyle}>
          {songRenderArray}
          <Tappable onTap={this.openAddModal}>
            <li
              className="songClass"
              style={{backgroundColor: 'rgba(255, 255, 255, .6)'}}
              >
              <strong>Add a new song!</strong>
              <br/>Press here
            </li>
          </Tappable>

        </ul>
      </div>
    )
  }
}

export default Songs
