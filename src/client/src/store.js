import { createStore } from 'redux';

const initialState = {
  selectedCustomer: 'Adam',
  isEditingAddress: false,
  customers: {
    Adam: {
      name: 'Adam',
      balance: 12.00,
      address: {
        street: '100 Left Lane',
        postalCode: '00330',
        city: 'Nowhere',
        country: 'SPC'
      }
    },
    Smara: {
      name: 'Smara',
      balance: 100.00,
      address: {
        street: '102 Left Lane',
        postalCode: '10330',
        city: 'Now-here-ville',
        country: 'SPACE'
      }
    }
  }
}

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
      newCustomers[action.payload.name] = {
        name: action.payload.name,
        address: {}
      };
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
