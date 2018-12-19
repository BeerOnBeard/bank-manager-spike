import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import DisplayAddress from './DisplayAddress';
import EditAddress from './EditAddress';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div>Name: { this.props.customer.name }</div>
        <div>Balance: { this.props.customer.balance }</div>
        {
          this.props.isEditingAddress
            ? <EditAddress address={this.props.customer.address} />
            : <DisplayAddress address={this.props.customer.address} />
        }
      </div>
    );
  }
}

export default connect(
  state => { return { customer: state.customers[state.selectedCustomer], isEditingAddress: state.isEditingAddress }}
)(Main);
