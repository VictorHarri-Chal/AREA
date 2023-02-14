const mongoose = require('mongoose');

const accessTokensSchema = new mongoose.Schema({
  _userID: String,
  tokens:
  [
    {
        service: String,
        value: String
    }
  ]
});

module.exports = mongoose.model('AccessTokens', accessTokensSchema);
