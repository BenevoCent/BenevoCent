// CardSection.js
import React from 'react';
import { db } from "../config/constants";
import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import axios from 'axios';
import { Card } from 'material-ui/Card';


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
  // inputField: {
  //   backgroundColor: 'green'
  // }
  inputField: {
    fontSize: "18px",
    lineHeight: "24px", 
    width: "306px", 
    height: "72px", 
    display: "inline-block",
    position: "relative", 
    backgroundColor: "transparent", 
    fontFamily: "Roboto, sans-serif", 
    transition: "height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
    cursor: "auto",
    left: "5%"
  }
};

class CardSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      charities: [],
      charityUid: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCharities = this.getCharities.bind(this);

  }

  handleChange = (event, index, charityUid) => {
    console.log('in handleChange');
    console.log('uid in handleChange', charityUid );

    this.setState({ charityUid });
    console.log(' state', this.state);

  };


  handleSubmit = (ev) => {
    console.log('in the handleSubmit cardSection')

    ev.preventDefault();
    ev.persist();
    let body = {
      amount: ev.target.amount.value,
      charityId: ev.target.charity.value,
      charityName: ev.target.charity.name,
      userId: this.props.user.uid
    }
    this.props.stripe.createToken({name: 'Manny Mapsagna'}).then(({token}) => {
      body.token = token;
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
      <div style={{left: "25%"}}>
          <h3>Enter Card Info Here:</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
                  Donation Amount:
                  <input name='amount' type='number' min='1' />
              </label>
                <SelectField floatingLabelText="Charity" name="charity" value={this.state.charityUid} onChange={this.handleChange}>
                  {this.state.charities && this.state.charities.map((charity) => { 
                    console.log('charity.uid', charity.uid);    
                    return (<MenuItem key={charity.name} value={charity.uid} primaryText={charity.name}/> )    
                  })}
                </SelectField>                
              <div>       
                <div style={styles.inputField} >
                  <label>
                    Card Number
                    <CardNumberElement />
                  </label>
                </div>
              </div>
              <div>
              <div style={styles.inputField} >
                <label>
                  Expiration Date 
                  <CardExpiryElement />               
                </label>
                </div>
              </div>
              <div>
                <div style={styles.inputField} >
                  <label>
                    CVC             
                    <CardCVCElement />     
                  </label>
                </div>
              </div>
              <div>
                <div style={styles.inputField} >
                  <label>
                    Postal Code   
                    <PostalCodeElement />              
                  </label>
                </div>
              </div>
              <RaisedButton
                label="Submit"
                primary={true}
                type="submit"
                style={{ margin: 12 }}
              />
              {/*<input type="submit" />*/}
            
          </form>
      </div>
    );
  }
};

export default injectStripe(CardSection);





 // <select name='charity' >
                  //     {console.log('the charities', this.charities)}
                  //     {this.state.charities && this.state.charities.map((charity) => (          
                  //         <option key={charity.name} value={charity.uid} name={charity.name}>{charity.name}</option>     
                  //     ))}
                  // </select>