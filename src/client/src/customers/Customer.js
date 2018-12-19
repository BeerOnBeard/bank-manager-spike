import React, { Component } from 'react';
import { connect } from 'react-redux';

function selectCustomer(customerName) {
  return { type: 'SELECT', payload: { name: customerName } };
}

class Customer extends Component {
  getClasses() {
    let classes = 'customer-list__customer';
    if (this.props.selectedCustomer === this.props.customer.name) {
      classes += ' customer-list__customer--selected'
    }

    return classes;
  }

  render() {
    return (
      <div
        className={ this.getClasses() }
        onClick={_ => this.props.selectCustomer(this.props.customer.name)}
        >
        <div>Name: {this.props.customer.name}</div>
        <div>Balance: {this.props.customer.balance}</div>
      </div>
    );
  }
}

export default connect(
  state => { return { selectedCustomer: state.selectedCustomer } },
  { selectCustomer }
)(Customer);
