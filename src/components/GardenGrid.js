import React, { Component } from 'react';
import IsometricGrid, { Cell } from 'react-isometric-grid';
import dynamics from 'dynamics.js';

export default class GardenGrid extends Component {
  render() {
    return (
      <div id="carousel-summary">
        <h3>{this.props.month} ${this.props.monthlyDonation}</h3>
        <IsometricGrid
          shadow
          transform="rotateX(45deg) rotateZ(45deg)"
          stackItemsAnimation={{
            properties: function (pos) {
              return {
                translateZ: (pos + 1) * 10, //this affects height of hover effect
                rotateZ: 0, //items rotate on hover
              };
            },
            options: function (pos, itemstotal) {
              return {
                type: dynamics.bezier,
                duration: 500,
                points: [
                  { x: 0, y: 0, cp: [{ x: 0.2, y: 1 }] },
                  { x: 1, y: 1, cp: [{ x: 0.3, y: 1 }] },
                ],
                delay: (itemstotal - pos - 1) * 40,
              };
            },
          }}
          style={{ height: '70vw', width: '70vw' }}
        >
          <Cell
            layers={[
              '/svg/carrot.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
          <Cell
            layers={[
              '/svg/radish-1.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
          <Cell
            layers={[
              '/svg/aubergine.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
          <Cell
            layers={[
              '/svg/broccoli.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
          <Cell
            layers={[
              '/svg/grapes.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
          <Cell
            layers={[
              '/svg/onion.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
          <Cell
            layers={[
              '/svg/peas.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
          <Cell
            layers={[
              '/svg/pumpkin.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
          <Cell
            layers={[
              '/svg/strawberry.svg',
              '#685132',
              '#7c684c',
              '#968670',
            ]}
            style={{ height: '16vw', width: '16vw' }}
            layerStyle={{ height: '16vw', width: '16vw' }}
          />
        </IsometricGrid>
      </div>
    );
  }
}