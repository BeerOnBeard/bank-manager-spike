const EventStore = require('event-store-client');
const Customer = require('customer');
const { CUSTOMER_ADDED, ADDRESS_UPDATED, MONEY_DEPOSITED, MONEY_WITHDRAWN } = require('customer/Events');

module.exports = class CustomersReadModelRepository {
  _handle(event) {
    switch(event.eventType) {
      case CUSTOMER_ADDED:
        let customer = new Customer();
        customer.apply(event);
        this._customers[customer.id] = customer;
        break;
      case ADDRESS_UPDATED:
        this._customers[event.data.id].apply(event);
        break;
      case MONEY_DEPOSITED:
        this._customers[event.data.id].apply(event);
        break;
      case MONEY_WITHDRAWN:
        this._customers[event.data.id].apply(event);
        break;
      default:
        console.log(`Could handle event with type: ${event.eventType}`);
    }
  }

  constructor(connection, username, password) {
    this._customers = {};
    
    connection.subscribeToStreamFrom(
      "$ce-Customer",
      undefined,
      { username, password },
      storedEvent => this._handle(storedEvent),
      () => console.log('live processing started'),
      dropped => {
        let error = Error('Subscription dropped');
        error.reason = dropped;
        throw error;
      },
      new EventStore.CatchUpSubscription.Settings(undefined, undefined, false, true)
    );
  }

  get() { return this._customers };
}
