import React, { Component } from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';

import SearchBar from 'material-ui-search-bar';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui-icons/CheckBox';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';

import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

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
      })
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
      .then(selectedCharities => {
        this.setState({ selectedCharities: selectedCharities });
        return Promise.all(
          Object.keys(selectedCharities).map(key =>
            db
              .collection('charities')
              .doc(key)
              .get()
              .then(doc => doc.data().name)
              .then(name => ({
                [name]: selectedCharities[key]
              }))
          )
        );
      })
      .then(entries => Object.assign(...entries))
      .then(namedCharities => this.setState({ namedCharities: namedCharities }))
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
  render() {
    // console.log('rendering');
    const updatedCharities = this.state.charities.filter(item =>
      item.name.toLowerCase().match(this.state.searchVal.toLowerCase())
    );
    return (

    

      <div style={{ width: '100vw' }}>
        <Tabs onChange={this.tabChange} value={this.state.tabIndex}>
          <Tab label="Organizations" value={0}>
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
              <GridList style={styles.gridList} cols={1}>
                {updatedCharities.map(charity => {
                  return (
                    <GridTile
                      key={charity.name}
                      title={charity.tag}
                      actionIcon={
                        this.state.namedCharities.hasOwnProperty(
                          charity.name
                        ) ? (
                          <IconButton
                            onClick={() => {
                              let newNamedCharities = this.state.namedCharities;
                              delete newNamedCharities[charity.name];
                              this.setState({
                                namedCharities: newNamedCharities
                              });

                              let newSelectedCharities = this.state
                                .selectedCharities;
                              delete newSelectedCharities[charity.uid];
                              this.setState({
                                selectedCharities: newSelectedCharities
                              });
                              db
                                .collection('distributions')
                                .doc(this.props.user.uid)
                                .set(this.state.selectedCharities)
                                .then(function() {
                                  console.log('Document successfully written!');
                                })
                                .catch(function(error) {
                                  console.error(
                                    'Error writing document: ',
                                    error
                                  );
                                });
                            }}
                          >
                            <CheckBox color="rgb(255, 255, 255)" />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => {
                              let newNamedCharities = this.state.namedCharities;
                              newNamedCharities[charity.name] = 0;
                              this.setState({
                                namedCharities: newNamedCharities
                              });

                              let newSelectedCharities = this.state
                                .selectedCharities;
                              newSelectedCharities[charity.uid] = 0;
                              this.setState({
                                selectedCharities: newSelectedCharities
                              });
                              db
                                .collection('distributions')
                                .doc(this.props.user.uid)
                                .set(
                                  this.state.selectedCharities
                                )
                                .then(function() {
                                  console.log('Document successfully written!');
                                })
                                .catch(function(error) {
                                  console.error(
                                    'Error writing document: ',
                                    error
                                  );
                                });
                            }}
                          >
                            <CheckBoxOutlineBlank color="rgb(255, 255, 255)" />
                          </IconButton>
                        )
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      titleStyle={styles.titleStyle}
                      titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    >
                      <img
                        style={{ paddingLeft: '15px' }}
                        src={charity.img}
                        alt="charity"
                      />
                      <br />
                      <Link to={`/orgs/${charity.name.trim().replace(/ /g, "_")}`}>{charity.name}</Link>
                    </GridTile>
                  );
                })}
              </GridList>
            </div>
          </Tab>
          <Tab label="Split Donations" value={1}>
            <div style={styles.root}>
              {Object.keys(this.state.namedCharities).map(key => {
                // let sliderVal = this.state.namedCharities[key] * 100;
                return (
                  <Card
                    key={key}
                    style={{ width: '90vw', marginBottom: '3vh' }}
                  >
                    children={
                      <div>
                        <div style={{ margin: '3vh' }}>{key}</div>
                        <div style={{ margin: '3vh' }}>
                          {this.state.namedCharities[key] * 100}%{' '}
                        </div>
                        <Slider
                          min={0}
                          max={100}
                          step={10}
                          style={{ margin: '3vh' }}
                        />
                      </div>
                    }
                  </Card>
                );
              })}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}





  {/* <div style={styles.root}>
        <SearchBar
          onChange={() => console.log('onChange')}
          onRequestSearch={() => console.log('onRequestSearch')}
          style={{
            margin: '3',
            marginBottom: '5px',
            width: '90vw',
          }}
        />
        <GridList style={styles.gridList} cols={2}>
          {this.state.charities && this.state.charities.map((charity) => (
            <GridTile
              key={charity.img}
              title={charity.name}
              subtitle={<span><b>{charity.tag}</b></span>}
              actionIcon={
                <IconButton>
                  <CheckBox color="rgb(255, 255, 255)" />
                </IconButton>
              }
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              titleStyle={styles.titleStyle}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img src={charity.img} alt="charity" />
              <br />
              <a href={charity.url} target="_blank">Main Website</a>
            </GridTile>
          ))}
        </GridList> */}
