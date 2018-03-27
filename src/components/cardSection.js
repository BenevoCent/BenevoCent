// CardSection.js
import React from 'react';
import { db } from "../config/constants";
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';


class CardSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      charities: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCharities = this.getCharities.bind(this);

  }

  handleSubmit = (ev) => {
    console.log('in the handleSubmit cardSection')

    ev.preventDefault();
    ev.persist();
    console.log('user is', this.props.user)
    let body = {
      amount: ev.target.amount.value,
      charityId: ev.target.charity.value,
      charityName: ev.target.charity.name,
      userId: this.props.user.uid
    }
    this.props.stripe.createToken({name: 'Manny Mapsagna'}).then(({token}) => {
      console.log('Received Stripe token:', token);
      console.log('amount', ev.target.amount.value);
      console.log('charity', ev.target.charity.value);
      body.token = token;
      console.log('front end token is', token);
      axios.post('http://localhost:8000/stripeTransaction', body);

    });
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
    return (
      <div>
        <h3>Enter Card Info Here:</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
          <label>
                Donation Amount:
                <input name='amount' type='number' min='1' />
            </label>
            <label>
                Charity:
                <select name='charity'>
                    {console.log('the charities', this.charities)}
                    {this.state.charities && this.state.charities.map((charity) => (          
                        <option key={charity.name} value={charity.uid} name={charity.name}>{charity.name}</option>     
                    ))}
                </select>
            </label>
            <div>
              <label>
                Card Number
                <CardNumberElement/>
              </label>
            </div>
            <div>
              <label>
                Expiration Date
                <CardExpiryElement />
              </label>
            </div>
            <div>
              <label>
                CVC
                <CardCVCElement />
              </label>
            </div>
            <div>
              <label>
                Postal Code
                <PostalCodeElement />
              </label>
            </div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
};

export default injectStripe(CardSection);