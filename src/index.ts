import express from 'express';
import { createServer } from 'http';
import httpRouter from './httpRouter';
import { setupWebSocket } from './websocket';

const app = express();
const server = createServer(app);

app.use(httpRouter);

setupWebSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});