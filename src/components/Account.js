import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { db, firebaseAuth } from "../config/constants";

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: "Chase",
      userAccounts: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event, index, bank) => this.setState({ bank });
  handleSubmit = event => {
    event.preventDefault();
    console.log("event.target", event.target);
    db
      .collection("accounts")
      .doc(`${this.state.bank} ${this.props.user.uid}`)
      .set({
        userUid: this.props.user.uid,
        bank: this.state.bank,
        accountUsername: this.state.accountUsername,
        accountPassword: this.state.accountPassword
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  getAccounts() {
    var userAccounts = [];
    var accounts = db.collection("accounts");
    var query = accounts
      .where("userUid", "==", this.props.user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          userAccounts.push(doc.data());
          console.log(doc.id, "=>", doc.data());
        });
        return userAccounts
      })
      .then((userAccounts)=>
        this.setState({userAccounts: userAccounts})
      )
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  componentDidMount() {
    this.getAccounts();
  }

  render() {
    let userId = this.props.user.uid;
    const userAccounts = this.state.userAccounts;
    return (
      <div>
        <h1>Account Info</h1>
        <p>{userId}</p>
        {userAccounts
          ? userAccounts.map(elem => (
              <li key={elem.bank} className="user-account">
                {elem.bank} - {elem.accountUsername}
              </li>
            ))
          : null}
        <form className="bankForm" onSubmit={event => this.handleSubmit(event)}>
          <SelectField
            floatingLabelText="Bank"
            name="bankSelector"
            value={this.state.bank}
            onChange={this.handleChange}
          >
            <MenuItem
              value={"American Express"}
              primaryText="American Express"
            />
            <MenuItem value={"Bank of America"} primaryText="Bank of America" />
            <MenuItem value={"Capital One"} primaryText="Capital One" />
            <MenuItem value={"Chase"} primaryText="Chase" />
            <MenuItem value={"Citi"} primaryText="Citi" />
            <MenuItem value={"Discover"} primaryText="Discover" />
            <MenuItem value={"Wells Fargo"} primaryText="Wells Fargo" />
          </SelectField>
          <TextField
            name="accountName"
            floatingLabelText="Account Username"
            onChange={(event, newValue) =>
              this.setState({
                accountUsername: newValue
              })
            }
          />
          <br />
          <TextField
            name="accountPassword"
            floatingLabelText="Account Password"
            type="password"
            onChange={(event, newValue) =>
              this.setState({ accountPassword: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            type="submit"
            style={{ margin: 12 }}
          />
        </form>
      </div>
    );
  }
}
