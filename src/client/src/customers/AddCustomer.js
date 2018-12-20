import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddCustomer.css';

function addCustomer(name) {
  return {
    type: 'CUSTOMER_ADDED',
    payload: { name }
  };
}

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  updateName(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="customer-list__add">
        <input type="text" value={this.state.name} onChange={e => this.updateName(e)} />
        <button onClick={_ => this.props.addCustomer(this.state.name)} disabled={this.state.name === ''}>+</button>
      </div>
    );
  }
}

export default connect(
  null,
  { addCustomer }
)(AddCustomer);
