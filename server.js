"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var uuid_1 = require("uuid");
var app = express_1.default();
var server = new http_1.default.Server(app);
var io = new socket_io_1.Server(server);
server.listen(process.env.PORT || 3030);
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.get('/', function (_, res) {
    res.redirect("/" + uuid_1.v4());
});
app.get('/:room', function (req, res) {
    res.render('room', { roomId: req.params.room });
});
io.on('connection', function (socket) {
    socket.on('join-room', function (roomId, userId) {
        console.log('roomId=', roomId);
        console.log('userId=', userId);
        socket.join(roomId);
        socket.to(roomId);
        socket.broadcast.emit('user-connected', userId);
        socket.on('disconnect', function () {
            socket.to(roomId);
            socket.broadcast.emit('user-disconnected', userId);
        });
    });
});
