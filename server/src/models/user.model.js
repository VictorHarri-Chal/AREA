const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  roles:
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
