const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSendSchema = new Schema({
    'id': Number,
    'send_role': String,
    'time': Date,
    'content': {
      'msg_code': String,
      'msg_content': String,
      'msg_items': [{
        'itemType': String,
        'data': String,
        'name': String,
        'trigger': String
      }],
      'msg_warning_level': Number
    },
    'receive_server': String,
    'receive_role': String,
    'is_sent': Boolean,
    'is_read': Boolean,
    'read_time': Date,
    'is_send_failed': Boolean,
    'reply': String
});

const msgSend = mongoose.model('msgSend', msgSendSchema);

module.exports = msgSend;
