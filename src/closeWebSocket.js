export default function closeWebSocket(websocket) {
  if (websocket) {
    console.warn(`Closing WebSocket connection to ${websocket.url} ...`);
    websocket.close();
    websocket = null;
  }
}
