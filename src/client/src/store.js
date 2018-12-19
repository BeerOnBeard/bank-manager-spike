import { createStore } from 'redux';

const initialState = {
  selectedCustomer: 'Adam',
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
        street: '101 Left Lane',
        postalCode: '10330',
        city: 'Nowhereville',
        country: 'SPACE'
      }
    }
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT':
      console.log(action.payload);
      return {
        ...state,
        selectedCustomer: action.payload.name
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
