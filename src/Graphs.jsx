import React, {Component} from 'react';
import {AreaChart} from 'react-easy-chart';
import "./Graphs.css"
var debounce = require('debounce')

class Chart extends Component {
  constructor(props){
    super(props)
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    this.state = {
      dataIntensity: [
          { x: '100', y: 20 },
          { x: '200', y: 10 },
          { x: '300', y: 25 }
        ],
      dataResponse:[
          { x: '600', y: 10 },
          { x: '60', y: 12 },
          { x: '180', y: 4 }
        ],
      songsSelected: props.songsSelected,
      songsStored: props.songsStored,
      setlist: [],
      showToolTip: false,
      windowWidth: initialWidth - 100
      }

  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.handleResize);
  }

  updateSetlist(){
    let setlist = [];
    this.state.songsSelected.forEach((songid, i, ss) => {
      // console.log('ss foreach songid: ', i, songid)
      setlist.push(this.state.songsStored.find(x => x.id === songid ))
    })
    this.setState({setlist: setlist})
    // console.log('setlist updated')
    let totalDuration = 0
    setlist.forEach((song)=> {
      totalDuration += song.duration
    })
    // console.log('total duration is ', totalDuration)
    this.props.callbackToUpdateDur(totalDuration)
    // this.state = Object.assign({}, this.state, {setlist: setlist})
  }

  deb = debounce(this.updateSetlist, 250, true)
  componentWillReceiveProps(){
    this.deb();
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth - 100});
  }

  render(){
    const {dataIntensity, dataResponse} = this.state
    return(
      <div className="chart">
        <AreaChart
          axes
          xType={'time'}
          tickTimeDisplayFormat={'%M:%S'}
          width={this.state.windowWidth}
          height={this.state.windowWidth / 2}
          xTicks={60}
          yTicks={1}
          interpolate={"cardinal"}
          axisLabels={{x: 'Time', y: 'Intensity'}}
          margin={{top: 30, right: 30, bottom: 30, left: 30}}
          data={[
            dataIntensity, dataResponse
          ]}
        />
      </div>

    )
  }
}

export default Chart
