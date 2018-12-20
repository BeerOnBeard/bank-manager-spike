import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Customers.css';
import AddCustomer from './AddCustomer';
import Customer from './Customer';

class Customers extends Component {
  render() {
    return (
      <div className="customer-list">
        <AddCustomer />
      {
        Object.keys(this.props.customers).map(key => 
          <Customer key={this.props.customers[key].name} customer={this.props.customers[key]} />
        )
      }
      </div>
    );
  }
}

export default connect(
  state => { return { customers: state.customers } }
)(Customers);
