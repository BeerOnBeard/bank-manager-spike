import io from 'socket.io-client';

const host = process.env.REACT_APP_SOCKET_HOST || 'http://localhost:3100';
export default function get() {
  return io(host);
}
