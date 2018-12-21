import io from './ioProvider';
import { CUSTOMER_ADDED, ADDRESS_UPDATED } from './redux/events';

export default function socketAdapter(store) {
  // expected payload: { name: '', address: {}, transactions: [] }
  io().on(CUSTOMER_ADDED, payload => {
    store.dispatch({
      type: CUSTOMER_ADDED,
      payload: payload
    });
  });

  // expected payload: { customerName, address }
  io().on(ADDRESS_UPDATED, payload => {
    store.dispatch({
      type: ADDRESS_UPDATED,
      payload: payload
    });
  });
}
