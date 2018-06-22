const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgReceiveSchema = new Schema({
    'id': Number,
    'send_server': String,
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
    'receive_role': String,
    'is_read': Boolean,
    'origin_id': String,
    'reply': String
});

const msgReceive = mongoose.model('msgReceive', msgReceiveSchema);

module.exports = msgReceive;
