import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { db } from "../config/constants";
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';


export default class LumpPayment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (ev) => {

    ev.preventDefault();
    this.props.stripe.createToken({name: 'Manny Mapsagna'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });
  }

  render() {
    console.log('in lumpPayment');
    return (
        <Elements>
            <InjectedCheckoutForm user={this.props.user}/>
        </Elements>
    );
  }
}
