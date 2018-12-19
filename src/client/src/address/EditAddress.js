import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditAddress.css';

class EditAddress extends Component {
  submit(event) {
    event.preventDefault();
    console.log(event);
  }

  render() {
    return (
      <form className="edit-address">
        <div>
          <label htmlFor="street">Street:</label>
          <input id="street" type="text" defaultValue={this.props.address.street} />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input id="city" type="text" defaultValue={this.props.address.city} />
        </div>
        <div>
          <label htmlFor="postal-code">Postal Code:</label>
          <input id="postal-code" type="text" defaultValue={this.props.address.postalCode} />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input id="country" type="text" defaultValue={this.props.address.country} />
        </div>
        <input type="submit" value="submit" onClick={this.submit} />
      </form>
    );
  }
}

export default connect(

)(EditAddress);
