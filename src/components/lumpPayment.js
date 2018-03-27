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

    //this.state({orgs: []});
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    // db.collection('charities')
    // .get()
    // .then(snapshot => {
    //     this.orgs = [];
    //     snapshot.forEach((doc) => {
    //         this.orgs.push({name: doc.data().name, uid:doc.data().uid});
    //     })
    //     this.setState({orgs: this.orgs});
    //     console.log('componentDidMount done');
    // })

  }

  handleSubmit = (ev) => {

    ev.preventDefault();
    this.props.stripe.createToken({name: 'Manny Mapsagna'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });
  }

  
  // render(){
  //   <Checkout
  //     name={'The Road to learn React'}
  //     description={'Only the Book'}
  //     amount={1}
  //   />
  // }
  

  render() {
    console.log('in lumpPayment');
    return (
        <Elements>
            <InjectedCheckoutForm />
        </Elements>
    );
  }
}
