import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import sequelize from './sequilize';
import ActiveSession from './models/ActiveSessions';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let activeSessions = 0;

sequelize
  .sync()
  .then(() => {
    console.log('Connected to the database');

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

server.listen(5000, () => {
  console.log('Socket.io server is running on port 5000');
});
