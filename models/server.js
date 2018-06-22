const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverSchema = new Schema({
    'id': String,
    'host': String,
    'port': Number,
    'name': String,
    'unseen': Number
});

const server = mongoose.model('server', serverSchema);

module.exports = server;
