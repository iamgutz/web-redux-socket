# web-redux-socket
Redux Middleware for WebSocket connections.

## Installation
`npm install web-redux-socket --save`

## Setup
Add the Middleware to the Redux store.

src/store/index.js
```
import {
  compose,
  createStore,
  applyMiddleware
} from 'redux'

import webreduxsocket from 'web-redux-socket'

import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const finalCreateStore = compose(
  applyMiddleware(thunk, webreduxsocket)
)(createStore)

export default finalCreateStore(rootReducer)
```

Add a reducer.
src/reducers/websocket.js

```
// import default action types from web-redux-socket
import {
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE
} from 'web-redux-socket'

const initialState = {
  connectionOpen: false,
  msgReceived: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case WEBSOCKET_OPEN:
      return {
        ...state,
        connectionOpen: true
      };
    case WEBSOCKET_CLOSED:
      return {
        ...state,
        connectionOpen: false
      };
    case WEBSOCKET_MESSAGE:
      const { timestamp, event, data } = action.payload

      return {
        ...state,
        msgReceived: {
          timestamp,
          event,
          data
        }
      };
    default:
      return state;
  }
}
```

Add actions.
src/actions/websocket.js

```
// import default action types from web-redux-socket
import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_SEND,
  WEBSOCKET_DISCONNECT
} from 'web-redux-socket'

export function connectWebsocket (url, openCallback, errorCallback) {
  return {
    type: WEBSOCKET_CONNECT,
    payload: {
      url: url, // ws://localhost:8080
      authorization: 'Token123123', // if you need an authorization header
      onOpen: (event) => {
        console.log('connection open!')
        openCallback(event)
      },
      onError: (event) => {
        console.log('There was an error connecting to websocket!')

        errorCallback(event)
      }
    }
  }
}

export function sendMessageToWebsocket (msg) {
  return {
    type: WEBSOCKET_SEND,
    payload: msg
  }
}

export function disconnectWebsocket () {
  return {
    type: WEBSOCKET_DISCONNECT
  }
}
```


## Action types
|Action|Description|
|------|-----------|
|WEBSOCKET_OPEN|Triggered when the connection with the websocket is open|
|WEBSOCKET_CLOSED|Triggered when the connection with the websocket got closed|
|WEBSOCKET_MESSAGE|Triggered when the websocket sends a message to the client|
|WEBSOCKET_CONNECT|Trigger to connect to websocket|
|WEBSOCKET_SEND|Trigger to send message to the websocket|
|WEBSOCKET_DISCONNECT|Trigger to disconnect from websocket|
