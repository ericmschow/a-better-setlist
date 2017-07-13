import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import Card from './Card';
var debounce = require('debounce')


const style = {
  width: '90%',
  margin: 'auto',
  color: 'black',

};

class DragDropContainer extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);

    this.state = {
      songsSelected: props.songsSelected,
      songsStored: props.songsStored,
      setlist: [],
      cards:   [
          {
            id: 1,
            text: 'Write a cool JS library',
          }, {
            id: 2,
            text: 'Make it generic enough',
          }, {
            id: 3,
            text: 'Write README',
          }, {
            id: 4,
            text: 'Create some examples',
          }, {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
          }, {
            id: 6,
            text: '???',
          }, {
            id: 7,
            text: 'PROFIT',
          }
        ],
    }
    // for (let i = 0; i < this.state.songsSelected.length; i++) {
    //   setlist.push(this.state.songsStored[this.state.songsSelected[i]])
    // }

    // let setlist=[];
    // this.state.songsSelected.forEach((songid, i, ss) => {
    //   setlist.push(this.state.songsStored.find(x => x.id === songid ))
    // })
    // this.state = Object.assign({}, this.state, {setlist: setlist})

    //console.log('dragdrop this setlist is ', this.state.setlist)
    // console.log('dragdrop end of constructor state is ', this.state)
  };


  moveCard(dragIndex, hoverIndex) {
    // console.log('moveCard beginning state is ', this.state)
    const { setlist } = this.state;
    // console.log('moveCard songs is ', setlist)
    const dragCard = setlist[dragIndex];

    this.setState(update(this.state, {
      setlist: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
    // console.log('State after moveCard is now ', this.state.setlist)
  }

  updateSetlist(){
    let setlist = [];
    this.state.songsSelected.forEach((songid, i, ss) => {
      console.log('ss foreach songid: ', i, songid)
      setlist.push(this.state.songsStored.find(x => x.id === songid ))
    })
    this.setState({setlist: setlist})
    console.log('setlist updated')
    let totalDuration = 0
    setlist.forEach((song)=> {
      totalDuration += song.duration
    })
    console.log('total duration is ', totalDuration)
    this.props.callbackToUpdateDur(totalDuration)
    // this.state = Object.assign({}, this.state, {setlist: setlist})
  }

  deb = debounce(this.updateSetlist, 250, true)

  componentWillReceiveProps(){
    console.log('DDC will receive props')
    // let deb = debounce(this.updateSetlist, 500, true)
    this.deb();
  }

  render() {

    debounce(()=>{console.log('debounced'), 100})
    const { songsStored, songsSelected, setlist } = this.state;

    // const { songsStored, songsSelected} = this.state;
    // console.log('songsSelected in DDC render is ', songsSelected)
    console.log('ddc render setlist ', setlist)
    return (
      <div style={style}>
        {setlist.map((song, i) => (
          <Card
            key={song.id}
            index={i}
            id={song.id}
            text={song.name}
            duration={song.duration}
            intensity={song.intensity}
            moveCard={this.moveCard}
          />
        ))}
      </div>
    );
  }
}
// export default DragDropContext(HTML5Backend)(Container)
export default DragDropContext(TouchBackend)(DragDropContainer)
