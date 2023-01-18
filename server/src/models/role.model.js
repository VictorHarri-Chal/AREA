const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    username: String
});

module.exports = mongoose.model('Role', roleSchema);
