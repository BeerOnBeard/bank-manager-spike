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
const { CREATE_CUSTOMER, UPDATE_ADDRESS, DEPOSIT_MONEY, WITHDRAW_MONEY } = require('customer/Commands');
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

connection.subscribeToStream(
  "$ce-Customer",
  true,
  storedEvent => {
    let customerEvent = {
      eventType: storedEvent.eventType,
      eventNumber: storedEvent.eventNumber,
      data: storedEvent.data
    };

    io.emit(customerEvent.eventType, customerEvent);
  },
  confirmation => {
    console.log('Subscription confirmation');
    console.log(confirmation);
  },
  dropped => {
    console.log('Subscription dropped');
    console.log(dropped);
    process.exit(1);
  },
  eventStoreConfig.credentials,
  notHandled => {
    console.log('Unhandled error in subscription');
    console.log(notHandled);
    process.exit(1);
  }
);
