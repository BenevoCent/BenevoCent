import React, { Component } from "react";
//import SelectField from "material-ui/SelectField";
//import MenuItem from "material-ui/MenuItem";
//import TextField from "material-ui/TextField";
//import RaisedButton from "material-ui/RaisedButton";

import { db } from "../config/constants";
import {Elements} from 'react-stripe-elements';
import {Stripe, injectStripe, stripeTokenHandler} from 'react-stripe-elements';
import CardSection from './cardSection'



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
        <div style={{width: "100vw"}}>
            <h3>Direct Donation</h3>
            <CardSection user={this.props.user} />
        </div>
    );
  }
}

export default injectStripe(CheckoutForm);
