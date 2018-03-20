import React, { Component } from "react";
import Carousel from "nuka-carousel";

const style = {
  width: "100vw",
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
            <h1>Welcome to BenevoCent!</h1>
            <p>Donate to charitable causes automatically</p>
          </div>
          <div className="carousel-summary" style={style}>
            <h1>Change</h1>
            <p>We round up your purchases to the next dollar and donate the change to a charity of your choice.</p>
          </div>
          <div className="carousel-summary" style={style}>
            <img src="/svg/leaf.svg" alt="it's a leaf" style={{width: "50vw"}}/>
            <p>By donating, you grow your virtual "garden"</p>
          </div>
          <div className="carousel-summary" style={style}>
            <img src="/svg/leaves.svg" alt="it's leaves" style={{width: "50vw"}}/>
            <p>Can can also join "Community Gardens" together with your friends</p>
          </div>
        </Carousel>
      </div>
    );
  }
}
