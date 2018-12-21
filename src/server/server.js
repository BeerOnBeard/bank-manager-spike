const port = 3100;

// commands
const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const DEPOSIT_MONEY = 'DEPOSIT_MONEY';
const WITHDRAW_MONEY = 'WITHDRAW_MONEY';

// events
const CUSTOMER_ADDED = 'CUSTOMER_ADDED';
const ADDRESS_UPDATED = 'ADDRESS_UPDATED';
const MONEY_DEPOSITED = 'MONEY_DEPOSITED';
const MONEY_WITHDRAWN = 'MONEY_WITHDRAWN';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(port, () => console.log(`Listening on ${port}...`));

app.use(express.static('public'));

io.on('connection', function(socket) {
  socket.on(CREATE_CUSTOMER, payload => {
    io.emit(CUSTOMER_ADDED, { name: payload.name });
  });

  socket.on(UPDATE_ADDRESS, payload => {
    io.emit(ADDRESS_UPDATED, { customerName: payload.customerName, address: payload.address });
  });

  socket.on(DEPOSIT_MONEY, payload => {
    io.emit(MONEY_DEPOSITED, { customerName: payload.customerName, value: payload.value });
  });

  socket.on(WITHDRAW_MONEY, payload => {
    io.emit(MONEY_WITHDRAWN, { customerName: payload.customerName, value: payload.value });
  })
});
