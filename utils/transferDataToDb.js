const msgReceive = require('../models/msgReceive');
const msgSend = require('../models/msgSend');

export const transferMsgReceive = (data) => new msgReceive({
    'id': (data.id) ? data.id : -1,
    'send_server': (data.send_server) ? data.send_server : '',
    'send_role': (data.send_role) ? data.send_role : '',
    'time':new Date(),
    'content': {
      'msg_code': (data.content.msg_code) ? data.content.msg_code : '',
      'msg_content': (data.content.msg_content) ? data.content.msg_content : '',
      'msg_items': (data.content.msg_items)
                    ? data.content.msg_items.map(item => {
                        return {
                          'loType': item.type,
                          'data': item.data,
                          'name': item.name,
                          'trigger': item.trigger
                        };
                      })
                    : [],
      'msg_warning_level': (data.content.msg_warning_level) ? data.content.msg_warning_level : -1
    },
    'receive_role': (data.receive_role) ? data.receive_role : '',
    'is_read': (data.is_read) ? data.is_read : false,
    'origin_id': (data.origin_id) ? data.origin_id : '',
    'reply': (data.reply) ? data.reply : ''
});

export const transferMsgSend = (data) => new msgSend({
    'id': (data.id) ? data.id : -1,
    'send_role': (data.send_role) ? data.send_role : '',
    'time':new Date(),
    'content': {
      'msg_code': (data.content.msg_code) ? data.content.msg_code : '',
      'msg_content': (data.content.msg_content) ? data.content.msg_content : '',
      'msg_items': (data.content.msg_items)
                    ? data.content.msg_items.map(item => {
                        return {
                          'loType': item.type,
                          'data': item.data,
                          'name': item.name,
                          'trigger': item.trigger
                        };
                      })
                    : [],
      'msg_warning_level': (data.content.msg_warning_level) ? data.content.msg_warning_level : -1
    },
    'receive_server': (data.receive_server) ? data.receive_server : '',
    'receive_role': (data.receive_role) ? data.receive_role : '',
    'is_sent': (data.is_sent) ? data.is_sent : false,
    'is_read': (data.is_read) ? data.is_read : false,
    'read_time': (data.read_time) ? data.read_time : new Date(),
    'is_send_failed': (data.is_send_failed) ? data.is_send_failed : false,
    'reply': (data.reply) ? data.reply : ''
});
