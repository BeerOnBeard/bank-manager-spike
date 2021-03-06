import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import DisplayAddress from './address/DisplayAddress';
import EditAddress from './address/EditAddress';
import DisplayTransactions from './transactions/DisplayTransactions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditingAddress: false };
    this.startEditingAddress = this.startEditingAddress.bind(this);
    this.stopEditingAddress = this.stopEditingAddress.bind(this);
  }

  startEditingAddress() {
    this.setState({ isEditingAddress: true });
  }

  stopEditingAddress() {
    this.setState({ isEditingAddress: false });
  }

  render() {
    if (!this.props.customer) {
      return null;
    }

    return (
      <div className="main">
        <div>Name: { this.props.customer.name }</div>
        <div>Balance: { this.props.customer.balance }</div>
        {
          this.state.isEditingAddress
            ? <EditAddress address={this.props.customer.address} customerId={this.props.customer.id} stopEditingAddress={this.stopEditingAddress} />
            : <DisplayAddress address={this.props.customer.address} startEditingAddress={this.startEditingAddress} />
        }
        <DisplayTransactions customerId={this.props.customer.id} transactions={this.props.customer.transactions} />
      </div>
    );
  }
}

export default connect(
  state => { return { customer: state.customers[state.selectedCustomer] }}
)(Main);
