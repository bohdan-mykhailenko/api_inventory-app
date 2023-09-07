// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import sequelize from './sequilize';
import ActiveSession from './models/ActiveSessions';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let activeSessions = 0;

// Initialize Sequelize and sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Connected to the database');

    // Add a listener to the ActiveSession model to count active sessions
    ActiveSession.addHook('afterCreate', () => {
      activeSessions++;
      io.emit('activeSessions', activeSessions);
    });

    ActiveSession.addHook('afterDestroy', () => {
      activeSessions--;
      io.emit('activeSessions', activeSessions);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

io.on('connection', (socket) => {
  activeSessions++;
  io.emit('activeSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    io.emit('activeSessions', activeSessions);
  });
});

server.listen(3002, () => {
  console.log('Socket.io server is running on port 3001');
});
