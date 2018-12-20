import { createStore } from 'redux';

function createCustomer({name, balance, address, transactions}) {
  return {
    name: name,
    balance: balance,
    address: address || {},
    transactions: transactions || []
  };
}

function createWithdrawal(value) {
  return { type: 'Withdrawal', value: value };
}

function createDeposit(value) {
  return { type: 'Deposit', value: value };
}

const initialState = {
  selectedCustomer: 'Adam',
  isEditingAddress: false,
  customers: {
    Adam: createCustomer({
      name: 'Adam',
      address: {
        street: '100 Left Lane',
        postalCode: '00330',
        city: 'Nowhere',
        country: 'SPC'
      },
      transactions: [
        createWithdrawal(1), createDeposit(2), createDeposit(2), createDeposit(3), createWithdrawal(4),createWithdrawal(1),
        createDeposit(2), createDeposit(3), createWithdrawal(4),createWithdrawal(1), createDeposit(2), createDeposit(3),
        createWithdrawal(4),createWithdrawal(1), createDeposit(2), createDeposit(3), createWithdrawal(4),createWithdrawal(1),
        createDeposit(2), createDeposit(3), createWithdrawal(4),createWithdrawal(1), createDeposit(2), createDeposit(3), createWithdrawal(4)
      ]
    }),
    Smara: createCustomer({
      name: 'Smara',
      address: {
        street: '102 Left Lane',
        postalCode: '10330',
        city: 'Now-here-ville',
        country: 'SPACE'
      },
      transactions: [
        createDeposit(2), createDeposit(4.5), createDeposit(3), createWithdrawal(4), createDeposit(4)
      ]
    }),
    Phil: createCustomer({ name: 'Phil' }),
    Nancy: createCustomer({ name: 'Nancy' }),
    Joe: createCustomer({ name: 'Joe' }),
    Damian: createCustomer({ name: 'Damian' }),
    Bogdan: createCustomer({ name: 'Bogdan' }),
    Alex: createCustomer({ name: 'Alex' }),
    Matt: createCustomer({ name: 'Matt' }),
    Phil2: createCustomer({ name: 'Phil2' }),
    Nancy2: createCustomer({ name: 'Nancy2' }),
    Joe2: createCustomer({ name: 'Joe2' }),
    Damian2: createCustomer({ name: 'Damian2' }),
    Bogdan2: createCustomer({ name: 'Bogdan2' }),
    Alex2: createCustomer({ name: 'Alex2' }),
    Matt2: createCustomer({ name: 'Matt2' }),
    Phil3: createCustomer({ name: 'Phil3' }),
    Nancy3: createCustomer({ name: 'Nancy3' }),
    Joe3: createCustomer({ name: 'Joe3' }),
    Damian3: createCustomer({ name: 'Damian3' }),
    Bogdan3: createCustomer({ name: 'Bogdan3' }),
    Alex3: createCustomer({ name: 'Alex3' }),
    Matt3: createCustomer({ name: 'Matt3' }),
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT':
      return {
        ...state,
        selectedCustomer: action.payload.name,
        isEditingAddress: false
      };
    case 'CUSTOMER_ADDED':
      let newCustomers = { ...state.customers };
      newCustomers[action.payload.name] = createCustomer({
        name: action.payload.name
      });
      return {
        ...state,
        customers: newCustomers
      };
    case 'EDIT_ADDRESS':
      return {
        ...state,
        isEditingAddress: true
      };
    case 'DISPLAY_ADDRESS':
      return {
        ...state,
        isEditingAddress: false
      };
    case 'ADDRESS_UPDATED':
      let newState = { ...state };
      newState.customers[action.payload.customerName].address = action.payload.address;
      return newState;
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
