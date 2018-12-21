import React, { Component } from 'react';
import { createCustomer } from '../commandGateway';
import './AddCustomer.css';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  updateName(event) {
    this.setState({ name: event.target.value });
  }

  add() {
    createCustomer(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <div className="customer-list__add">
        <input type="text" value={this.state.name} onChange={e => this.updateName(e)} placeholder="Name" />
        <button onClick={_ => this.add()} disabled={this.state.name === ''}>+</button>
      </div>
    );
  }
}

export default AddCustomer;
