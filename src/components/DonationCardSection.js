// CardSection.js
import React from 'react';
import { db } from "../config/constants";
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import { Card } from 'material-ui/Card';
import axios from 'axios';
import NumberInput from 'material-ui-number-input';

console.log('delete me');


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


class DonationCardSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      charities: [],
      charityUid: '',
      donationAmount: 0,
      errorText: 'Nope'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCharities = this.getCharities.bind(this);

    this.numberChange = this.numberChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onError = this.onError.bind(this);


  }

  handleChange = (event, index, charityUid) => {
    console.log('in handleChange');
    console.log('uid in handleChange', charityUid );

    this.setState({ charityUid });
    console.log(' state', this.state);

  };


  handleSubmit = (ev) => {
    console.log('in the handleSubmit donationCardSection')

    let charity = this.state.charities.filter((charity) => charity.uid === this.state.charityUid);
    let amount = this.state.donationAmount * 100;

    ev.preventDefault();
    ev.persist();
    let body = {
      amount: amount,
      charityId: this.state.charityUid,
      charityName: charity.name,
      userId: this.props.user.uid
    }
    this.props.stripe.createToken({name: 'Manny Mapsagna'}).then(({token}) => {
      body.token = token;
      axios.post('http://localhost:8000/stripeTransaction', body);

    });
  }

  numberChange = (event, donationAmount) => {
    console.log('donationAmount', donationAmount);
    this.onValid(donationAmount);

  }

  onValid = (donationAmount) => {
    let string = donationAmount.toString();
    console.log('donationAmount', donationAmount);
    if(!string.match("[a-z]")){
      this.setState({donationAmount});
    } else {
      this.onError('Nope');
    }

  }


  onError(error) {
    this.setState({ errorText: error !== 'none' ? 'Error: ' + error : '' });
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
      <div style={{left: "25%"}}>
        <h3>Direct Donation</h3>
          
          <form onSubmit={this.handleSubmit}>  
            <NumberInput
              floatingLabelText="Donation Amount"
              value={this.donationAmount}
              onChange={this.numberChange}
              onValid={this.onValid}
              errorText={this.errorText}
              onError={this.onError}
              strategy="allow"
              required
            />
            <SelectField floatingLabelText="Charity" name="charity" value={this.state.charityUid} onChange={this.handleChange}>
              {this.state.charities && this.state.charities.map((charity) => { 
                return (<MenuItem key={charity.name} value={charity.uid} primaryText={charity.name}/> )    
              })}
            </SelectField>  
            <Card style={{width: "95vw", marginLeft: "auto", marginRight: "auto", marginTop: "2vh"}}>
            <h3>Enter Card Info Here:</h3>              
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
            </Card>
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

export default injectStripe(DonationCardSection);
