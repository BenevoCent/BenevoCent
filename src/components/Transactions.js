import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { db } from "../config/constants";

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  getTransactions() {
    var transactions = [];
    db.collection("all_transactions").doc(this.props.user.uid).collection("user_transactions")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          transactions.push(doc.data());
          console.log(doc.id, "=>", doc.data());
        });
        return transactions;
      })
      .then(transactions => {
        this.setState({ transactions: transactions });
        console.log(transactions);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  componentDidMount() {
    this.getTransactions();
  }

  render() {
    return (
      <div>
        <h1>Transactions </h1>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Account</TableHeaderColumn>
              <TableHeaderColumn>Vendor</TableHeaderColumn>
              <TableHeaderColumn>Amount</TableHeaderColumn>
              <TableHeaderColumn>Round</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            
              {
                this.state.transactions.map(elem => {
                  return (
                    <TableRow>
                      <TableRowColumn>{elem.date}</TableRowColumn>
                      <TableRowColumn>{elem.account_id}</TableRowColumn>
                      <TableRowColumn>{elem.name}</TableRowColumn>
                      <TableRowColumn>${elem.amount}</TableRowColumn>
                      <TableRowColumn>${elem.donation}</TableRowColumn>
                    </TableRow>
                  )
                })
                // <TableRowColumn>jan 01</TableRowColumn>
                // <TableRowColumn>chase credit card</TableRowColumn>
                // <TableRowColumn>kfc</TableRowColumn>
                // <TableRowColumn>$500.00</TableRowColumn>
                // <TableRowColumn>$0.00</TableRowColumn>
              }
            
          </TableBody>
        </Table>
      </div>
    );
  }
}
