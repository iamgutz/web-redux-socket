import * as types from './types';

export function connecting(event, websocket) {
  const timestamp = new Date();

  return {
    type: types.WEBSOCKET_CONNECTING,
    payload: {
      timestamp: timestamp.toString(),
      event,
      websocket,
    },
  };
}

export function open(event) {
  const timestamp = new Date();

  return {
    type: types.WEBSOCKET_OPEN,
    payload: {
      timestamp: timestamp.toString(),
      event,
    },
  };
}

export function closed(event) {
  const timestamp = new Date();

  return {
    type: types.WEBSOCKET_CLOSED,
    payload: {
      timestamp: timestamp.toString(),
      event,
    },
  };
}

export function message(event) {
  const timestamp = new Date();
  const { data } = event;

  return {
    type: types.WEBSOCKET_MESSAGE,
    payload: {
      timestamp: timestamp.toString(),
      data: JSON.parse(data),
      event,
    },
  };
}
