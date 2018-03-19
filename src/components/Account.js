import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';

import { db, firebaseAuth } from '../config/constants';


export default class Account extends Component {
constructor(props) {
  super(props);
    this.state = {
      value: 1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange = (event, index, value) => this.setState({value});
handleSubmit = (event) => {
  event.preventDefault();
  console.log("event.target", event.target)
  db.collection("accounts").set({
    userUid: this.props.user.uid,
    bank: event.target.bankSelector.value,
    accountUsername: event.target.accountName.value,
    accountPassword: event.target.accountPassword.value,
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
  //create or update bank info
}


  render() {
    console.log("this.props: ", this.props)
    // console.log(props.authed)
    return (
      <div>
        <h1>Account Info</h1>
        <p>{this.props.user.uid}</p>
        <form onSubmit={event => this.handleSubmit(event)}>
        <SelectField
          floatingLabelText="Bank"
          name="bankSelector"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="Chase" />
          <MenuItem value={2} primaryText="Bank of America" />
        </SelectField>
        <TextField
          name="accountName"
          floatingLabelText="Account Username"
        />
        <br />
        <TextField
          name="accountPassword"
          floatingLabelText="Account Password"
        />
        <br />
        <RaisedButton label="Submit" primary={true} type="submit" style={{ margin: 12}} />
        </form>

        {
          // if (user.account){
          //   show account details
          // }
          // else {
          //   prompt the user to add an account
          // }
        }
      </div>
    );
  }
}
