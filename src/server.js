import express from 'express';
import route from './routes.js';
import bodyParser from 'body-parser';
import appVersion from '../config/appVersion.js';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();

const app = express();

const server = http.createServer(app);
const connectedSockets = new Map();

const io = new Server(server, {
  cors: {
    // frontend endpoint || cors
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['socket-id', 'Authorization', 'Content-Type'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  connectedSockets.set(socket.id, socket);
  socket.on('disconnect', () => {
    connectedSockets.delete(socket.id);
  });
});

server.listen(
  process.env.APP_PORT || 8080,
  process.env.APP_HOST || '0.0.0.0',
  () => {
    console.log(
      `Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}/${process.env.APP_VERSION}`
    );
  }
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.contentType('application/json');
  next();
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'socket-id',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(appVersion);

// Routes
// production route
app.use(`/${process.env.APP_VERSION}`, route);

// dev route
// app.use('/dev', route);

export { io };
