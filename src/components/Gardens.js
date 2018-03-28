import React, { Component } from 'react';

// Used to change month and grid
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// import GardenGrid from './GardenGrid';
import GardenGridV2 from './GardenGridV2';

// used to display and selected available seedlings
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui-icons/CheckBox';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';

import { db, firebaseAuth } from '../config/constants';



function onGoogleLoginReload() {
  // Result from Redirect auth flow.
  return firebaseAuth().getRedirectResult()
    .then(result => {
      const user = result.user;
      console.log(user)
      const userRef = db.collection('users').doc(user.uid);

      return db.runTransaction(async txn => {
        const userData = await txn.get(userRef);
        if (!userData.exists)
          return txn.set(userRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid
          });
      });
    })
    .catch(error => {
      const errorCode = error.code;

      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
      } else {
        console.error(error);
      }
    });
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '100vw',
    marginTop: '15px'
  },
  titleStyle: {
    color: 'rgb(255, 255, 255)'
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
    img: '/svg/carrot.svg',
    title: 'carrot'
  },
  {
    img: '/svg/radish-1.svg',
    title: 'radish-1'
  },
  {
    img: '/svg/aubergine.svg',
    title: 'aubergine'
  },
  {
    img: '/svg/broccoli.svg',
    title: 'broccoli'
  },
  {
    img: '/svg/grapes.svg',
    title: 'grapes'
  },
  {
    img: '/svg/onion.svg',
    title: 'onion'
  },
  {
    img: '/svg/peas.svg',
    title: 'peas'
  },
  {
    img: '/svg/pumpkin.svg',
    title: 'pumpkin'
  },
  {
    img: '/svg/strawberry.svg',
    title: 'strawberry'
  }
];
// const monthNames = ["January", "February", "March", "April", "May", "June",
// "July", "August", "September", "October", "November", "December"
// ];
// const d = new Date();

export default class Gardens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeedling: '',
      gardens: [],
      monthlyDonations: [],
      menuOpen: false,
      selectedMonthName: '',
      selectedMonthDonation: 0,
      plots: [],
    };
  }
  getSelectedSeedling() {
    if (this.props.user.uid) {
      console.log('yay', this.props.user.uid);
    } else {
      console.log('nay');
    }
    db.collection('users')
      .doc(this.props.user.uid)
      .get()
      .then(doc => doc.data().selectedSeedling)
      .then(selectedSeedling =>
        this.setState({ selectedSeedling: selectedSeedling })
      );
  }
  getGardens() {
    var gardens = [];
    db
      .collection('gardens')
      .doc(this.props.user.uid)
      .collection('user_gardens')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          gardens.push(doc.data());
        });
        return gardens;
      })
      .then(gardens => {
        this.setState({ gardens: gardens });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getMonthlyDonations() {
    let monthlyDonations = [];
    db
      .collection('all_donations')
      .doc(this.props.user.uid)
      .collection('user_donations')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          monthlyDonations.push({
            month: doc.id,
            monthlyDonation: doc.data().totalDonations
          });
        });
        return monthlyDonations;
      })
      .then(monthlyDonations => {
        if (monthlyDonations[0]) {
          this.setState({
            monthlyDonations: monthlyDonations,
            selectedMonthName: monthlyDonations[0].month,
            selectedMonthDonation: monthlyDonations[0].monthlyDonation,
          });
        }
        else {
          this.setState({
            monthlyDonations: [],
            selectedMonthName: "2018-03",
            // ABOVE IS HARD CODED AND AWFUL - DO NOT DELETE THIS COMMENT UNTIL FIXED
            selectedMonthDonation: 0,
          });
        }
        // console.log('this.state', this.state);
      })
      .then(() => {
        // console.log('month', this.state.selectedMonthName, this.props.user.uid)
        this.getPlots(this.state.selectedMonthName, this.props.user.uid)
      })
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
  getPlots = (month, uid) => {
    let plots = [];
    db
      .collection('gardens')
      .doc(uid)
      .collection('user_gardens')
      .doc(month)
      .get()
      .then(doc => {
        let arr = Object.keys(doc.data())
        arr.forEach(key => plots.push(doc.data()[key]))
        return plots;
      })
      .then(plots => {
        this.setState({ plots: plots });
        // console.log('plots', plots);
        // console.log('this.state', this.state)
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    // console.log('get the month ', month, 'get the uid ', uid )
  }
  selectMonth = (month, donation) => {
    this.setState({
      selectedMonthName: month,
      selectedMonthDonation: donation,
    })
  }

  monthInWords(str) {
    const year = str.slice(0, 4)
    const monthNums = str.slice(5)
    let month = ""
    switch (monthNums) {
      case "01":
        month = "January"
        break
      case "02":
        month = "February"
        break
      case "03":
        month = "March"
        break
      case "04":
        month = "April"
        break
      case "05":
        month = "May"
        break
      case "06":
        month = "June"
        break
      case "07":
        month = "July"
        break
      case "08":
        month = "August"
        break
      case "09":
        month = "September"
        break
      case "10":
        month = "October"
        break
      case "11":
        month = "November"
        break
      case "12":
        month = "December"
        break
      default:
        month = "No Donations"
        break
    }
    return month + " " + year
  }

  componentDidMount() {
    onGoogleLoginReload();
    this.getGardens();
    this.getSelectedSeedling();
    this.getMonthlyDonations();
  }

  render() {
    return (
      <div style={{ marginTop: "1rem" }}>
        <div style={{ width: '100vw' }}>
          <RaisedButton
            labelStyle={{ textTransform: 'lowercase capitalize', fontSize: "16px" }}
            onClick={this.handleClick}
            label={this.monthInWords(this.state.selectedMonthName)}
            style={{ marginLeft: '20px' }}
          />
        </div>
        <Popover
          open={this.state.menuOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {
              this.state.monthlyDonations.map(elem => {
                return (
                  <MenuItem
                    key={elem.month} primaryText={this.monthInWords(elem.month)} onClick={() => {
                      this.selectMonth(elem.month, elem.monthlyDonation);
                      this.getPlots(elem.month, this.props.user.uid)
                      this.handleRequestClose();
                    }} />
                )
              })
            }
          </Menu>
        </Popover>
        {
          // <GardenGrid
          //   monthlyDonation={this.state.selectedMonthDonation}
          //   plots={this.state.plots}
          // />
        }
        <GardenGridV2
          monthlyDonation={this.state.selectedMonthDonation}
          plots={this.state.plots}
        />
        <br />
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
                            .collection('users')
                            .doc(this.props.user.uid)
                            .set(
                              {
                                selectedSeedling: tile.title
                              },
                              { merge: true }
                            )
                            .then(function () {
                              console.log('Document successfully written!');
                            })
                            .catch(function (error) {
                              console.error('Error writing document: ', error);
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
                <img src={tile.img} alt="tile" style={{maxHeight: '180px'}} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}
