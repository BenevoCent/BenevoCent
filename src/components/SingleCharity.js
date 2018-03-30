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
      donors: [],
      plots: [],
      names: [],
      amount: [],
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
        this.getTopDonors();
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getTopDonors() {
    let donors = [];
    let amount = [];
    let allUserDonations = db.collection('donationsToCharities')
      .doc(this.state.charity.uid)
      .collection('donationsToCharity');

    allUserDonations.orderBy('totalDonations', 'desc')
      .limit(9)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          donors.push(doc.data());
          amount.push(doc.data().totalDonations);
        });
        return donors;
      })
      .then(donors => {
        this.setState({ donors, amount });
        this.getTopDonorInfo();
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getTopDonorInfo(){
    let plots = [null, null, null, null, null, null, null, null, null];
    let names = [];
    this.state.donors.map((donor, idx) => {
      return db.collection('users')
        .doc(donor.uid)
        .get()
        .then(user => {
          // console.log('idx', idx);
          plots[idx] = user.data().selectedSeedling;
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
    if (Object.keys(this.state.charity).length === 0) {
      return (
        <div id="loading-container">
          <CircularProgress size={100} thickness={10} />
        </div>
      )
    } else {
        return (
          <div>
            <br />
            <h2 style={{textAlign: "center"}}>{this.props.match.params.charityName.replace(/_/g,' ')}</h2>
            <GardenGridV2
              monthlyDonation={this.state.charity.totalDonations}
              plots={this.state.plots}
            />
            <br />
            <h4 style={{textAlign: "center", fontWeight: "bold" }}>Leaderboard</h4>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Rank</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Amount ($)</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>{this.state.names[0]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[0]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>2</TableRowColumn>
                  <TableRowColumn>{this.state.names[1]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[1]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>3</TableRowColumn>
                  <TableRowColumn>{this.state.names[2]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[2]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>4</TableRowColumn>
                  <TableRowColumn>{this.state.names[3]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[3]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>5</TableRowColumn>
                  <TableRowColumn>{this.state.names[4]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[4]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>6</TableRowColumn>
                  <TableRowColumn>{this.state.names[5]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[5]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>7</TableRowColumn>
                  <TableRowColumn>{this.state.names[6]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[6]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>8</TableRowColumn>
                  <TableRowColumn>{this.state.names[7]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[7]}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>9</TableRowColumn>
                  <TableRowColumn>{this.state.names[8]}</TableRowColumn>
                  <TableRowColumn>{this.state.amount[8]}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            <br />
            <h5>URL: <a href={this.state.charity.url} target="_blank">{`${this.state.charity.url}`}</a></h5>
            <h5>Tag: {`${this.state.charity.tag}`}</h5>
            <p>Mission: {`${this.state.charity.mission}`}</p>
          </div>
        );
    }

  }
}
