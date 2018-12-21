import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DisplayAddress.css';

class DisplayAddress extends Component {
  render() {
    return (
      <div className="display-address">
        <div>Street: {this.props.address.street}</div>
        <div>City: {this.props.address.city}</div>
        <div>Postal Code: {this.props.address.postalCode}</div>
        <div>Country: {this.props.address.country}</div>
        <button onClick={_ => this.props.startEditingAddress()}>Edit</button>
      </div>
    );
  }
}

export default connect(

)(DisplayAddress);
