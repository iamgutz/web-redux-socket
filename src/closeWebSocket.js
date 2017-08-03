import log from 'fancy-log';

export default function closeWebSocket(websocket) {
  if (websocket) {
    log.warn(`Closing WebSocket connection to ${websocket.url} ...`);
    websocket.close();
  }

  return null;
}
