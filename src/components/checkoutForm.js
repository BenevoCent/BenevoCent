import React, { Component } from "react";
//import SelectField from "material-ui/SelectField";
//import MenuItem from "material-ui/MenuItem";
//import TextField from "material-ui/TextField";
//import RaisedButton from "material-ui/RaisedButton";

import { db } from "../config/constants";
import {Elements} from 'react-stripe-elements';
import {Stripe, injectStripe, stripeTokenHandler} from 'react-stripe-elements';
import CardSection from './cardSection'

let formStyle = {
    height: "500px",
    width: "450px",
    border: "1px black solid"
}

let style = {
    base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
        color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};


export class CheckoutForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      console.log('in renderer', this.charities);

    return (
        <div style={formStyle}>
            <h3>Direct Donation</h3>
            <p>Here you can make a direct donation to any charity of your choosing</p>            
            <CardSection user={this.props.user} />
        </div>
    );
  }
}

export default injectStripe(CheckoutForm);
