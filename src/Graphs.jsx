import React, {Component} from 'react';
// import {AreaChart} from 'react-easy-chart';
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from 'recharts'
import "./Graphs.css"
var debounce = require('debounce')
//
// class xLabel()
// const labelColor = "#5C6BC0"
// function xLabel() {return(
//   <p style={{color: labelColor}}>Track</p>
// )}

class Chart extends Component {
  constructor(props){
    super(props)
    const initialWidth = window.innerWidth > 0 ? window.innerWidth : 500;
    this.state = {
      data:[],
      songsSelected: props.songsSelected,
      songsStored: props.songsStored,
      setlist: props.setlist,
      showToolTip: false,
      windowWidth: initialWidth - 100,
      value: 1,
      areaKey: 'intensity',
      XAxis: (<XAxis
        dataKey="track"
        fill="#5C6BC0"
        stroke="#333"
        color="#5C6BC0"
        />),
      YAxis: (<YAxis
        dataKey="intensity"
        allowDecimals={false}
        axisType='yAxis'
        type="number"
        stroke="#333"
        domain={[1, 7]}
        ticks={[1, 3, 5, 7]}
        />),
    }
    // initialize default graph
    this.pickXAxis(1);
    this.pickYAxis(1);
  }


  updateGraph(){
    const {setlist, setlistDuration} = this.props;
    // if (setlist){console.log(setlist[0].duration, setlistDuration)}
    console.log('setlist in updateGraph: ', setlist)
    let tempData = [];
    let relativeCheck = 0 // hopefully this sums to 1
    setlist.forEach((song, i, ss) => {
      console.log('song in updateGraph forEach: ', song)
      let track = i+1 // to make 1 indexed since no musician would use a 0 index setlist
      let relativeDuration = song.duration/setlistDuration  // gets percentage of total duration
      relativeCheck += relativeDuration
      console.log('relativeDuration: ', relativeDuration)
      tempData.push(Object.assign({}, song, {track: track, relativeDuration: relativeDuration}))
      }
    )
    console.log('relativeCheck should ~= 1 :', relativeCheck)
    this.setState({data: tempData})
    // console.log('tempData after updateGraph is ',tempData)
  }

  handleChange = (event, index, value) => {
    console.log('handleChange value ', value)
    this.setState({value: value})
    switch (value){
      case 1: this.pickXAxis(1); this.pickYAxis(1); break; // intensity/track
      case 2: this.pickXAxis(1); this.pickYAxis(2); break; // response/track
      case 3: this.pickXAxis(2); this.pickYAxis(1); break; // intensity/minute
      case 4: this.pickXAxis(2); this.pickYAxis(2); break; // response/minute
      default: this.pickXAxis(1); this.pickYAxis(1); // intensity/track
    };
    console.log('this.state.value after handleChange is ', this.state.value)
    this.setState({data: this.state.data}) // refresh graph
  }

// return svg markup for graph, called by dropdown handleChange
  pickXAxis(value){
    switch (value){
      case 1:
        console.log('XAxis is 1')
        this.setState({
          XAxis: (<XAxis
            dataKey="track"
            fill="#5C6BC0"
            stroke="#333"
            color="#5C6BC0"
            />)
        })
        break;
      case 2:
        console.log('XAxis is 2')
        this.setState({
          XAxis: (<XAxis
            dataKey="duration"
            fill="#5C6BC0"
            stroke="#333"
            color="#5C6BC0"
            domain={[1, this.setlistDuration]}
            />)
        })
        break;
      default:
        console.error('Error in pickXAxis, default triggered')
        this.setState({
          XAxis: (<XAxis
            dataKey="track"
            fill="#5C6BC0"
            stroke="#333"
            color="#5C6BC0"
            />)
        })
    }
    this.setState({data: this.state.data});
  }
  pickYAxis(value){
    switch (value) {
      case 1:
        // intensity
        this.setState({
          YAxis: (<YAxis
            dataKey="intensity"
            allowDecimals={false}
            axisType='yAxis'
            type="number"
            stroke="#333"
            domain={[1, 7]}
            ticks={[1, 3, 5, 7]}
            />),
          areaKey: "intensity",
        })
        this.setState({data: this.state.data})
        break;
      case 2:
      // crowd response
        this.setState({
          YAxis: (<YAxis
            dataKey="response"
            allowDecimals={false}
            axisType='yAxis'
            type="number"
            stroke="#333"
            domain={[1, 7]}
            ticks={[1, 3, 5, 7]}
          />),
          areaKey: "response",
        })
        this.setState({data: this.state.data})
        break;
      default:
        console.error('Error in pickYAxis, default triggered')
        this.setState({
          YAxis: (<YAxis
            dataKey="intensity"
            allowDecimals={false}
            axisType='yAxis'
            type="number"
            stroke="#333"
            domain={[1, 7]}
            ticks={[1, 3, 5, 7]}
            />),
          areaKey: "intensity",
        })
    }
  }

  debGraph = debounce(this.updateGraph, 300, true)
  // componentWillReceiveProps(){
  componentWillUpdate(){
    this.debGraph();
  }

  render(){
    const {data} = this.state
    console.log('data is ', data)

    // console.log('graphs setlist is' , this.props.setlist)
    // console.log('dI is ', dataIntensity)

      if (this.state.songsSelected.length < 2) {
        return(
        <div className="chart">
          <p>You need at least two songs in your setlist to draw graphs!<br/><br/> Swipe back and click on some.</p>
        </div>
      )}
    else {
      return (<div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}
          labelStyle={{color:"#eee"}}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
          style={{
            backgroundColor: "rgba(125, 125, 125, 0.4)" ,
            color:"#ccc",
            border: "1px solid #ccc",
            borderRadius: "3px",
            fontSize: "1.5rem",
            marginBottom:"3rem",

          }}
          menuStyle={{
            backgroundColor: "rgba(125, 125, 125, 0.4)",
            containerBackgroundColor: "rgba(125, 125, 125, 0.4)"
          }}
          >
          <MenuItem value={1} primaryText="Intensity per Song" />
          <MenuItem value={2} primaryText="Response per Song"/>

        </DropDownMenu>

      <div className="chart" >

        <ResponsiveContainer width="80%" height={300} >
          <AreaChart data={data} >
            <defs>
              <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e00" stopOpacity={1}/>
                <stop offset="95%" stopColor="#03f" stopOpacity={1}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            {this.state.XAxis}
            {this.state.YAxis}

            <Area type='monotone' dataKey={this.state.areaKey} stroke='#8884d8' fill='url(#colorInt)' />
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  )
    }


  }
}

export default Chart
