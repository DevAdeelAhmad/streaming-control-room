'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function usePlayoutWebSocket(playoutId: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO client
    const socket = io({
      path: '/api/socket',
      addTrailingSlash: false,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      
      // Join the room for this specific playout window
      socket.emit('join-playout', playoutId);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });

    socket.on('playout-update', (message: string) => {
      console.log('Received playout update:', message);
      setLastMessage(message);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socket.emit('leave-playout', playoutId);
      socket.disconnect();
    };
  }, [playoutId]);

  const sendMessage = useCallback((event: string, data: unknown) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
}

