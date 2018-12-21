import { createStore } from 'redux';
import { CUSTOMER_SELECTED, CUSTOMER_ADDED, ADDRESS_UPDATED } from './events';

/*
const TransactionTypes = {
  Withdrawal: 'Withdrawal',
  Deposit: 'Deposit'
};
*/

/* State Schema
  {
    selectedCustomer: '',
    customers: {
      Adam: {
        name: 'Adam',
        address: { street, postalCode, city, country },
        transactions: [
          { type, value }
        ]
      }
    }
  }
*/

function createCustomer({ name, address, transactions }) {
  return {
    name: name,
    address: address || {},
    transactions: transactions || []
  };
}

function reducer(state = {customers: {}}, action) {
  switch (action.type) {
    case CUSTOMER_SELECTED:
      return {
        ...state,
        selectedCustomer: action.payload.name
      };
    case CUSTOMER_ADDED:
      let newCustomers = { ...state.customers };
      newCustomers[action.payload.name] = createCustomer(action.payload);
      return {
        ...state,
        customers: newCustomers
      };
    case ADDRESS_UPDATED:
      let updatedCustomer = { ...state.customers[action.payload.customerName] };
      updatedCustomer.address = action.payload.address;
      return { ...state, customers: { ...state.customers, [updatedCustomer.name]: updatedCustomer } };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
