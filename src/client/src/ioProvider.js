import io from 'socket.io-client';

export default function get() {
  if (process.env.NODE_ENV === 'production') {
    return io();  
  }

  return io('http://localhost:3100');
}
