import { createStore } from 'redux';
import { INIT_CUSTOMERS, CUSTOMER_SELECTED } from './events';
import { CUSTOMER_ADDED, ADDRESS_UPDATED, MONEY_DEPOSITED, MONEY_WITHDRAWN } from 'customer/Events';
import Customer from 'customer';

function generateNewStateWithCustomer(state, customer) {
  return { ...state, customers: { ...state.customers, [customer.id]: customer } };
}

function reducer(state = {customers: {}}, event) {
  switch (event.type) {
    case INIT_CUSTOMERS:
      return { ...state, customers: event.payload };
    case CUSTOMER_SELECTED:
      return { ...state, selectedCustomer: event.payload.id };
    case CUSTOMER_ADDED:
    {
      let newCustomer = new Customer();
      newCustomer.apply(event);
      return generateNewStateWithCustomer(state, newCustomer);
    }
    case ADDRESS_UPDATED:
    {
      let currentCustomer = state.customers[event.data.id];
      let updatedCustomer = new Customer(currentCustomer);
      updatedCustomer.apply(event);
      return generateNewStateWithCustomer(state, updatedCustomer);
    }
    case MONEY_DEPOSITED:
    {
      let currentCustomer = state.customers[event.data.id];
      let updatedCustomer = new Customer(currentCustomer);
      updatedCustomer.apply(event);
      return generateNewStateWithCustomer(state, updatedCustomer);
    }
    case MONEY_WITHDRAWN:
    {
      let currentCustomer = state.customers[event.data.id];
      let updatedCustomer = new Customer(currentCustomer);
      updatedCustomer.apply(event);
      return generateNewStateWithCustomer(state, updatedCustomer);
    }
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
