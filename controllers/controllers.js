const msgReceive = require('../models/msgReceive');
const msgSend = require('../models/msgSend');
const server = require('../models/server');
const role = require('../models/role');
const _ = require('lodash');
const { usersMap } = require('../utils/socketInit');
const io = require('../server');
import * as transferDataToDb from '../utils/transferDataToDb';
import * as socketAPI from '../utils/socketAPI';

const unseenMap = new Map();

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  getDataFromSend(req, res) {
    const roleId = req.params.roleId;
    msgSend.find({ send_role: roleId })
      .then((data) => {
        res.send(data);
      });
  },
  getDataFromReceive(req, res) {
    const roleId = req.params.roleId;
    msgReceive.find({ receive_role: roleId })
      .then((data) => {
        res.send(data);
      });
  },
  createMessage(req, res) {
    const messageBody = req.body;
    const newMessage = transferDataToDb.transferMsgReceive(messageBody);
    msgReceive.create(newMessage)
      .then()
      .catch(err => console.log('err'));
    const users = usersMap.get(messageBody.receive_role);
    let value;
    if (_.isUndefined(unseenMap.get(messageBody.send_server))) value = [];
    else value = unseenMap.get(messageBody.send_server);
    value.push(messageBody.receive_role);
    unseenMap.set(messageBody.send_server, value);
    // TODO Be carefull with io and io.io
    socketAPI.emitToUsers(io.io, 'new_message_receive', messageBody, users);
    res.send('success');
  },
  updateSeen(req, res) {
    const messageBody = req.body;
    msgSend.update({ receive_server: messageBody.send_server,
                     receive_role: messageBody.send_role,
                     is_read: false },
                   { is_read: true, read_time: new Date() },
                   { multi: true }).exec();
   msgReceive.update({ is_read: false },
                     { is_read: true },
                     { multi: true }).exec();
    // TODO: optimise find with read_time: now
    msgSend.find({ receive_server: messageBody.send_server,
                   receive_role: messageBody.send_role,
                   is_read: true },
                   (err, msgSends) => {
                     if (err !== null) console.log('err');
                     msgSends.forEach(record => {
                       const users = usersMap.get(record.send_role);
                       // TODO Be carefull with io and io.io
                       socketAPI.emitToUsers(io.io, 'new_message_seen', {}, users);
                     });
                   });
    res.send('success');
  },
  getUnseenMap(req, res) {
    res.send(unseenMap);
  },
  createServer(req, res) {
    const messageBody = req.body;
    server.create(messageBody)
      .then(res.send('success'))
      .catch(err => console.log('err'));
  },
  createRole(req, res) {
    const messageBody = req.body;
    role.create(messageBody)
      .then(res.send('success'))
      .catch(err => console.log('err'));
  },
  getDataServer(req, res) {
    server.find({})
      .then(data => {
        if (_.isEmpty(data)) {
          server.create({
            'id' : '3100',
            'host' : 'http://localhost',
            'port' : 3100,
            'name' : 'Hai Duong',
            'unseen' : 0
          });
          server.create({
            'id' : '3200',
            'host' : 'http://localhost',
            'port' : 3200,
            'name' : 'Ha Noi',
            'unseen' : 0
          });
          server.create({
            'id' : '3300',
            'host' : 'http://localhost',
            'port' : 3300,
            'name' : 'QK7',
            'unseen' : 0
          });
        }
        res.send(data);
      })
      .catch(err => console.log('err'));
  },
  getDataRole(req, res) {
    role.find({})
      .then(data => {
        if (_.isEmpty(data)) {
          role.create({
            'id' : 'admin',
            'name' : 'QTV',
            'color' : '#76FF03'
          });
          role.create({
            'id' : 'sr',
            'name' : 'Canh Gioi',
            'color' : '#FFCDD2'
          });
          role.create({
            'id' : 'tewa',
            'name' : 'Tac Chien',
            'color' : '#B39DDB'
          });
          role.create({
            'id' : 'ag',
            'name' : 'Dan Duong',
            'color' : '#90CAF9'
          });
          role.create({
            'id' : 'commander',
            'name' : 'Boss',
            'color' : '#FFFF00'
          });
          role.create({
            'id' : 'coder',
            'name' : 'developer',
            'color' : '#D7CCC8'
          });
        }
        res.send(data);
      })
      .catch(err => console.log(err));
  },
  testServer(req, res) {
    res.send({ hi: 'there' });
  },
  resetUnseenMap(req, res) {
    const messageBody = req.body;
    let value;
    if (_.isUndefined(unseenMap.get(messageBody.serverChatting))) value = [];
    else value = unseenMap.get(messageBody.serverChatting);
    const newValue = value.filter(item => String(item) !== String(messageBody.roleId));
    unseenMap.set(messageBody.serverChatting, newValue);
    const users = usersMap.get(messageBody.roleId);
    // TODO Be carefull with io and io.io
    socketAPI.emitToUsers(io.io, 'new_message_receive', {}, users);
    res.send('success');
  }
};
