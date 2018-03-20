import React, { Component } from "react";
import Carousel from "nuka-carousel";
import GardenSummary from "./gardenSummary";

export default class Gardens extends Component {
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
          renderCenterLeftControls={({ previousSlide }) => (
            <button onClick={previousSlide}>&lt;</button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button onClick={nextSlide}>&gt;</button>
          )}
        >
          <GardenSummary />
          <GardenSummary />
          <GardenSummary />
          <GardenSummary />
        </Carousel>
      </div>
    );
  }
}
