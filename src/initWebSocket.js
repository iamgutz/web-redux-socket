import { compose } from 'redux';
import partial from 'lodash/fp/partial';
import partialRight from 'lodash/fp/partialRight';
import isFunction from 'lodash/fp/isFunction';

import createWebSocket from './createWebSocket';
import { message, connecting, open, closed } from './actions';

export default function initWebSocket({ dispatch }, params) {
  // Action creators actions dispatcher.
  const actionDispatch = partial(compose, [dispatch]);

  const websocket = createWebSocket(params);

  websocket.onclose = actionDispatch(closed);

  websocket.onmessage = actionDispatch(message);

  websocket.onopen = (event) => {
    if (isFunction(params.onOpen)) {
      params.onOpen(event);
    }

    const openAction = actionDispatch(open);
    openAction(event);
  };

  websocket.onerror = (event) => {
    if (isFunction(params.onError)) {
      params.onError(event);
    }
    websocket.close();
  };

  // WebSocket with onconnecting support can dispatch this action
  const onConnecting = actionDispatch(connecting);
  websocket.onconnecting = partialRight(onConnecting, [websocket]);

  return websocket;
}
