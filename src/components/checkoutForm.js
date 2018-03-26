import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { db } from "../config/constants";
import {Elements} from 'react-stripe-elements';
import {Stripe, injectStripe, stripeTokenHandler} from 'react-stripe-elements';
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
    var stripe = Stripe('pk_test_7NDxNFwTXZI5iGsCursLGPh2');

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
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

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
        displayError.textContent = event.error.message;
        } else {
        displayError.textContent = '';
        }
    });
  
    // Handle form submission.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        stripe.createToken(card).then(function(result) {
        if (result.error) {
            // Inform the user if there was an error.
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            // Send the token to your server.
            stripeTokenHandler(result.token);
        }
        });
    });

    return (
        <div style={formStyle}>
            <form action="/charge" method="post" id="payment-form">
                <div class="form-row">
                    <label for="card-element">Credit or Debit Card</label>
                    <div id="card-element">{/*put stripe element here*/}</div>
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

