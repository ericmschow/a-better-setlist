import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import Card from './Card';


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
    let setlist = [];
    // for (let i = 0; i < this.state.songsSelected.length; i++) {
    //   setlist.push(this.state.songsStored[this.state.songsSelected[i]])
    // }
    this.state.songsSelected.forEach((songid, i, ss) => {
      setlist.push(this.state.songsStored.find(x => x.id === songid ))
    })
    this.state = Object.assign({}, this.state, {setlist: setlist})
    console.log('dragdrop this setlist is ', this.state.setlist)
    console.log('dragdrop end of constructor state is ', this.state)
  };


  moveCard(dragIndex, hoverIndex) {
    console.log('moveCard beginning state is ', this.state)
    const { setlist } = this.state;
    console.log('moveCard songs is ', setlist)
    const dragCard = setlist[dragIndex];

    this.setState(update(this.state, {
      setlist: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
    console.log('State is now ', this.state.setlist)
  }

  render() {
    const { setlist } = this.state;

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
