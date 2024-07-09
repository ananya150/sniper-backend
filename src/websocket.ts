import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
      console.log('received: %s', message);
      ws.send(`Hello, you sent -> ${message}`);
    });

    ws.send('Hi there, I am a WebSocket server');
  });

  console.log('WebSocket server setup completed');
}