import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CUSTOMER_SELECTED } from '../redux/events';

function selectCustomer(customerName) {
  return { type: CUSTOMER_SELECTED, payload: { name: customerName } };
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
        {this.props.customer.name}
      </div>
    );
  }
}

export default connect(
  state => { return { selectedCustomer: state.selectedCustomer } },
  { selectCustomer }
)(Customer);
