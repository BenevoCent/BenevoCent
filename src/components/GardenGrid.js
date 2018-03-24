import React, { Component } from "react";
import IsometricGrid, { Cell } from "react-isometric-grid";
import dynamics from "dynamics.js";

const styles = {
  cell: {
    height: "16vw",
    width: "16vw",
    padding: "0",
    margin: "0",
    // opacity: "0.7"
  }
};

export default class GardenGrid extends Component {
  render() {
    // console.log("gardengrid plots", this.props.plots)
    let gardenPlots = [];
    for (let i = 0; i < this.props.plots.length; i++) {
      let topLayer = "#000000";
      if (this.props.plots[i] !== null)
        topLayer = `/svg/${this.props.plots[i]}.svg`;
      gardenPlots.push(topLayer);
    }
    // console.log("gardenPlots", gardenPlots);
    return (
      <div id="carousel-summary" 
        // style={{
        //   backgroundImage: `url("grass.jpg")`,
        //   boxShadow: '10px 10px 5px grey'
        // }}
      >
        <h3>${this.props.monthlyDonation}</h3>
        <IsometricGrid
          shadow
          transform="rotateX(45deg) rotateZ(45deg)"
          stackItemsAnimation={{
            properties: function(pos) {
              return {
                translateZ: (pos + 1) * 10, //this affects height of hover effect
                rotateZ: 0 //items rotate on hover
              };
            },
            options: function(pos, itemstotal) {
              return {
                type: dynamics.bezier,
                duration: 500,
                points: [
                  { x: 0, y: 0, cp: [{ x: 0.2, y: 1 }] },
                  { x: 1, y: 1, cp: [{ x: 0.3, y: 1 }] }
                ],
                delay: (itemstotal - pos - 1) * 40
              };
            }
          }}
          style={{
            height: "70vw",
            width: "70vw",
            transformStyle: "preserve-3d",
            transform: "perspective(3000px) rotateX(45deg) rotateZ(45deg)",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            // backgroundColor: "mediumseagreen",
            // boxShadow: "18px 18px 10px grey",
            margin: "0 0 0 0",
            // opacity: "0.4",
          }}
        >
          {
            // gardenPlots &&
            // gardenPlots.map(elem => {
            //   return (
            //     <Cell
            //     layers={[ elem, "#685132", "#7c684c", "#968670"]}
            //     style={styles.cell}
            //     layerStyle={styles.cell}
            //     />
            //   )
            // })
          }

          
            <Cell
              layers={[gardenPlots[0], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            <Cell
              layers={[gardenPlots[1], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            <Cell
              layers={[gardenPlots[2], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            <Cell
              layers={[gardenPlots[3], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            <Cell
              layers={[gardenPlots[4], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            <Cell
              layers={[gardenPlots[5], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            <Cell
              layers={[gardenPlots[6], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            <Cell
              layers={[gardenPlots[7], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            <Cell
              layers={[gardenPlots[8], "#685132", "#7c684c", "#968670"]}
              style={styles.cell}
              layerStyle={styles.cell}
            />
            
        </IsometricGrid>
      </div>
    );
  }
}
