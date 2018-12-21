import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CUSTOMER_SELECTED } from '../redux/events';

function selectCustomer(id) {
  return { type: CUSTOMER_SELECTED, payload: { id } };
}

class Customer extends Component {
  getClasses() {
    let classes = 'customer-list__customer';
    if (this.props.selectedCustomer === this.props.customer.id) {
      classes += ' customer-list__customer--selected'
    }

    return classes;
  }

  render() {
    return (
      <div
        className={ this.getClasses() }
        onClick={_ => this.props.selectCustomer(this.props.customer.id)}
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
