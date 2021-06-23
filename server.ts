import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app: express.Express = express();
const server = new http.Server(app);
const io = new Server(server);

server.listen(process.env.PORT || 3030);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (_: any, res: express.Response) => {
  res.render('room');
});
