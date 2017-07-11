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

class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);

    this.state = {
      setlist: props.setlist,
      songs: props.selectedSongs,
      cards: [
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
    };
  }

  moveCard(dragIndex, hoverIndex) {
    const { songs } = this.state;
    const dragCard = songs[dragIndex];

    this.setState(update(this.state, {
      songs: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
    console.log('State is now ', this.state.cards)
  }

  render() {
    const { songs } = this.state;

    return (
      <div style={style}>
        {songs.map((song, i) => (
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
export default DragDropContext(TouchBackend)(Container)
