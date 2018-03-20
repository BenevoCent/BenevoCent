import React, { Component } from "react";
import Carousel from "nuka-carousel";
import SeedlingSummary from "./SeedlingSummary"

export default class Seedlings extends Component {
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
          <SeedlingSummary/>
          <SeedlingSummary/>
          <SeedlingSummary/>
          <SeedlingSummary/>
        </Carousel>
      </div>
    );
  }
}
