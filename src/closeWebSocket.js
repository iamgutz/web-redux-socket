import { consola } from './utils';

export default function closeWebSocket(websocket) {
  if (websocket) {
    consola.warn(`Closing WebSocket connection to ${websocket.url} ...`);
    websocket.close();
  }

  return null;
}
