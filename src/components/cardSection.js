// CardSection.js
import React from 'react';
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';

let formElementStyle = {
  style: {

  }
}

class CardSection extends React.Component {

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
    return (
      <div>
        <h3>Enter Card Info Here:</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
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
          </div>
        </form>
        {/*<PaymentRequestButtonElement />*/}
      </div>
      
    );
  }
};

export default CardSection;