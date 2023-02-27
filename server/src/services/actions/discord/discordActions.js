const db = require('../models');
const AccessTokens = db.accessTokens;
const cookies = require('../utils/getCookie');

const discordTrigger = {
    checkDiscordAction : async function checkDiscordAction(action) {
        if (action.trigger === 'zzz') {
            // return zzzFunc(token)
        }
    },

    checkDiscordReaction : async function checkDiscordReaction(reaction) {
        var discordToken = '';

        var userID = 

        AccessTokens.findOne({})

        if (reaction.trigger === 'sendDM') {
            return sendDM(reaction)
        }
    }

}

module.exports = discordTrigger;
