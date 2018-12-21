const EventStore = require('event-store-client');
const generateGuid = require('uuid/v4');

const CUSTOMER_ADDED = 'CUSTOMER_ADDED';
const ADDRESS_UPDATED = 'ADDRESS_UPDATED';
const MONEY_DEPOSITED = 'MONEY_DEPOSITED';
const MONEY_WITHDRAWN = 'MONEY_WITHDRAWN';
const TransactionTypes = {
  deposit: 'Deposit',
  withdrawal: 'Withdrawal'
};

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

class Customer {
  _publish(event) {
    this.apply(event);
    this.uncommittedEvents.push(event);
  }

  _created(event) {
    this.id = event.data.id;
    this.name = event.data.name;
  }

  _addressUpdated(event) {
    this.address = event.data.address;
  }

  _moneyDeposited(event) {
    this.transactions.push({ type: TransactionTypes.deposit, value: event.data.value });
  }

  _moneyWithdrawn(event) {
    this.transactions.push({ type: TransactionTypes.withdrawal, value: event.data.value });
  }

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.address = {};
    this.transactions = [];

    this.lastEventNumber = 0;
    this.uncommittedEvents = [];
  }

  apply(event) {
    this.lastEventNumber = event.eventNumber;
    switch(event.eventType) {
      case CUSTOMER_ADDED:
        this._created(event);
        break;
      case ADDRESS_UPDATED:
        this._addressUpdated(event);
        break;
      case MONEY_DEPOSITED:
        this._moneyDeposited(event);
        break;
      case MONEY_WITHDRAWN:
        this._moneyWithdrawn(event);
        break;
    }
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
    let newCustomer = new Customer();
    newCustomer.id = this.id;
    newCustomer.name = this.name;
    newCustomer.address = this.address;
    newCustomer.transactions = this.transactions;
    newCustomer.lastEventNumber = this.lastEventNumber;
    newCustomer.uncommittedEvents = this.uncommittedEvents;
    return newCustomer;
  }
}

module.exports = Customer;
