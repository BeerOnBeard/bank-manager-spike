const { REQUEST_CUSTOMERS, CREATE_CUSTOMER, UPDATE_ADDRESS, DEPOSIT_MONEY, WITHDRAW_MONEY } = require('customer/Commands');

module.exports = function(customerRepository, customerReadModelRepository, io, connection, username, password) {
  io.on('connection', function(socket) {
    socket.on(REQUEST_CUSTOMERS, cb => cb(customerReadModelRepository.get()));

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
    storedEvent =>
      io.emit(storedEvent.eventType, {
        eventType: storedEvent.eventType,
        eventNumber: storedEvent.eventNumber,
        data: storedEvent.data
    }),
    confirmed => console.log('Subscription confirmed', confirmed),
    dropped => {
      let error = Error('Subscription dropped');
      error.reason = dropped;
      throw error;
    },
    { username, password },
    notHandled => {
      let error = Error('Subscription not handled');
      error.reason = notHandled;
      throw error;
    }
  );
}
