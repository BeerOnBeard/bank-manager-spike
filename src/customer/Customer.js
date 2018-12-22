const eventTypes = require('./Events');
const TransactionTypes = require('./TransactionTypes');

module.exports = class Customer {
  _created(event) {
    this.id = event.data.id;
    this.name = event.data.name;
  }

  _addressUpdated(event) {
    this.address = event.data.address;
  }

  _moneyDeposited(event) {
    let value = Number(event.data.value);
    this.transactions.push({ type: TransactionTypes.DEPOSIT, value: value });
    this.balance += value;
  }

  _moneyWithdrawn(event) {
    let value = Number(event.data.value);
    this.transactions.push({ type: TransactionTypes.WITHDRAWAL, value: value });
    this.balance -= value;
  }

  constructor(customer) {
    if (!customer) {
      customer = {};
    }

    let { id, name, address, transactions, lastEventNumber, balance } = customer;

    this.id = id;
    this.name = name;
    this.address = address || {};
    this.transactions = transactions || [];
    this.balance = balance || 0;
    this.lastEventNumber = lastEventNumber || 0;
  }

  apply(event) {
    this.lastEventNumber = event.eventNumber;
    switch(event.eventType) {
      case eventTypes.CUSTOMER_ADDED:
        this._created(event);
        break;
      case eventTypes.ADDRESS_UPDATED:
        this._addressUpdated(event);
        break;
      case eventTypes.MONEY_DEPOSITED:
        this._moneyDeposited(event);
        break;
      case eventTypes.MONEY_WITHDRAWN:
        this._moneyWithdrawn(event);
        break;
    }
  }
}
