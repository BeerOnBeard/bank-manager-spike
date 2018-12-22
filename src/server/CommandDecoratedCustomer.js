const EventStore = require('event-store-client');
const generateGuid = require('uuid/v4');
const Customer = require('customer');
const { CUSTOMER_ADDED, ADDRESS_UPDATED, MONEY_DEPOSITED, MONEY_WITHDRAWN } = require('customer/Events');

const EventFactory = {
  customerAdded: name => {
    return {
      eventId: EventStore.Connection.createGuid(),
      eventType: CUSTOMER_ADDED,
      data: {
        id: generateGuid(),
        name: name
      }
    };
  },
  addressUpdated: (id, address) => {
    return {
      eventId: EventStore.Connection.createGuid(),
      eventType: ADDRESS_UPDATED,
      data: { id, address }
    };
  },
  moneyDeposited: (id, value) => {
    return {
      eventId: EventStore.Connection.createGuid(),
      eventType: MONEY_DEPOSITED,
      data: { id, value }
    };
  },
  moneyWithdrawn: (id, value) => {
    return {
      eventId: EventStore.Connection.createGuid(),
      eventType: MONEY_WITHDRAWN,
      data: { id, value }
    };
  }
}

class CommandDecoratedCustomer extends Customer {
  constructor() {
    super();
    this.uncommittedEvents = [];
  }
  
  _publish(event) {
    this.apply(event);
    this.uncommittedEvents.push(event);
  }

  create(name) {
    if (this.id !== undefined) {
      throw Error('Cannot create a customer that already exists.');
    }

    this._publish(EventFactory.customerAdded(name));
  }

  updateAddress(address) {
    if (this.id === undefined) {
      throw Error('Customer does not exist.');
    }

    this._publish(EventFactory.addressUpdated(this.id, address));
  }

  depositMoney(value) {
    if (this.id === undefined) {
      throw Error('Customer does not exist.');
    }

    this._publish(EventFactory.moneyDeposited(this.id, value));
  }

  withdrawMoney(value) {
    if (this.id === undefined) {
      throw Error('Customer does not exist.');
    }

    this._publish(EventFactory.moneyWithdrawn(this.id, value));
  }

  copy() {
    let newCustomer = new Customer(this);
    newCustomer.uncommittedEvents = this.uncommittedEvents;
    return newCustomer;
  }
}

module.exports = CommandDecoratedCustomer;
