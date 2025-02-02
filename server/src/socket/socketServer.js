import {Server} from 'socket.io';
import rootUrls from '../../utils/rootUrl';
import { chatEvents } from './events/chatevents';
import { groupEvents } from './events/groupEvent';
import { userEvents } from './events/userEvent';

const socketConfig = (server) => {
    // Initialize Socket.io
  const io = new Server(server, {
    cors: {
      origin: rootUrls.frontendUrl,
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  // Socket.io connection
  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // event handlers for socket.io events that you want to listen to are here
    userEvents(socket, io);
    groupEvents(socket, io);
    chatEvents(socket, io);

    // Socket.io disconnection
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io
}

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
}

export { socketConfig, getIo };