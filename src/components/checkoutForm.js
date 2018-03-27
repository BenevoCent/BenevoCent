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
    this.state = {
      charities: []
    };
    
    this.getCharities = this.getCharities.bind(this);
  }



  getCharities() {
    let charities = [];
    db
    .collection('charities')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        charities.push(doc.data());
        console.log(doc.id, '=>', doc.data());
      });
      return charities;
    })
    .then(charities => {
      this.setState({ charities });
      console.log('charities', charities);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  componentDidMount() {
    this.getCharities();
  }

  render() {
      console.log('in renderer', this.charities);

    return (
        <div style={formStyle}>
            <h3>Lump Donation</h3>
            <p>Here you can make a lump donation to any charity of your choosing</p>
            <label>
                Donation Amount:
                <input type='number' min='1' />
            </label>
            <label>
                Charity:
                <select>
                    {console.log('the charities', this.charities)}
                    {this.state.charities && this.state.charities.map((charity) => (          
                        <option value={charity.uid}>{charity.name}</option>     
                    ))}
                </select>
            </label>
            <form onSubmit={this.handleSubmit}>
                {/*<AddressSection />*/}
                <CardSection />
                <button>Confirm order</button>
            </form> 
        </div>
    );
  }
}

export default injectStripe(CheckoutForm);



// <form action="/charge" method="post" id="payment-form">
//                 <div class="form-row">
//                     <label for="card-element">Credit or Debit Card</label>
//                     <div id="card-element">{/*put stripe element here*/}</div>
//                     <div id="card-errors" role="alert"></div>
//                 </div>
//                 <button>Submit Payment</button>
//             </form>




//let userId = this.props.user.uid;
    //const userAccounts = this.state.userAccounts;
    // var stripe = Stripe('pk_test_7NDxNFwTXZI5iGsCursLGPh2');

    // // Create an instance of Elements.
    // var elements = stripe.elements();

    // // Custom styling can be passed to options when creating an Element.
    // // (Note that this demo uses a wider set of styles than the guide below.)
    

    // // Create an instance of the card Element.
    // var card = elements.create('card', {style: style});

    // // Add an instance of the card Element into the `card-element` <div>.
    // card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    // card.addEventListener('change', function(event) {
    //     var displayError = document.getElementById('card-errors');
    //     if (event.error) {
    //     displayError.textContent = event.error.message;
    //     } else {
    //     displayError.textContent = '';
    //     }
    // });
  
    // Handle form submission.
    // var form = document.getElementById('payment-form');
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    
    //     stripe.createToken(card).then(function(result) {
    //     if (result.error) {
    //         // Inform the user if there was an error.
    //         var errorElement = document.getElementById('card-errors');
    //         errorElement.textContent = result.error.message;
    //     } else {
    //         // Send the token to your server.
    //         stripeTokenHandler(result.token);
    //     }
    //     });
    // });

