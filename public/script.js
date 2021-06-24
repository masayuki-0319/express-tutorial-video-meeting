const socket = io('/');
const myPeer = new Peer();
const userId = 12345;

myPeer.on('open', (userId) => {
  socket.emit('join-room', ROOM_ID, userId);
});

socket.on('user-connected', (userId) => {
  console.log('userId=', userId);
});
