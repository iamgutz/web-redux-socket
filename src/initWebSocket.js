import { compose } from 'redux';
import partial from 'lodash/fp/partial';
import partialRight from 'lodash/fp/partialRight';

import createWebSocket from './createWebSocket';
import { connecting, open, closed, message } from './actions';

export default function initWebSocket({ dispatch }, config, websocket) {
  websocket = createWebSocket(config);
  // Function will dispatch actions returned from action creators.
  const dispatchAction = partial(compose, [dispatch]);

  // Setup handlers to be called like this:
  // dispatch(open(event));
  websocket.onopen = (event) => {
    if (typeof config.onOpen === 'function') {
      config.onOpen(event);
    }
    const openAction = dispatchAction(open);
    openAction(event);
  };
  websocket.onclose = dispatchAction(closed);
  websocket.onmessage = dispatchAction(message);
  // An optimistic callback assignment for WebSocket objects that support this
  const onConnecting = dispatchAction(connecting);
  // Add the websocket as the 2nd argument (after the event).
  websocket.onconnecting = partialRight(onConnecting, [websocket]);
  websocket.onerror = (event) => {
    if (typeof config.onError === 'function') {
      config.onError(event);
    }
  };

  return websocket;
}
