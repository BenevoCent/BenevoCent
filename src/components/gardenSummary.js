import React, { Component } from 'react';

export default class GardenSummary extends Component {
  render() {
    return (
      <div id="carousel-summary">
        <div>$40.32 donated this month</div>
        <div className="garden-grid">
          <div id="garden-plot-1"><img src="/svg/carrot.svg" alt="it's a carrot"/></div>
          <div id="garden-plot-2"><img src="/svg/radish-1.svg" alt="it's a carrot"/></div>
          <div id="garden-plot-3"><img src="/svg/aubergine.svg" alt="it's a carrot"/></div>
          <div id="garden-plot-4"><img src="/svg/broccoli.svg" alt="it's a carrot"/></div>
          <div id="garden-plot-5"><img src="/svg/grapes.svg" alt="it's a carrot"/></div>
          <div id="garden-plot-6"><img src="/svg/onion.svg" alt="it's a carrot"/></div>
          <div id="garden-plot-7"><img src="/svg/peas.svg" alt="it's a carrot"/></div>
          <div id="garden-plot-8"><img src="/svg/pumpkin.svg" alt="it's a carrot"/></div>
          <div id="garden-plot-9"><img src="/svg/strawberry.svg" alt="it's a carrot"/></div>
        </div>
        
      </div>
    );
  }
}
