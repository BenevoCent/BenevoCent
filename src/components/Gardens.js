import React, { Component } from "react";
import Carousel from "nuka-carousel";
import GardenSummary from "./gardenSummary";

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

import CheckBox from 'material-ui-icons/CheckBox';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';

import { db } from "../config/constants";


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '100vw',
  },
  titleStyle: {
    color: 'rgb(255, 255, 255)',
  },
};

const tilesData = [
  {
    img: '/svg/carrot.svg',
    title: 'carrot',
  },
  {
    img: '/svg/radish-1.svg',
    title: 'radish-1',
  },
  {
    img: '/svg/aubergine.svg',
    title: 'aubergine',
  },
  {
    img: '/svg/broccoli.svg',
    title: 'broccoli',
  },
  {
    img: '/svg/grapes.svg',
    title: 'grapes',
  },
  {
    img: '/svg/onion.svg',
    title: 'onion',
  },
  {
    img: '/svg/peas.svg',
    title: 'peas',
  },
  {
    img: '/svg/pumpkin.svg',
    title: 'pumpkin',
  },
  {
    img: '/svg/strawberry.svg',
    title: 'strawberry',
  },
];

export default class Gardens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gardens: [],
      selectedSeedling: "",
    };
  }
  getGardens() {
    var gardens = [];
    db.collection("gardens").doc(this.props.user.uid).collection("user_gardens")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          gardens.push(doc.data());
          console.log(doc.id, "=>", doc.data());
        });
        return gardens;
      })
      .then(gardens => {
        this.setState({ gardens: gardens });
        console.log("gardens", gardens);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  getSelectedSeedling(){
    console.log("getSelectedSeedling")
    let selectedSeedling = "";
    db.collection("users")
      .where("uid", "==", this.props.user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          selectedSeedling = doc.data().selectedSeedling;
        });
        return selectedSeedling
      })
      .then(selectedSeedling => this.setState({ selectedSeedling: selectedSeedling }))
  }

  componentDidMount() {
    this.getGardens();
    this.getSelectedSeedling();
  }

  render() {
    return (
      <div>
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
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {tilesData.map((tile) => (
              <GridTile
                key={tile.img}
                title={tile.title}
                actionIcon={
                  this.state.selectedSeedling === tile.title
                  ? <IconButton><CheckBox color="rgb(255, 255, 255)" /></IconButton>
                  : <IconButton 
                      onClick={ () => {
                        this.setState({ selectedSeedling: tile.title })
                        db.collection("users")
                        .doc(this.props.user.uid)
                        .set({
                          selectedSeedling: tile.title
                        }, { merge: true })
                        .then(function() {
                          console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                          console.error("Error writing document: ", error);
                        })
                      }}
                    >
                      <CheckBoxOutlineBlank color="rgb(255, 255, 255)"  />
                    </IconButton>
                }
                titleStyle={styles.titleStyle}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <img src={tile.img} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}
