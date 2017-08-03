import log from 'fancy-log';

import initWebSocket from './initWebSocket';
import closeWebSocket from './closeWebSocket';
import * as types from './types';

export * from './types';

const createMiddleware = () => {
  let websocket;

  return store => next => (action) => {
    switch (action.type) {
      case types.WEBSOCKET_CONNECT:
        websocket = closeWebSocket(websocket);

        websocket = initWebSocket(store, action.payload);

        return next(action);

      case types.WEBSOCKET_SEND:
        if (websocket) {
          websocket.send(JSON.stringify(action.payload));
        }

        log.warn('WebSocket is not open. To open, dispatch action WEBSOCKET_CONNECT.');

        return next(action);

      case types.WEBSOCKET_DISCONNECT:
        websocket = closeWebSocket(websocket);

        return next(action);

      default:
        return next(action);
    }
  };
};

export default createMiddleware();
