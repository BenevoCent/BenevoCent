import React from 'react';
import { db } from "../config/constants";
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import { injectStripe } from 'react-stripe-elements';
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import { Card } from 'material-ui/Card';
import axios from 'axios';
import NumberInput from 'material-ui-number-input';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '1rem'
  },
  container: {
    padding: '1em'
  },
  inputField: {
    fontSize: "18px",
    lineHeight: "24px",
    position: "relative",
    cursor: "auto",
    left: "5%",
  }
};


class SubscriptionCardSection extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

  }



  handleSubmit = (ev) => {

    console.log('in handleSubmit');

    ev.preventDefault();
    ev.persist();
    let userId = this.props.user.uid;

    this.props.stripe.createToken({ name: userId }).then(({ token }) => {
      console.log('in createToken');

      axios.post('http://localhost:8000/subscribeCustomer', { userId, token });
    });
  }

  render() {
    return (
      <div style={{ left: "25%" }}>
        <h3>Enter Card Info</h3>
        <p>Benevocent looks at your transactions for all your accounts, but only bills you on a single account.
        Please specify the card you'd like to make you're monthly donations with</p>
        <form onSubmit={this.handleSubmit}>
          <div style={styles.inputField} >
            <label>
              Card Number
                <CardNumberElement />
            </label>
          </div>
          <div style={styles.inputField} >
            <label>
              Expiration Date
                <CardExpiryElement />
            </label>
          </div>
          <div style={styles.inputField} >
            <label>
              CVC
                <CardCVCElement />
            </label>
          </div>
          <div style={styles.inputField} >
            <label>
              Postal Code
                <PostalCodeElement />
            </label>
          </div>
          <RaisedButton
            label="Submit"
            primary={true}
            type="submit"
            style={{ margin: 12 }}
          />
        </form>
      </div>
    );
  }
};

export default injectStripe(SubscriptionCardSection);
