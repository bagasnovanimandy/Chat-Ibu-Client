import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';

class SocketClient {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }
  
  connect() {
    if (this.socket?.connected) return;
    
    const token = localStorage.getItem('token');
    this.socket = io(SOCKET_URL, {
      auth: {
        token,
      },
    });
    
    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Socket connected');
    });
    
    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('Socket disconnected');
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
  
  joinRoom(userId, roomId) {
    if (this.socket && roomId) {
      this.socket.emit('join:room', { userId, roomId });
    }
  }
  
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
  
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
  
  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export default new SocketClient();

