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

// const NotAxisTickButLabel = props=> ( <g transform={  "translate( " + props.x + "," + props.y + " )" }><text x={0} y={0} dy={16}  fontFamily="Roboto"  fontSize="10px"  textAnchor="end"  fill={props.color || "#8884d8" } transform={"rotate(" + props.angle + ")" } >{props.payload}</text></g>   )

const WhiteLabel = ({ x, y, stroke, value }) => {
  return (
    <div style={{ color: '#FFFFFF' }}>
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>);
    </div>
  );
};

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
      valueX: 1,
      valueY: 1,
    }

  }


  updateGraph(){
    const {dataIntensity, dataResponse} = this.state;
    const {setlist, setlistDuration} = this.props;
    // if (setlist){console.log(setlist[0].duration, setlistDuration)}

    let tempData = [];
    setlist.forEach((song, i, ss) => {
      tempData.push(Object.assign({}, song, {track: i+1, relativeDuration: song.duration/setlistDuration}))
    })
    this.setState({data: tempData})
    // console.log('tempData after updateGraph is ',tempData)
  }

  handleChange = (event, index, value) => {
    console.log('handleChange value ', value)
    switch (value){
      case 1: this.setState({value: 1, valueX: 1, valueY: 1}); // intensity/track
      case 2: this.setState({value: 2, valueX: 1, valueY: 2}); // response/track
      case 3: this.setState({value: 3, valueX: 2, valueY: 1}); // intensity/minute
      case 4: this.setState({value: 4, valueX: 2, valueY: 2}); // response/minute
      default: this.setState({value: 1, valueX: 1, valueY: 1}); // intensity/track
    }
  }


  pickXAxis(){
    switch (this.state.valueX){
      case 1: {return (<XAxis
      dataKey="track"
      fill="#5C6BC0"
      stroke="#333"
      color="#5C6BC0"
      />)}
      case 2: {return (<XAxis
      dataKey="duration"
      fill="#5C6BC0"
      stroke="#333"
      color="#5C6BC0"
      domain={[1, this.setlistDuration]}
      />)}

    }
  this.setState({valueX:this.state.valueX})
  }
  pickYAxis(){
    switch (this.state.valueY){
      case 1: {return (<YAxis
        dataKey="intensity"
        allowDecimals={false}
        axisType='yAxis'
        type="number"
        stroke="#333"
        domain={[1, 7]}
        ticks={[1, 3, 5, 7]}
        />)}
      case 2: {return (<YAxis
        dataKey="response"
        allowDecimals={false}
        axisType='yAxis'
        type="number"
        stroke="#333"
        domain={[1, 7]}
        ticks={[1, 3, 5, 7]}
        />)}
    }
  }

  deb = debounce(this.updateGraph, 250, true)
  componentWillReceiveProps(){
    this.deb();
  }

  render(){
    const {data} = this.state
    console.log('axes values are ', this.state.valueX, this.state.valueY)

    // console.log('graphs setlist is' , this.props.setlist)
    // console.log('dI is ', dataIntensity)

      if (this.state.songsSelected.length < 2) {
        return(
        <div style={{margin: "1em" }} className="chart">
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
          <MenuItem value={3} primaryText="Intensity per Minute"/>
          <MenuItem value={4} primaryText="Response per Minute" disabled={true}/>
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
            {this.pickXAxis()}
            {this.pickYAxis()}

            <Area type='monotone' dataKey='intensity' stroke='#8884d8' fill='url(#colorInt)' />
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  )
    }


  }
}

export default Chart
