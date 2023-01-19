const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const models = {};
models.mongoose = mongoose;

models.user = require('./user.model');
models.role = require('./role.model');

models.ROLES = ["user", "admin"];

module.exports = models;