const msgSend = require('../models/msgSend');
const serverModel = require('../models/server');
import * as transferDataToDb from './transferDataToDb';
import * as logic from './logic';
import * as socketAPI from './socketAPI';
import * as restAPI from './restAPI';
import _ from 'lodash';

const usersMap = new Map();

function socketInit(socket, io) {

  socket.on('create_message', ({ data, origin_id }) => {
    msgSend.findByIdAndRemove(data._id).then();
    const newMessage = transferDataToDb.transferMsgSend(data);
    msgSend.create(newMessage)
      .then(record => {
        data.origin_id = record._id;
        data.reply = origin_id;
        const users = logic.findInMap(usersMap, data.socketId);
        const httpUrl = data.receive_server + '/api/post_message';
        console.log(data.receive_server);
        restAPI.postToServer(httpUrl, data)
          .then(() => {
            msgSend.findByIdAndUpdate(record._id, { is_sent: true })
              .then(() => {
                socketAPI.emitToUsers(io, 'new_message', {}, users);
              });
          })
          .catch(err => {
            msgSend.findByIdAndUpdate(record._id, { is_sent: false })
            .then(() => {
              socketAPI.emitToUsers(io, 'new_message', {}, users);
            });
            console.log('err');
          });
      })
        .catch(err => console.log('err'));
  });

  socket.on('update_seen', data => {
    const httpUrl = data.receive_server + '/api/update_seen';
    restAPI.postToServer(httpUrl, data)
      .then()
      .catch(err => console.log('err'));
  });

  socket.on('login', (myRole) => {
    const my_role = myRole;
    if (_.isUndefined(usersMap.get(my_role))) {
      usersMap.set(my_role, []);
    }
    usersMap.get(my_role).push(socket.id);
    console.log('Number of users collected to this server ' + usersMap.size);
  });

  socket.on('reset_unseen_map', data => {
    console.log(data);
    const httpUrl = data.currentServer + '/api/reset_unseen_map';
    restAPI.postToServer(httpUrl, data)
      .then();
  });

  socket.on('test_server', (data) => {
    const { onlineServer,
            offlineServer,
            server,
            port,
            socketId } = data;
    const users = logic.findInMap(usersMap, socketId);
    serverModel.findOne({ port }, (err, record) => {
      if (err) console.log(err);
      restAPI.postToServer(server + '/api/test_server', {})
      .then(() => {
        const index = onlineServer.indexOf(server);
        if (index < 0) {
            socketAPI.emitToUsers(io, 'online', { server, serverId: record._id }, users);
        }
      })
      .catch(() => {
        const index = offlineServer.indexOf(server);
        if (index < 0) {
          socketAPI.emitToUsers(io, 'offline', { server, serverId: record._id }, users);
        }
      });
    });
  });
}
module.exports = {
  socketInit,
  usersMap
};
