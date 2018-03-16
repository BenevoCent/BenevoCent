import React, { Component } from "react";
import Carousel from "nuka-carousel";
import GardenSummary from "./gardenSummary";

export default class Home extends Component {
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
          // renderTopCenterControls={({ currentSlide }) => (
          //   <div>Slide: {currentSlide}</div>
          // )}
          renderCenterLeftControls={({ previousSlide }) => (
            <button onClick={previousSlide}>&lt;</button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button onClick={nextSlide}>&gt;</button>
          )}
        >
          {
            // <img src="http://placehold.it/400x400/ffffff/c0392b/&text=slide1" />
            // <img src="http://placehold.it/400x400/ffffff/c0392b/&text=slide2" />
            // <img src="http://placehold.it/400x400/ffffff/c0392b/&text=slide3" />
            // <img src="http://placehold.it/400x400/ffffff/c0392b/&text=slide4" />
            // <img src="http://placehold.it/400x400/ffffff/c0392b/&text=slide5" />
            // <img src="http://placehold.it/400x400/ffffff/c0392b/&text=slide6" />
          }
          <GardenSummary />
          <GardenSummary />
          <GardenSummary />
          <GardenSummary />
        </Carousel>
      </div>
    );
  }
}
