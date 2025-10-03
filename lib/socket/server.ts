import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | null = null;

export function initSocketServer(httpServer: HTTPServer): SocketIOServer {
  if (io) {
    return io;
  }

  io = new SocketIOServer(httpServer, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle joining a specific playout room
    socket.on('join-playout', (playoutId: string) => {
      console.log(`Socket ${socket.id} joining playout room: ${playoutId}`);
      socket.join(`playout:${playoutId}`);
      socket.emit('joined', { playoutId });
    });

    // Handle leaving a playout room
    socket.on('leave-playout', (playoutId: string) => {
      console.log(`Socket ${socket.id} leaving playout room: ${playoutId}`);
      socket.leave(`playout:${playoutId}`);
    });

    // Handle broadcasting updates to a specific playout
    socket.on('broadcast-to-playout', ({ playoutId, data }) => {
      console.log(`Broadcasting to playout ${playoutId}:`, data);
      io?.to(`playout:${playoutId}`).emit('playout-update', JSON.stringify(data));
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

export function getIO(): SocketIOServer | null {
  return io;
}

export function broadcastToPlayout(playoutId: string, data: unknown) {
  if (io) {
    io.to(`playout:${playoutId}`).emit('playout-update', JSON.stringify(data));
  }
}

