import express from 'express';
import http from 'http';

const app: express.Express = express();
const server = new http.Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 3030);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (_: any, res: any) => {
  res.render('room');
});
