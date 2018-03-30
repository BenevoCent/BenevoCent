import React, { Component } from 'react';

const containerStyle = {
  // container: {
    height: '60vw',
    width: '60vw',
    maxWidth: '620px',
    maxHeight: '620px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '1vw',
    transformStyle: 'preserve-3d',
    transform: 'perspective(3000px) rotateX(45deg) rotateZ(45deg)',
    backgroundColor: 'mediumseagreen',
    boxShadow: '18px 18px 10px grey',
  // },
  // cell:{
  //   height: "17.33vw",
  //   width: "17.33vw",
  //   padding: "1vw",
  //   margin: "1vw",
  //   backgroundColor: "#7c684c"
  // }
};

// const imageStyle = {
//   transform: 'rotateZ(-45deg)'
// }

export default class GardenGridV2 extends Component {
  state = {
    // hover: false,
    // plots: [false,false,false,false,false,false,false,false,false]
    zero: false,
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,

  };

  // toggleHover = () => {
  //   this.setState({ hover: !this.state.hover });
  // }

  // togglePlot = (num) => {
  //   let newPlots = this.state.plots;
  //   newPlots[num] = !newPlots[num]
  //   this.setState({ plots: newPlots });
  // }


  truezero = () => {
    this.setState({ zero: true });
  }
  trueone = () => {
    this.setState({ one: true });
  }
  truetwo = () => {
    this.setState({ two: true });
  }
  truethree = () => {
    this.setState({ three: true });
  }
  truefour = () => {
    this.setState({ four: true });
  }
  truefive = () => {
    this.setState({ five: true });
  }
  truesix = () => {
    this.setState({ six: true });
  }
  trueseven = () => {
    this.setState({ seven: true });
  }
  trueeight = () => {
    this.setState({ eight: true });
  }

  falsezero = () => {
    this.setState({ zero: false });
  }
  falseone = () => {
    this.setState({ one: false });
  }
  falsetwo = () => {
    this.setState({ two: false });
  }
  falsethree = () => {
    this.setState({ three: false });
  }
  falsefour = () => {
    this.setState({ four: false });
  }
  falsefive = () => {
    this.setState({ five: false });
  }
  falsesix = () => {
    this.setState({ six: false });
  }
  falseseven = () => {
    this.setState({ seven: false });
  }
  falseeight = () => {
    this.setState({ eight: false });
  }


