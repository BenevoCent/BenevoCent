import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { db } from "../config/constants";
import {Elements} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './cardSection'

let formStyle = {
    height: "400px",
    width: "400px",
    border: "1px black solid"
}



export class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: "Chase",
      userAccounts: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (ev) => {

    ev.preventDefault();

    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

  }


  render() {
    //let userId = this.props.user.uid;
    //const userAccounts = this.state.userAccounts;
    return (
        <div style={formStyle}>
            <form action="/charge" method="post" id="payment-form">
                <div class="form-row">
                    <label for="card-element"></label>
                    <div id="card-element"></div>
                    <div id="card-errors" role="alert"></div>
                </div>
                <button>Submit Payment</button>
            </form>

            {/*<form onSubmit={this.handleSubmit}>
                <CardSection />
                <button>Confirm order</button>
    </form>*/}
        </div>
    );
  }
}

export default injectStripe(CheckoutForm);

