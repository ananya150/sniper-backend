import express from 'express';
import { createServer } from 'http';
import { app } from './httpRouter';
import { setupWebSocket } from './websocket';

const server = createServer(app);

setupWebSocket(server);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});