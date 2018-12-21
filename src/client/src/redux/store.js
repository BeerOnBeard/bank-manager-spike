import { createStore } from 'redux';
import { CUSTOMER_SELECTED, CUSTOMER_ADDED, ADDRESS_UPDATED, MONEY_DEPOSITED, MONEY_WITHDRAWN } from './events';

const TransactionTypes = {
  Withdrawal: 'Withdrawal',
  Deposit: 'Deposit'
};

/* State Schema
  {
    selectedCustomer: '',
    customers: {
      <GUID>: {
        id: <GUID>,
        name: 'Adam',
        address: { street, postalCode, city, country },
        transactions: [
          { type, value }
        ]
      }
    }
  }
*/

function createCustomer({ id, name, address, transactions }) {
  return {
    id: id,
    name: name,
    address: address || {},
    transactions: transactions || []
  };
}

function reducer(state = {customers: {}}, action) {
  switch (action.type) {
    case CUSTOMER_SELECTED:
    {
      return {
        ...state,
        selectedCustomer: action.payload.id
      };
    }
    case CUSTOMER_ADDED:
    {
      let newCustomers = { ...state.customers };
      newCustomers[action.payload.id] = createCustomer(action.payload);
      return {
        ...state,
        customers: newCustomers
      };
    }
    case ADDRESS_UPDATED:
    {
      let updatedCustomer = { ...state.customers[action.payload.id] };
      updatedCustomer.address = action.payload.address;
      return { ...state, customers: { ...state.customers, [updatedCustomer.id]: updatedCustomer } };
    }
    case MONEY_DEPOSITED:
    {
      let updatedCustomer = { ...state.customers[action.payload.id] };
      updatedCustomer.transactions.push({ type: TransactionTypes.Deposit, value: Number(action.payload.value) });
      return { ...state, customers: { ...state.customers, [updatedCustomer.id]: updatedCustomer } };
    }
    case MONEY_WITHDRAWN:
    {
      let updatedCustomer = { ...state.customers[action.payload.id] };
      updatedCustomer.transactions.push({ type:TransactionTypes.Withdrawal, value: Number(action.payload.value) });
      return { ...state, customers: { ...state.customers, [updatedCustomer.id]: updatedCustomer } };
    }
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
