const routes = require('./routes/routes');
const { port } = require('./config');
const { socketInit } = require('./utils/socketInit');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const server = express();

const app = server.listen(port.server, () => {
  console.log('Listening on port ', port.server);
});

const io = require('socket.io')(app);
// open socket io
io.on('connection', (socket) => {
  socketInit(socket, io);
});

mongoose.Promise = global.Promise;
// conect mongoose with mongoose
if (process.env.NODE_ENV !== 'test') {
  const linkDatabase = 'mongodb://localhost/' + port.server;
  mongoose.connect(linkDatabase);
}

// add middleware for express => can use req.body. need to be above routes()
server.use(bodyParser.json());
routes(server);

// this is for client
server.set('view engine', 'ejs');

server.get(['/', '/role/:roleId'], (req, res) => {
    res.render('index', {
      roleId: (req.params.roleId) ? req.params.roleId : 0
    });
});

server.use(express.static('./public'));

exports.io = io;
