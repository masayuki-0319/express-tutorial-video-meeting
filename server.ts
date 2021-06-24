import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 } from 'uuid';

const app: express.Express = express();
const server = new http.Server(app);
const io = new Server(server);

server.listen(process.env.PORT || 3030);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (_: any, res: express.Response) => {
  res.redirect(`/${v4()}`);
});

app.get('/:room', (req: express.Request, res: express.Response) => {
  res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    console.log('roomId=', roomId);
    console.log('userId=', userId);

    socket.join(roomId);
    socket.to(roomId);
    socket.broadcast.emit('user-connected', userId);
  });
});
