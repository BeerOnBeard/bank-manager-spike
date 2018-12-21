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
export function updateAddress(id, address) {
  io().emit(UPDATE_ADDRESS, { id, address });
}

// value should be a number
export function deposit(id, value) {
  io().emit(DEPOSIT_MONEY, { id, value });
}

// value should be a number
export function withdraw(id, value) {
  io().emit(WITHDRAW_MONEY, { id, value });
}
