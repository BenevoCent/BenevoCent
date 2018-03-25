import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { db } from "../config/constants";
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './checkoutForm';


export default class LumpPayment extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    console.log('in lumpPayment');
    return (
        <Elements>
            <InjectedCheckoutForm />
        </Elements>
    );
  }
}
