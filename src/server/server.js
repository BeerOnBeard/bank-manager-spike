// update ../client/src/ioProvider.js if you update this port
const port = 3100;

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(port, () => console.log(`Listening on ${port}...`));

app.use(express.static('public'));

const eventStoreConfig = {
  host: process.env.EVENTSTORE_HOST || 'localhost',
  port: process.env.EVENTSTORE_PORT || 1113,
  credentials: {
    username: process.env.EVENTSTORE_USERNAME || 'admin',
    password: process.env.EVENTSTORE_PASSWORD || 'changeit'
  }
};

const EventStore = require('event-store-client');
const CustomerRepository = require('./CustomerRepository');
const { REQUEST_CUSTOMERS, CREATE_CUSTOMER, UPDATE_ADDRESS, DEPOSIT_MONEY, WITHDRAW_MONEY } = require('customer/Commands');
const { CUSTOMER_ADDED, ADDRESS_UPDATED, MONEY_DEPOSITED, MONEY_WITHDRAWN } = require('customer/Events');
let connection = new EventStore.Connection({
  host: eventStoreConfig.host,
  port: eventStoreConfig.port,
  onClose: hadError => {
    console.log('Connection closed');
    if (hadError) {
      console.log('Error caused closure');
    }
    process.exit(1);
  }
});

const customerRepository = new CustomerRepository(connection, eventStoreConfig.credentials.username, eventStoreConfig.credentials.password);

io.on('connection', function(socket) {
  socket.on(REQUEST_CUSTOMERS, cb => cb(customersReadModel));

  socket.on(CREATE_CUSTOMER, async payload => {
    let customer = await customerRepository.get();
    customer.create(payload.name);
    await customerRepository.save(customer);
  });

  socket.on(UPDATE_ADDRESS, async payload => {
    let customer = await customerRepository.get(payload.id);
    customer.updateAddress(payload.address);
    await customerRepository.save(customer);
  });

  socket.on(DEPOSIT_MONEY, async payload => {
    let customer = await customerRepository.get(payload.id);
    customer.depositMoney(payload.value);
    await customerRepository.save(customer);
  });

  socket.on(WITHDRAW_MONEY, async payload => {
    let customer = await customerRepository.get(payload.id);
    customer.withdrawMoney(payload.value);
    await customerRepository.save(customer);
  });
});

const Customer = require('customer');
let customersReadModel = {};
const customersReadModelReducer = function(event) {
  switch(event.eventType) {
    case CUSTOMER_ADDED:
    {
      let customer = new Customer();
      customer.apply(event);
      customersReadModel[customer.id] = customer;
    }
    case ADDRESS_UPDATED:
    case MONEY_DEPOSITED:
    case MONEY_WITHDRAWN:
    {
      customersReadModel[event.data.id].apply(event);
    }
  }
}

let catchUpSubscriptionSettings = new EventStore.CatchUpSubscription.Settings(undefined, undefined, false, true);
connection.subscribeToStreamFrom(
  "$ce-Customer",
  undefined,
  eventStoreConfig.credentials,
  storedEvent => {
    let customerEvent = {
      eventType: storedEvent.eventType,
      eventNumber: storedEvent.eventNumber,
      data: storedEvent.data
    };

    customersReadModelReducer(customerEvent);
    io.emit(customerEvent.eventType, customerEvent);
  },
  () => {
    console.log('live processing started');
  },
  dropped => {
    console.log('Subscription dropped');
    console.log(dropped);
    process.exit(1);
  },
  catchUpSubscriptionSettings
);
