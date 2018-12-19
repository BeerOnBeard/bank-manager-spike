import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DisplayAddress.css';

function editAddress() {
  return { type: 'EDIT_ADDRESS' }
}

class DisplayAddress extends Component {
  render() {
    return (
      <div className="display-address">
        <button onClick={_ => this.props.editAddress()}>Edit</button>
        <div>Street: {this.props.address.street}</div>
        <div>City: {this.props.address.city}</div>
        <div>Postal Code: {this.props.address.postalCode}</div>
        <div>Country: {this.props.address.country}</div>
      </div>
    );
  }
}

export default connect(
  null,
  { editAddress }
)(DisplayAddress);
