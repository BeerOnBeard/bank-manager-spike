import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import DisplayAddress from './address/DisplayAddress';
import EditAddress from './address/EditAddress';
import DisplayTransactions from './transactions/DisplayTransactions';

class Main extends Component {
  balance() {
    return this.props.customer.transactions.reduce((accumulator, transaction) => {
      if (transaction.type === 'Deposit') {
        return accumulator + transaction.value;
      } else {
        return accumulator - transaction.value;
      }
    }, 0);
  }

  render() {
    return (
      <div className="main">
        <div>Name: { this.props.customer.name }</div>
        <div>Balance: { this.balance() }</div>
        {
          this.props.isEditingAddress
            ? <EditAddress customerName={this.props.customer.name} address={this.props.customer.address} />
            : <DisplayAddress address={this.props.customer.address} />
        }
        <DisplayTransactions />
      </div>
    );
  }
}

export default connect(
  state => { return { customer: state.customers[state.selectedCustomer], isEditingAddress: state.isEditingAddress }}
)(Main);
