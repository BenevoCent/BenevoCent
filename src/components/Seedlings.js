import React, { Component } from "react";
import Carousel from "nuka-carousel";
import SeedlingSummary from "./SeedlingSummary"

export default class Seedlings extends Component {
  state = {
    selected: "carrot",
  };

  handleSelect = (value) => this.setState({ selected: value});

  render() {
    return (
      <div
        id="carousel-container"
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Carousel
        renderBottomCenterControls={({ currentSlide }) => (
            <div>Seedling: {currentSlide}</div>
          )}
          renderCenterLeftControls={({ previousSlide }) => (
            <button onClick={previousSlide}>&lt;</button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button onClick={nextSlide}>&gt;</button>
          )}
        >
          <SeedlingSummary seed={"carrot"} price={5} selected={this.state.selected} handleSelect={this.handleSelect}/>
          <SeedlingSummary seed={"radish"} price={5} selected={this.state.selected } handleSelect={this.handleSelect}/>
          <SeedlingSummary seed={"eggplant"} price={5} selected={this.state.selected} handleSelect={this.handleSelect}/>
          <SeedlingSummary seed={"broccoli"} price={5} selected={this.state.selected} handleSelect={this.handleSelect}/>
          <SeedlingSummary seed={"grapes"} price={5} selected={this.state.selected} handleSelect={this.handleSelect}/>
          <SeedlingSummary seed={"onion"} price={5} selected={this.state.selected} handleSelect={this.handleSelect}/>
          <SeedlingSummary seed={"peas"} price={5} selected={this.state.selected} handleSelect={this.handleSelect}/>
          <SeedlingSummary seed={"pumpkin"} price={5} selected={this.state.selected} handleSelect={this.handleSelect}/>
          <SeedlingSummary seed={"strawberry"} price={5} selected={this.state.selected} handleSelect={this.handleSelect}/>
        </Carousel>
      </div>
    );
  }
}
