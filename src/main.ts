import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const PORT = 5000 || process.env.PORT;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions++;
  io.emit('activeSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    io.emit('activeSessions', activeSessions);
  });
});

server.listen(5000, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
