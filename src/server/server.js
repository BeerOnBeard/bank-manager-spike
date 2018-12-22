// update ../client/src/ioProvider.js if you update this port
const port = 3100;

const express = require('express');
const app = express();
app.use(express.static('public'));

const server = require('http').Server(app);
server.listen(port, () => console.log(`Listening on ${port}...`));

const io = require('socket.io')(server);

const eventStoreConfig = {
  host: process.env.EVENTSTORE_HOST || 'localhost',
  port: process.env.EVENTSTORE_PORT || 1113,
  credentials: {
    username: process.env.EVENTSTORE_USERNAME || 'admin',
    password: process.env.EVENTSTORE_PASSWORD || 'changeit'
  }
};

const EventStore = require('event-store-client');
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

const CustomerRepository = require('./CustomerRepository');
const CustomerReadModelRepository = require('./CustomersReadModelRepository');
const customerRepository = new CustomerRepository(connection, eventStoreConfig.credentials.username, eventStoreConfig.credentials.password);
const customerReadModelRepository = new CustomerReadModelRepository(connection, eventStoreConfig.credentials.username, eventStoreConfig.credentials.password);
require('./socketFacade')(customerRepository, customerReadModelRepository, io, connection, eventStoreConfig.credentials.username, eventStoreConfig.credentials.password);
