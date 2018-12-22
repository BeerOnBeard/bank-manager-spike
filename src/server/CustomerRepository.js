const EventStore = require('event-store-client');
const Customer = require('./CommandDecoratedCustomer');

class CustomerRepository {
  _buildStreamName(customerId) {
    return `Customer-${customerId}`;
  }

  constructor(connection, username, password) {
    this._connection = connection;
    this._credentials = { username, password };
  }

  get(id) {
    if (id === undefined) {
      return new Promise(resolve => resolve(new Customer()));
    }

    return new Promise(resolve => {
      let customer = new Customer();
      this._connection.readStreamEventsForward(
        this._buildStreamName(id),
        0,
        1000,
        false,
        false,
        event => customer.apply(event),
        this._credentials,
        () => resolve(customer)
      );
    });
  }

  save(customer) {
    let newCustomer = customer.copy();
    let uncommittedEvents = newCustomer.uncommittedEvents.splice(0);
    return new Promise(resolve => {
      this._connection.writeEvents(
        this._buildStreamName(newCustomer.id),
        EventStore.ExpectedVersion.Any,
        false,
        uncommittedEvents,
        this._credentials,
        message => {
          newCustomer.lastEventNumber = message.lastEventNumber;
          resolve(newCustomer);
        }
      );
    });
  }
}

module.exports = CustomerRepository;
