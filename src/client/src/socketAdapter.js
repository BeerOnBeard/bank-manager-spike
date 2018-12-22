import io from './ioProvider';
import { CUSTOMER_ADDED, ADDRESS_UPDATED, MONEY_DEPOSITED, MONEY_WITHDRAWN } from 'customer/Events';

export default function socketAdapter(store) {
  io().on(CUSTOMER_ADDED, payload => store.dispatch({ type: payload.eventType, ...payload }));
  io().on(ADDRESS_UPDATED, payload => store.dispatch({ type: payload.eventType, ...payload }));
  io().on(MONEY_DEPOSITED, payload => store.dispatch({ type: payload.eventType, ...payload }));
  io().on(MONEY_WITHDRAWN, payload => store.dispatch({ type: payload.eventType, ...payload }));
}
