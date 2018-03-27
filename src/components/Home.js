import React, { Component } from "react";
import Carousel from "nuka-carousel";

const style = {
  width: "100vw",
  maxWidth: "800px",
  maxHeight: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
}
export default class Home extends Component {
  render() {
    return (
      <div
        id="carousel-container"
        style={{
          width: "100vw",
          maxWidth: "800px",
          maxHeight: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          <div className="carousel-summary" style={style}>
            <img src="/android-chrome-256x256.png" alt="256logo" style={{ width: "256px", height: "256px", padding: "20px" }} />
            <p style={{ width: "85vw" }}>BenevoCent - where donations are more fun!</p>
          </div>
          <div className="carousel-summary" style={style}>
            <img src="/svg/coins.svg" alt="coins" style={{ width: "50vw", maxHeight: " 280px", padding: "10px" }} />
            <p style={{ width: "85vw" }}>We round up your purchases to the nearest dollar and donate the change to the charities of your choice.</p>
          </div>
          <div className="carousel-summary" style={style}>
            <img src="/svg/leaf.svg" alt="it's a leaf" style={{ width: "60vw", maxHeight: "300px", padding: "20px" }} />
            <p style={{ width: "85vw" }}>Your donations grow a virtual garden!</p>
          </div>
          <div className="carousel-summary" style={style}>
            <img src="/svg/leaves.svg" alt="it's leaves" style={{ width: "60vw", maxHeight: "300px", padding: "20px" }} />
            <p style={{ width: "85vw" }}>Donate enough and be featured in a charity's community garden!</p>
          </div>
        </Carousel>
      </div>
    );
  }
}
