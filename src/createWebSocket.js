function extractArgs(config) {
  const args = [];

  if (config.args) {
    return config.args;
  }

  if (config.url) {
    args[0] = config.url;
  }

  if (config.authorization) {
    args[1] = config.authorization;
  }

  return args;
}

export default function createWebSocket(payload) {
  const args = extractArgs(payload);

  return new WebSocket(...args);
}
