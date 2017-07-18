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
        ],
      dataResponse:[
        ],
      songsSelected: props.songsSelected,
      songsStored: props.songsStored,
      setlist: props.setlist,
      showToolTip: false,
      windowWidth: initialWidth - 100
      }

  }

  updateGraph(){
    const {dataIntensity, dataResponse} = this.state;
    const {setlist} = this.props;
    let tempIntensity = [];
    setlist.forEach((song, i, ss) => {
      tempIntensity.push({x: song.duration, y: song.intensity})
    })
    // uncomment when response added to songs
    let tempResponse = [];
    // setlist.forEach((song, i, ss) => {
    //   tempResponse.push({x: song.duration, y: song.response} ))
    // })
    this.setState({dataIntensity: tempIntensity, dataResponse: tempResponse})
    console.log('tempIntensity after updateGraph is ',tempIntensity)
  }

  deb = debounce(this.updateGraph, 250, true)
  componentWillReceiveProps(){
    this.deb();
  }

  render(){
    const {dataIntensity, dataResponse} = this.state
    console.log('graphs setlist is' , this.props.setlist)
    // console.log('dI is ', dataIntensity)
    return(
      <div className="chart">
        <ResponsiveContainer width="80%" height={400}>
          <AreaChart data={dataIntensity}>
            <defs>
              <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f00" stopOpacity={1}/>
                <stop offset="95%" stopColor="#00f" stopOpacity={1}/>
              </linearGradient>
            </defs>
            <XAxis />
            <YAxis />
            
            <Area type='monotone' dataKey='y' stroke='#8884d8' fill='url(#colorInt)' />
          </AreaChart>
        </ResponsiveContainer>

      </div>

    )
  }
}

export default Chart