  render() {

    let gardenPlots = [];
    for (let i = 0; i < this.props.plots.length; i++) {
      let topLayer = null;
      if (this.props.plots[i] !== null) {topLayer = `/svg/${this.props.plots[i]}.svg`;}
      gardenPlots.push(topLayer);
    }

    // let gardenPlots = [];
    // for (let i = 0; i < this.props.plots.length; i++) {
    //   let topLayer = null;
    //   if (this.props.plots[i] !== null && i % 2 === 0) {topLayer = 'https://drive.google.com/uc?export=download&id=1WaM4QBv5wkw5LEUksDuQVlU53J99-F3d';}
    //   else if (this.props.plots[i] !== null && i % 2 === 1) {topLayer = 'https://drive.google.com/uc?export=download&id=1BzeU34dsK6eZSFehUrH088zCtg5RVVQt';}


    //   //if (this.props.plots[i] !== null) {topLayer = `/svg/${this.props.plots[i]}.svg`;}
    //   gardenPlots.push(topLayer);
    // }

    // let cellStyle = {};
    // if (!this.state.hover){
    //   cellStyle = {
    //     height: "17.33vw",
    //     width: "17.33vw",
    //     padding: "1vw",
    //     margin: "1vw",
    //     backgroundColor: "#7c684c",
    //     transition: "all 0.5s ease"
    //   };
    // }
    // else {
    //   cellStyle = {
    //     height: "17.33vw",
    //     width: "17.33vw",
    //     padding: "1vw",
    //     margin: "1vw",
    //     backgroundColor: "#7c684c",
    //     transition: "all 0.5s",
    //     transform: "translateZ(20px)",
    //   };
    // }

    let normalstyle = {
      height: '17.33vw',
      width: '17.33vw',
      maxWidth: '155px',
      maxHeight: '155px',
      padding: '1vw',
      margin: '1vw',
      backgroundColor: '#7c684c',
      transition: 'all 0.2s ease',
      borderStyle: 'solid',
      borderColor: '#8e795b',
    };
    let hoverstyle = {
      height: '17.33vw',
      width: '17.33vw',
      maxWidth: '155px',
      maxHeight: '155px',
      padding: '1vw',
      margin: '1vw',
      backgroundColor: '#7c684c',
      transition: 'all 0.2s',
      transform: 'translateZ(20px)',
      boxShadow: '10px 10px 5px green',
      borderStyle: 'solid',
      borderColor: '#8e795b',
    };
    let zerostyle, onestyle, twostyle, threestyle, fourstyle, fivestyle, sixstyle, sevenstyle, eightstyle
    zerostyle = onestyle = twostyle = threestyle = fourstyle = fivestyle = sixstyle = sevenstyle = eightstyle = {}
    if (!this.state.zero){zerostyle = normalstyle} else {zerostyle = hoverstyle}
    if (!this.state.one){onestyle = normalstyle} else {onestyle = hoverstyle}
    if (!this.state.two){twostyle = normalstyle} else {twostyle = hoverstyle}
    if (!this.state.three){threestyle = normalstyle} else {threestyle = hoverstyle}
    if (!this.state.four){fourstyle = normalstyle} else {fourstyle = hoverstyle}
    if (!this.state.five){fivestyle = normalstyle} else {fivestyle = hoverstyle}
    if (!this.state.six){sixstyle = normalstyle} else {sixstyle = hoverstyle}
    if (!this.state.seven){sevenstyle = normalstyle} else {sevenstyle = hoverstyle}
    if (!this.state.eight){eightstyle = normalstyle} else {eightstyle = hoverstyle}

    return (
      <div id="carousel-summary">
        <h4>Total Donations: ${this.props.monthlyDonation}</h4>
        <div className="container" style={containerStyle}>
          <div className="cell" style={zerostyle} onMouseEnter={this.truezero} onMouseLeave={this.falsezero}>
            {gardenPlots[0] ? <img src={gardenPlots[0]} alt="cell" /> : null}
          </div>
          <div className="cell" style={onestyle} onMouseEnter={this.trueone} onMouseLeave={this.falseone}>
            {gardenPlots[1] ? <img src={gardenPlots[1]} alt="cell" /> : null}
          </div>
          <div className="cell" style={twostyle} onMouseEnter={this.truetwo} onMouseLeave={this.falsetwo}>
            {gardenPlots[2] ? <img src={gardenPlots[2]} alt="cell" /> : null}
          </div>
          <div className="cell" style={threestyle} onMouseEnter={this.truethree} onMouseLeave={this.falsethree}>
            {gardenPlots[3] ? <img src={gardenPlots[3]} alt="cell" /> : null}
          </div>
          <div className="cell" style={fourstyle} onMouseEnter={this.truefour} onMouseLeave={this.falsefour}>
            {gardenPlots[4] ? <img src={gardenPlots[4]} alt="cell" /> : null}
          </div>
          <div className="cell" style={fivestyle} onMouseEnter={this.truefive} onMouseLeave={this.falsefive}>
            {gardenPlots[5] ? <img src={gardenPlots[5]} alt="cell" /> : null}
          </div>
          <div className="cell" style={sixstyle} onMouseEnter={this.truesix} onMouseLeave={this.falsesix}>
            {gardenPlots[6] ? <img src={gardenPlots[6]} alt="cell" /> : null}
          </div>
          <div className="cell" style={sevenstyle} onMouseEnter={this.trueseven} onMouseLeave={this.falseseven}>
            {gardenPlots[7] ? <img src={gardenPlots[7]} alt="cell" /> : null}
          </div>
          <div className="cell" style={eightstyle} onMouseEnter={this.trueeight} onMouseLeave={this.falseeight}>
            {gardenPlots[8] ? <img src={gardenPlots[8]} alt="cell" /> : null}
          </div>
        </div>
      </div>
    );
  }
}
