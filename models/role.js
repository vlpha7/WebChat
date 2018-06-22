const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    'id': String,
    'name': String,
    'color': String
});

const role = mongoose.model('role', roleSchema);

module.exports = role;
