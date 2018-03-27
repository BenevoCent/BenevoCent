import React, { Component } from 'react';
import { db } from '../config/constants';
import CircularProgress from 'material-ui/CircularProgress';
import GardenGridV2 from './GardenGridV2';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export default class SingleCharity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charity: {},
      doners: [],
      plots: [],
      names: [],
    };
  }

  getSingleCharity() {
    let charity = {};
    db
      .collection('charities')
      .where('name', '==', `${this.props.match.params.charityName.replace(/_/g, " ")}`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          charity = doc.data();
        });
        return charity;
      })
      .then(charity => {
        this.setState({ charity });
        this.getTopDoners();
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getTopDoners() {
    let doners = [];
    let allUserDonations = db.collection('donationsToCharities')
      .doc(this.state.charity.uid)
      .collection('donationsToCharity');

    allUserDonations.orderBy('totalDonations')
      .limit(9)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doners.push(doc.data());
        });
        return doners;
      })
      .then(doners => {
        this.setState({ doners });
        this.getTopDonerInfo();
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getTopDonerInfo(){
    let plots = [];
    let names = [];
    this.state.doners.map(doner => {
      db.collection('users')
        .doc(doner.uid)
        .get()
        .then(user => {
          plots.push(user.data().selectedSeedling);
          names.push(user.data().displayName);
        })
        .then(() => this.setState({ plots, names }))
        .catch(err => {
          console.log('Error getting documents', err);
        });
    })
  }

  componentDidMount() {
    this.getSingleCharity();
  }

  render() {
    console.log('charity: ', this.state.charity);
    console.log('route: ', this.props.match.params.charityName);
    console.log('doners: ', this.state.doners);
    console.log('plots: ', this.state.plots);
    console.log('names: ', this.state.names);
    if (Object.keys(this.state.charity).length === 0) {
      return (
        <div id="loading-container">
          <CircularProgress size={100} thickness={10} />
        </div>
      )
    } else {
        return (
          <div>
            <h1>{this.props.match.params.charityName.replace(/_/g,' ')} Community Garden</h1>
            <GardenGridV2
              monthlyDonation={this.state.charity.totalDonations}
              plots={this.state.plots}
            />
            <h2>Leaderboard</h2>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>{this.state.names[0]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>2</TableRowColumn>
                  <TableRowColumn>{this.state.names[1]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>{this.state.names[2]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>4</TableRowColumn>
                  <TableRowColumn>{this.state.names[3]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>5</TableRowColumn>
                  <TableRowColumn>{this.state.names[4]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>6</TableRowColumn>
                  <TableRowColumn>{this.state.names[5]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>7</TableRowColumn>
                  <TableRowColumn>{this.state.names[6]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>8</TableRowColumn>
                  <TableRowColumn>{this.state.names[7]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>9</TableRowColumn>
                  <TableRowColumn>{this.state.names[8]}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            <h3>URL: <a href={this.state.charity.url} target="_blank">{`${this.state.charity.url}`}</a></h3>
            <h3>Tag: {`${this.state.charity.tag}`}</h3>
            <p>Mission: {`${this.state.charity.mission}`}</p>
          </div>
        );
    }

  }
}
