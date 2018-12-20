import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import DisplayAddress from './address/DisplayAddress';
import EditAddress from './address/EditAddress';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div>Name: { this.props.customer.name }</div>
        <div>Balance: { this.props.customer.balance }</div>
        {
          this.props.isEditingAddress
            ? <EditAddress customerName={this.props.customer.name} address={this.props.customer.address} />
            : <DisplayAddress address={this.props.customer.address} />
        }
      </div>
    );
  }
}

export default connect(
  state => { return { customer: state.customers[state.selectedCustomer], isEditingAddress: state.isEditingAddress }}
)(Main);
