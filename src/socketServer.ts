import http from 'http';
import { Server } from 'socket.io';
import { Express } from 'express';

const createSocketServer = (expressApp: Express) => {
  const server = http.createServer(expressApp);

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

  return { server, io };
};

export default createSocketServer;
