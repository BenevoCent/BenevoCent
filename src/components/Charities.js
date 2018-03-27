import React, { Component } from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui-icons/CheckBox';
// import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';

import SearchBar from 'material-ui-search-bar'
import { Link } from 'react-router-dom';

import { db } from '../config/constants';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    overflowX: 'auto',
    height: '82vh',
    width: '90vw',
  },
  titleStyle: {
    color: 'rgb(255, 255, 255)',
  },
};

export default class Charities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charities: [],
      searchVal: '',
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
      console.log('charities', charities);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  handleChange = (evt) => {
    console.log(evt)
    this.setState({
      searchVal: evt
    });
  }

  componentDidMount() {
    this.getCharities();
  }

  render() {
    const updatedCharities = this.state.charities.filter(item => item.name.toLowerCase().match(this.state.searchVal.toLowerCase()))

    return (
      <div style={styles.root}>
        <SearchBar
          onChange={this.handleChange}
          onRequestSearch={() => console.log('onRequestSearch')}
          style={{
            margin: '3',
            marginBottom: '5px',
            width: '90vw',
          }}
        />
        <GridList style={styles.gridList} cols={2}>
          {updatedCharities.map((charity) => (
            <GridTile
              key={charity.name}
              title={<Link to={`/orgs/${charity.name.trim().replace(/ /g, "_")}`}>{charity.name}</Link>}
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
                // flexDirection: 'column',
              }}
              titleStyle={styles.titleStyle}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img src={charity.img} alt="charity" />
              <br />
              <a href={charity.url} target="_blank">Main Website</a>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}
