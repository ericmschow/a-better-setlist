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
    }
  };


  moveCard(dragIndex, hoverIndex) {
    const dragCard = this.props.setlist[dragIndex];
    this.props.setlist.splice(dragIndex, 1);
    this.props.setlist.splice(hoverIndex, 0, dragCard);
    this.props.callbackWithSetlist();
  }

  updateSetlist(){
    this.state.songsSelected.forEach((songid, i, ss) => {
      this.props.setlist.push(this.state.songsStored.find(x => x.id === songid ))
    })
    this.props.callbackWithSetlist()
  }
  // 
  // updateCombo(){
  //   this.updateSetlist();
  //   this.updateDur(this.props.setlist);
  // }
  //
  // debProps = debounce(this.updateCombo, 250, true)
  // componentWillReceiveProps(){
  //   this.debProps();
  // }
  // debSetlist = debounce(this.props.callbackWithSetlist, 350, false)
  // componentWillUpdate(){
  // //  console.log(this.props);
  // //   this.debSetlist(this.state.setlist);
  // }

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
