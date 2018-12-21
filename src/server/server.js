const port = 3100;
const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const CUSTOMER_ADDED = 'CUSTOMER_ADDED';
const ADDRESS_UPDATED = 'ADDRESS_UPDATED';

const server = require('http').createServer();
const io = require('socket.io')(server);
server.listen(port, () => console.log(`Listening on ${port}...`));

io.on('connection', function(socket) {
  socket.on(CREATE_CUSTOMER, payload => {
    io.emit(CUSTOMER_ADDED, { name: payload.name });
  });

  socket.on(UPDATE_ADDRESS, payload => {
    io.emit(ADDRESS_UPDATED, { customerName: payload.customerName, address: payload.address });
  });
});
