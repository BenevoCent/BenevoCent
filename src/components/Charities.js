import React, { Component } from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui-icons/CheckBox';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';

import SearchBar from 'material-ui-search-bar';

import { db } from '../config/constants';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '1rem'
  },
  gridList: {
    display: 'flex',
    overflowX: 'auto',
    height: '82vh',
    width: '90vw'
  },
  titleStyle: {
    color: 'rgb(255, 255, 255)'
  }
};

export default class Charities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charities: [],
      selectedCharities: {},
      namedCharities: {},
      searchVal: '',
      tabIndex: 0
    };
  }

  getCharities() {
    let charities = [];
    db
      .collection('charities')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          charities.push(doc.data());
        });
        return charities;
      })
      .then(charities => {
        this.setState({ charities });
        // console.log('charities', charities);
      })
      // .then( () => this.getSelectedCharities())
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getSelectedCharities() {
    db
      .collection('distributions')
      .doc(this.props.user.uid)
      .get()
      .then(doc => doc.data())
      .then(selectedCharities =>
        Promise.all(
          Object.keys(selectedCharities)
          .map(
            key => db.collection('charities')
              .doc(key)
              .get()
              .then(doc => doc.data().name)
              .then(name => ({
                [name]: selectedCharities[key]
              }))
          )
        )
      )
      .then(entries => Object.assign(...entries))
      .then((namedCharities) => this.setState({ namedCharities: namedCharities }))
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  tabChange = value => {
    this.setState({
      tabIndex: value
    });
  };

  handleChange = evt => {
    // console.log(evt);
    this.setState({
      searchVal: evt
    });
  };

  componentDidMount() {
    this.getCharities();
    this.getSelectedCharities();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.namedCharities) this.setState({namedCharities: nextProps.namedCharities})
  // }

  render() {
    // console.log('rendering');
    const updatedCharities = this.state.charities.filter(item =>
      item.name.toLowerCase().match(this.state.searchVal.toLowerCase())
    );
    // console.log('this.state.namedCharities', this.state.namedCharities);
    return (
      <div style={{ width: '100vw' }}>
        <Tabs onChange={this.tabChange} value={this.state.tabIndex}>
          <Tab label="Organizations" value={0} />
          <Tab label="Split Donations" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.tabIndex}
          onChangeIndex={this.tabChange}
        >
          <div style={styles.root}>
            <SearchBar
              onChange={this.handleChange}
              onRequestSearch={() => console.log('onRequestSearch')}
              style={{
                margin: '3',
                marginBottom: '5px',
                width: '90vw'
              }}
            />
            <GridList style={styles.gridList} cols={2}>
              { this.state.namedCharities && updatedCharities.map(charity => {
                // console.log(
                //   this.state.namedCharities
                // );
                // console.log(
                //   charity.name,
                //   this.state.namedCharities.hasOwnProperty(charity.name),
                //   this.state.namedCharities
                // );
                return (
                  <GridTile
                    key={charity.name}
                    title={charity.name}
                    subtitle={
                      <span>
                        <b>{charity.tag}</b>
                      </span>
                    }
                    actionIcon={
                      this.state.namedCharities.hasOwnProperty(charity.name) ? (
                        <IconButton>
                          <CheckBox color="rgb(255, 255, 255)" />
                        </IconButton>
                      ) : (
                        <IconButton>
                          <CheckBoxOutlineBlank color="rgb(255, 255, 255)" />
                        </IconButton>
                      )
                    }
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                      // flexDirection: 'column',
                    }}
                    titleStyle={styles.titleStyle}
                    titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                  >
                    <img src={charity.img} alt="charity" />
                    <br />
                    <a href={charity.url} target="_blank">
                      Main Website
                    </a>
                  </GridTile>
                );
              })}
            </GridList>
          </div>
          <div style={styles.root}>
            <h1>Split</h1>
            {Object.keys(this.state.namedCharities).map(key => {
              return (
                <li key={key}>
                  {key} {this.state.namedCharities[key]}{' '}
                </li>
              );
            })}
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
