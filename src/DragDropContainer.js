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
    // console.log('moveCard songs is ', setlist)
    const dragCard = this.props.setlist[dragIndex];

    this.props.setlist.splice(dragIndex, 1);
    this.props.setlist.splice(hoverIndex, 0, dragCard);
    this.props.callbackWithSetlist();
    // console.log('State after moveCard is now ', this.state.setlist)
  }

  updateSetlist(){
    //let setlist = [];
    this.state.songsSelected.forEach((songid, i, ss) => {
      // console.log('ss foreach songid: ', i, songid)
      this.props.setlist.push(this.state.songsStored.find(x => x.id === songid ))
    })
    //this.setState({setlist: setlist})
    // console.log('setlist updated')
    this.props.callbackWithSetlist()
    // this.state = Object.assign({}, this.state, {setlist: setlist})
  }

  updateCombo(){
    this.updateSetlist();
    this.updateDur(this.props.setlist);
  }

  debProps = debounce(this.updateCombo, 250, true)
  componentWillReceiveProps(){
    //this.debProps();
  }
  debSetlist = debounce(this.props.callbackWithSetlist, 350, false)
  componentWillUpdate(){
  //  console.log(this.props);
  //   this.debSetlist(this.state.setlist);
  }

  render() {
    const { songsStored, songsSelected, setlist } = this.state;
    // const { songsStored, songsSelected} = this.state;
    // console.log('songsSelected in DDC render is ', songsSelected)
    // console.log('ddc render setlist ', setlist)
    // this.debSetlist(setlist)
    return (
      <div style={style}>
        {this.props.setlist.map((song, i) => (
          <Card
            key={song.id}
            index={i}
            id={song.id}
            text={song.name}
            duration={song.duration}
            durString={song.durString}
            intensity={song.intensity}
            moveCard={this.moveCard}
            setlist={() => {this.props.callbackWithSetlist()}}
          />
        ))}
      </div>
    );
  }
}
// export default DragDropContext(HTML5Backend)(Container)
export default DragDropContext(TouchBackend)(DragDropContainer)
