import React, {Component} from 'react';
// import {AreaChart} from 'react-easy-chart';
import {ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from 'recharts'
import "./Graphs.css"
var debounce = require('debounce')

class Chart extends Component {
  constructor(props){
    super(props)
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    this.state = {
      dataIntensity: [
          { x: 100, y: 20 },
          { x: 200, y: 10 },
          { x: 30, y: 25 }
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

  updateSetlist(){
    let setlist = [];
    this.state.songsSelected.forEach((songid, i, ss) => {
      setlist.push(this.state.songsStored.find(x => x.id === songid ))
    })
    this.setState({setlist: setlist})
    let totalDuration = 0
    setlist.forEach((song)=> {
      totalDuration += song.duration
    })
  }

  deb = debounce(this.updateSetlist, 250, true)
  componentWillReceiveProps(){
    this.deb();
  }

  render(){
    const {dataIntensity, dataResponse} = this.state
    // console.log('dI is ', dataIntensity)
    return(
      <div className="chart">
        <ResponsiveContainer width="80%" height={400}>
          <AreaChart data={dataIntensity}>
            <XAxis />
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='y' stroke='#8884d8' fill='#8884d8' />
          </AreaChart>
        </ResponsiveContainer>

      </div>

    )
  }
}

export default Chart
