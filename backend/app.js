import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIO } from 'socket.io';

import teamRoutes from './routes/teams.js';
import playerRoutes from './routes/players.js';
import fixtureRoutes from './routes/fixtures.js';
import standingRoutes from './routes/standings.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/standings', standingRoutes);

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: { origin: '*' }
});

// Expose Socket.io instance for controllers
app.locals.io = io;

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});