import io from './ioProvider';
const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const DEPOSIT_MONEY = 'DEPOSIT_MONEY';
const WITHDRAW_MONEY = 'WITHDRAW_MONEY';

// name should be a string
export function createCustomer(name) {
  io().emit(CREATE_CUSTOMER, { name });
}

// address should be an object
// { street, city, postalCode, country }
export function updateAddress(customerName, address) {
  io().emit(UPDATE_ADDRESS, { customerName, address });
}

// value should be a number
export function deposit(customerName, value) {
  io().emit(DEPOSIT_MONEY, { customerName, value });
}

// value should be a number
export function withdraw(customerName, value) {
  io().emit(WITHDRAW_MONEY, { customerName, value });
}
