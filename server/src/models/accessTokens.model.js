const mongoose = require('mongoose');

const accessTokensSchema = new mongoose.Schema({
  ownerUserID: String,
  tokens:
  [
    {
        service: String,
        value: String,
        refresh: String
    }
  ]
});

module.exports = mongoose.model('AccessTokens', accessTokensSchema, 'accesstokens');
