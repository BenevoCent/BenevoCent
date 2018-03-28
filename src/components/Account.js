import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DonationCheckoutForm from './DonationCheckoutForm';
import {Elements} from 'react-stripe-elements';


import { db } from '../config/constants';
const uuid = require('uuidv4');

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: 'Chase',
      userAccounts: [],
      userDonations: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange = (event, index, bank) => {
    console.log('bank', bank);
    this.setState({ bank });
  };
  handleSubmit = event => {
    event.preventDefault();
    let accountUid = uuid()
    db.collection('accounts')
      .doc(`${this.props.user.uid}`)
      .collection('userAccounts')
      .doc(`${accountUid}`)
      .set({
        userUid: this.props.user.uid,
        bankAccountName: this.state.bankAccountName,
        bank: this.state.bank,
        bankAccountUsername: this.state.bankAccountUsername,
        bankAccountPassword: this.state.bankAccountPassword,
        accountUid: accountUid
      })
      .then(function () {
        // let modifiedUserAccounts = this.state.userAccounts
        // modifiedUserAccounts.push({
        //   bankAccountName: this.state.bankAccountName,
        //   bank: this.state.bank,
        //   bankAccountUsername: this.state.bankAccountUsername
        // })
        // this.setState({ userAccounts: modifiedUserAccounts })
        // console.log(this.state.userAccounts)
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };
  handleRemove = (accountUid, event) => {
    // event.preventDefault()
    db.collection('accounts').doc(this.props.user.uid).collection('userAccounts')
      .doc(accountUid)
      .delete()
      .then(function () {
        console.log('Document successfully deleted');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      })
  }
  handleRedirect = (charityName, event) => {
    this.props.history.push(`/orgs/${charityName.trim().replace(/ /g, "_")}`)
  }

  getAccounts() {
    let userAccounts = [];
    db.collection('accounts').doc(this.props.user.uid).collection('userAccounts')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          userAccounts.push(doc.data());
          // console.log(doc.id, "=>", doc.data());
        });
        return userAccounts
      })
      .then((userAccounts) =>
        this.setState({ userAccounts: userAccounts })
      )
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getDonations() {
    let userDonations = {}
    db.collection('donationsFromUsers').doc(this.props.user.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const donationsObject = snapshot.data()
          const orgs = Object.keys(donationsObject)
          // console.log("donations", snapshot.data())
          // console.log(orgs)
          orgs.forEach(org => {
            db.collection("charities").doc(org)
              .get()
              .then(snapshot => {
                userDonations[snapshot.data().name] = donationsObject[org]
                this.setState({ userDonations: userDonations })
              })
          })
        }
      })
  }

  componentDidMount() {
    this.getAccounts();
    this.getDonations();
  }

  render() {
    let user = this.props.user;
    const userAccounts = this.state.userAccounts;
    const userDonations = this.state.userDonations;
    // console.log(userDonations)

    return (
      <div id="account-info" style={{marginTop: "1rem"}}>
        {console.log(user)}
        <h2>Welcome to Your Account, {user.displayName}</h2>
        <br />
        <h3>Your Past Donations</h3>
        <br />
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {/* {console.log('userDonations', userDonations)} */}
          {Object.keys(userDonations).length > 0
            ? Object.keys(userDonations).map(key => (
              <div key={key}>
                {/* {console.log(key)} */}
                <li>
                  {key}
                </li>
                <li>
                  Total: ${userDonations[key]}
                </li>
                <RaisedButton
                  label="Visit Garden"
                  primary={true}
                  type="submit"
                  style={{ margin: 0 }}
                  onClick={event => this.handleRedirect(key, event)}
                />
                <br />
                <br />
              </div>
            ))
            : null}
        </ul>
        <h3>Your Saved Accounts</h3>
        <br />
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {userAccounts
            ? userAccounts.map(elem => (
              <div key={elem.bankAccountName}>
                <li key={elem.bankAccountName}>
                  Account Name: {elem.bankAccountName}
                </li>
                <li key={elem.bank}>
                  Bank: {elem.bank}
                </li>
                <li key={elem.bankAccountUsername}>
                  Account Username: {elem.bankAccountUsername}
                </li>
                <RaisedButton
                  label="Remove Account"
                  primary={true}
                  type="submit"
                  style={{ margin: 0 }}
                  onClick={event => this.handleRemove(elem.accountUid, event)}
                />
                <br />
                <br />
              </div>
            ))
            : null}
        </ul>
        <h3>Add a New Account</h3>
        <form className="bankForm" onSubmit={event => this.handleSubmit(event)}>
          <TextField
            name="bankAccountName"
            floatingLabelText="Bank Account Name"
            onChange={(event, newValue) =>
              this.setState({
                bankAccountName: newValue
              })
            }
          />
          <br />
          <SelectField
            floatingLabelText="Bank"
            name="bankSelector"
            value={this.state.bank}
            onChange={this.handleChange}
          >
            <MenuItem
              value={'American Express'}
              primaryText="American Express"
            />
            <MenuItem value={'Bank of America'} primaryText="Bank of America" />
            <MenuItem value={'Capital One'} primaryText="Capital One" />
            <MenuItem value={'Chase'} primaryText="Chase" />
            <MenuItem value={'Citi'} primaryText="Citi" />
            <MenuItem value={'Discover'} primaryText="Discover" />
            <MenuItem value={'Wells Fargo'} primaryText="Wells Fargo" />
          </SelectField>
          <br />
          <TextField
            name="bankAccountUsername"
            floatingLabelText="Bank Account Username"
            onChange={(event, newValue) =>
              this.setState({
                bankAccountUsername: newValue
              })
            }
          />
          <br />
          <TextField
            name="bankAccountPassword"
            floatingLabelText="Bank Account Password"
            type="password"
            onChange={(event, newValue) =>
              this.setState({ bankAccountPassword: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Link Account"
            primary={true}
            type="submit"
            style={{ margin: 0 }}
          />
        </form>
        {/*<Elements>
          <DonationCheckoutForm user={this.props.user} type={'subscription'} />
        </Elements>*/}
      </div>
    );
  }
}
