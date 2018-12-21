import io from './ioProvider';
import { CUSTOMER_ADDED, ADDRESS_UPDATED, MONEY_DEPOSITED, MONEY_WITHDRAWN } from './redux/events';

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

  io().on(MONEY_DEPOSITED, payload => {
    store.dispatch({
      type: MONEY_DEPOSITED,
      payload: payload
    });
  });

  io().on(MONEY_WITHDRAWN, payload => {
    store.dispatch({
      type: MONEY_WITHDRAWN,
      payload: payload
    });
  });
}
