import React, { Component } from 'react';
import { updateAddress } from '../commandGateway';
import './EditAddress.css';

class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: props.address.street || '',
      city: props.address.city || '',
      postalCode: props.address.postalCode || '',
      country: props.address.country || ''
    };
  }

  updateStreet(event) {
    this.setState({ ...this.state, street: event.target.value });
  }

  updateCity(event) {
    this.setState({ ...this.state, city: event.target.value });
  }

  updatePostalCode(event) {
    this.setState({ ...this.state, postalCode: event.target.value });
  }

  updateCountry(event) {
    this.setState({ ...this.state, country: event.target.value });
  }

  submit(event) {
    event.preventDefault();
    updateAddress(this.props.customerId, this.state);
    this.props.stopEditingAddress();
  }

  render() {
    return (
      <form className="edit-address">
        <div>
          <label htmlFor="street">Street:</label>
          <input id="street" type="text" value={this.state.street} onChange={e => this.updateStreet(e)} />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input id="city" type="text" value={this.state.city} onChange={e => this.updateCity(e)} />
        </div>
        <div>
          <label htmlFor="postal-code">Postal Code:</label>
          <input id="postal-code" type="text" value={this.state.postalCode} onChange={e => this.updatePostalCode(e)} />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input id="country" type="text" value={this.state.country} onChange={e => this.updateCountry(e)} />
        </div>
        <input type="submit" value="submit" onClick={e => this.submit(e)} />
      </form>
    );
  }
}

export default EditAddress;
