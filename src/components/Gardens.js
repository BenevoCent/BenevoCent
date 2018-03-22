import React, { Component } from "react";

// Used to change month and grid
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import GardenGrid from "./GardenGrid";

// used to display and selected available seedlings
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import CheckBox from "material-ui-icons/CheckBox";
import CheckBoxOutlineBlank from "material-ui-icons/CheckBoxOutlineBlank";

import { db } from "../config/constants";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    width: "100vw"
  },
  titleStyle: {
    color: "rgb(255, 255, 255)"
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
};

const tilesData = [
  {
    img: "/svg/carrot.svg",
    title: "carrot"
  },
  {
    img: "/svg/radish-1.svg",
    title: "radish-1"
  },
  {
    img: "/svg/aubergine.svg",
    title: "aubergine"
  },
  {
    img: "/svg/broccoli.svg",
    title: "broccoli"
  },
  {
    img: "/svg/grapes.svg",
    title: "grapes"
  },
  {
    img: "/svg/onion.svg",
    title: "onion"
  },
  {
    img: "/svg/peas.svg",
    title: "peas"
  },
  {
    img: "/svg/pumpkin.svg",
    title: "pumpkin"
  },
  {
    img: "/svg/strawberry.svg",
    title: "strawberry"
  }
];

export default class Gardens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeedling: "",
      gardens: [],
      monthlyDonations: [],
      menuOpen: false,
      selectedMonthName: "",
      selectedmonthDonation: 0,
    };
  }
  getSelectedSeedling() {
    let selectedSeedling = "";
    db
      .collection("users")
      .where("uid", "==", this.props.user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          selectedSeedling = doc.data().selectedSeedling;
        });
        return selectedSeedling;
      })
      .then(selectedSeedling =>
        this.setState({ selectedSeedling: selectedSeedling })
      );
  }
  getGardens() {
    var gardens = [];
    db
      .collection("gardens")
      .doc(this.props.user.uid)
      .collection("user_gardens")
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
  getMonthlyDonations() {
    let monthlyDonations = [];
    db
      .collection("all_donations")
      .doc(this.props.user.uid)
      .collection("user_donations")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          monthlyDonations.push({
            month: doc.id,
            monthlyDonation: doc.data().totalDonations
          });
          console.log(doc.id, "=>", doc.data());
        });
        return monthlyDonations;
      })
      .then(monthlyDonations => {
        this.setState({ 
          monthlyDonations: monthlyDonations,
          selectedMonthName: monthlyDonations[0].month,
          selectedmonthDonation: monthlyDonations[0].monthlyDonation,
        });
        console.log(this.state.monthlyDonations);
      });
  }
  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      menuOpen: false,
    });
  };
  selectMonth = (month, donation) => {
    this.setState({
      selectedMonthName: month,
      selectedmonthDonation: donation,
    })
  }

  componentDidMount() {
    this.getGardens();
    this.getSelectedSeedling();
    this.getMonthlyDonations();
  }

  render() {
    return (
      <div>
      <RaisedButton
        onClick={this.handleClick}
        label={this.state.selectedMonthName}
      />
      <Popover
        open={this.state.menuOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        <Menu>
          {
            this.state.monthlyDonations.map(elem => {
            return (
              <MenuItem primaryText={elem.month} onClick={ () => { 
                console.log('clicked');
                this.selectMonth(elem.month, elem.monthlyDonation);
                this.handleRequestClose();
              } } />
            )})
          }
        </Menu>
      </Popover>
        
        <GardenGrid monthlyDonation={this.state.selectedmonthDonation} />

        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {tilesData.map(tile => (
              <GridTile
                key={tile.img}
                title={tile.title}
                actionIcon={
                  this.state.selectedSeedling === tile.title ? (
                    <IconButton>
                      <CheckBox color="rgb(255, 255, 255)" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        this.setState({ selectedSeedling: tile.title });
                        db
                          .collection("users")
                          .doc(this.props.user.uid)
                          .set(
                            {
                              selectedSeedling: tile.title
                            },
                            { merge: true }
                          )
                          .then(function() {
                            console.log("Document successfully written!");
                          })
                          .catch(function(error) {
                            console.error("Error writing document: ", error);
                          });
                      }}
                    >
                      <CheckBoxOutlineBlank color="rgb(255, 255, 255)" />
                    </IconButton>
                  )
                }
                titleStyle={styles.titleStyle}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <img src={tile.img} alt="tile" />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}
