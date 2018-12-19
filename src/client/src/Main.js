import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div>Name: { this.props.customers[this.props.selectedCustomer].name }</div>
      </div>
    );
  }
}

export default connect(
  state => { return { selectedCustomer: state.selectedCustomer, customers: state.customers }}
)(Main);
