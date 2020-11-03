
const socketio = require('socket.io');
let io = null;
const chatChanels = {
  joinConversation: 'joinConversation',
  roomConnected: 'roomConnected',
  leaveConversation: 'leaveConversation',
  deleteMessage: 'deleteMessage',
  rootDisconnect: 'rootDisconnect',
  typing: 'typing',
  connectNotification: 'connectNotification',
};
export function socket(server) {
  try {
    if (!io) {
      io = socketio(server);
      const nsp = io.of('/chat');
      io.of('/chat').on('connection', function(socket: any) {
        socket.on('joinConversation', async conversationId => {
          for (let room in socket.rooms) {
            if (!room.includes('/') && !room.includes('#')) {
              socket.leave(room);
            }
          }
          socket.join(conversationId);

          socket.emit('roomConnected', `You have connected to: ${conversationId} room`);

          pushConnectNotification(socket, conversationId);

          socket.conversationId = conversationId;

          socket.on('client-send-message', function(message: any) {
            nsp.to(conversationId).emit('server-send-message', message);
          });
          // console.log(socket.rooms);
          // console.log(socket.conversationId);
        });

        socket.on('leaveConversation', conversationId => {
          socket.leave(conversationId);

          pushConnectNotification(socket, conversationId);

          socket.conversationId = null;
        });

        socket.on('deleteMessage', data => {
          let room = searchRoom(socket.rooms);
          socket.broadcast.to(room).emit('deleteMessage', data);
        });

        socket.on('typing', data => {
          let room = searchRoom(socket.rooms);
          socket.broadcast.to(room).emit('typing', data);
        });

        socket.on('rootDisconnect', () => {
          socket.emit('rootDisconnect', 'Client disconnected!');
          nsp.connected[socket.id].disconnect();
        });

        socket.on('disconnect', () => {
          pushConnectNotification(socket, socket.conversationId);
        });
      });
    }
    return io;
  } catch (error) {
    console.log(error);
  }
}

function searchRoom(rooms) {
  rooms = Object.values(rooms);
  // console.log(rooms);
  rooms = rooms.find(i => i);
  return rooms;
}

function pushConnectNotification(socket, conversationId) {
  try {
    // get room connection
    let roomConnection = socket.adapter.rooms[conversationId];
    // console.log(roomConnection);
    // get namespace
    const channel = socket.adapter.nsp.name;
    io.of(channel)
      .to(conversationId)
      .emit(chatChanels.connectNotification, roomConnection);
  } catch (error) {
    console.log(error, conversationId);
  }
  return true;
}
