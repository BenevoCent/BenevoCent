import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


export default class SeedlingSummary extends Component {

  style = {
    margin: 12,
  };

  render() {
    return (
      <div id="carousel-summary">
        <h3>{this.props.seed}</h3>
        <img src={`/svg/${this.props.seed}.svg` } alt={`it's a ${this.props.seed}`}/>
        <div>Price: ${this.props.price.toFixed(2)}</div>
        {
          this.props.selected === this.props.seed ? ( <RaisedButton  label="Selected" disabled={true} style={this.style} /> ) : ( <RaisedButton label="Select" primary={true} style={this.style} />)
        }
      </div>
    );
  }
}
