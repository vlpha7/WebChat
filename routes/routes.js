const controllers = require('../controllers/controllers');

module.exports = (app) => {
  app.get('/api', controllers.greeting);
  app.get('/api/get_data_from_send/:roleId', controllers.getDataFromSend);
  app.get('/api/get_data_from_receive/:roleId', controllers.getDataFromReceive);
  app.get('/api/server', controllers.getDataServer);
  app.get('/api/role', controllers.getDataRole);
  app.get('/api/get_unseen_map', controllers.getUnseenMap);

  app.post('/api/post_message', controllers.createMessage);
  app.post('/api/update_seen', controllers.updateSeen);
  app.post('/api/create_server', controllers.createServer);
  app.post('/api/create_role', controllers.createRole);
  app.post('/api/test_server', controllers.testServer);
  app.post('/api/reset_unseen_map', controllers.resetUnseenMap);
};
