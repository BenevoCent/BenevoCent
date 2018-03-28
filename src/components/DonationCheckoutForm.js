import React, { Component } from "react";
import {Elements} from 'react-stripe-elements';
import { injectStripe } from 'react-stripe-elements';
import DonationCardSection from './DonationCardSection'

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


export class DonationCheckoutForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      console.log('in renderer', this.charities);

    return (
        <div style={{width: "100vw"}}>
            <h3>Direct Donation</h3>
            <DonationCardSection user={this.props.user} />
        </div>
    );
  }
}

export default injectStripe(DonationCheckoutForm);
