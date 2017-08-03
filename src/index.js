import initWebSocket from './initWebSocket';
import closeWebSocket from './closeWebSocket';
import * as types from './types';

export * from './types';

const createMiddleware = () => {
  let websocket;

  return store => next => (action) => {
    switch (action.type) {
      case types.WEBSOCKET_CONNECT:
        closeWebSocket(websocket);

        websocket = initWebSocket(store, action.payload, websocket);

        return next(action);

      case types.WEBSOCKET_SEND:
        if (websocket) {
          websocket.send(JSON.stringify(action.payload));
        }

        console.warn('WebSocket is not open. To open, dispatch action WEBSOCKET_CONNECT.');

        return next(action);

      case types.WEBSOCKET_DISCONNECT:
        closeWebSocket(websocket);

        return next(action);

      default:
        return next(action);
    }
  };
};

export default createMiddleware();
