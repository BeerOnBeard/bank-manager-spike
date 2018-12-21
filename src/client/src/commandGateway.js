import io from './ioProvider';
const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

// name should be a string
export function createCustomer(name) {
  io().emit(CREATE_CUSTOMER, { name });
  console.log(`Create customer with name: ${name}`);
}

// address should be an object
// { street, city, postalCode, country }
export function updateAddress(customerName, address) {
  io().emit(UPDATE_ADDRESS, { customerName, address });
  console.log(`Update address for ${customerName}`);
  console.log(address);
}
