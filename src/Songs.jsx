import React, {Component} from 'react';
import Tappable from 'react-tappable';
import ReactDOM from 'react-dom';
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

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '25%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
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
      selectedSongs: [], // empty array to be filled with song ids in order selected
      songsStored: props.songsStored,
      modalAddIsOpen: false,    // set to false when done testing modal
      formSongName: '',
      formSongDuration: 3,
      formSongIntensity: 4,
    }
    this.openModal = this.openModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    // console.log("props is ", props)
    console.log('this.songs is ', this.state.songsStored)
    // console.log('song 1 is ', this.state.songsStored[1])
  }

  openModal() {
    this.setState({modalAddIsOpen: true});
  }

  closeAddModal() {
    this.setState({modalAddIsOpen: false});
  }

  // songTouchStart(song) {
  //   console.log('started touch on ', song)
  //   this.updateSetlist(song)
  // }
  //
  // songTouchEnd(song){
  //   console.log('ended touch on ', song)
  // }

  tapSong(song) {
    // on tapping a song, adds SelectedStyle and appends to this.selectedSongs
    // if already SelectedStyle, swap to SongStyle and remove from this.selectedSongs
    console.log('tapped on ', song)
  }

  longPressSong(song) {
    // on touching a song, presents options EDIT or DELETE
    console.log('long pressed ', song)
  }

  openAddSongForm() {
    // called via "Add a new song" li
  }

  addSong() {
    var {songsStored} = this.state;
    let newSong = {
      id: apikey(10),
      name: this.state.formSongName,
      duration: this.state.formSongDuration,
      intensity: this.state.formSongIntensity,
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
    // called via selecting EDIT in longPressSong
    // opens song edit form with song info as default
  }

  handleChange(event, key) {
    this.setState({[key]: event.target.value});
  }
  handleSliderChange(value, key) {
    this.setState({[key]: value})
  }

  render() {
    let songRenderArray = []
    const selectedClasses = "songClass selectedClass"
    this.state.songsStored.map((s) => {
      songRenderArray.push(
        <Tappable
          onTap={(event) => this.tapSong(s)}
          onPress={(event) => this.longPressSong(s)}>
          <li
            key={s.id}
            style={SongStyle} >
            <strong>{s.name}</strong>
            <br/>

            Length: {s.duration}m <span style={{color: 'blue'}}>|</span> Intensity: {s.intensity}/7
          </li>
        </Tappable>
      )
    })
    return (
      <div>
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
              Duration: {this.state.formSongDuration} minutes
              <Slider
                min={0} max={20} step={0.5}
                handle={handle}
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

          <li className={selectedClasses}>
            <strong>Aura</strong>
            <br/>

            Length: 6m <span style={{color: 'blue'}}>|</span> Intensity: 3/7
          </li>
          <Tappable onTap={this.openModal}>
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
