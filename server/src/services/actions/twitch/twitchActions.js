const isOnStream = require('./isOnStream')
const banRandom = require('./banRandom')
const getFollow = require('./getFollow')

const db = require("../../../models");
const AccessTokens = db.accessTokens;

const twitchTrigger = {
    checkTwitchAction : async function checkTwitchAction(action) {

        if (action.trigger === 'onStream') {
            return isOnStream(action.token, action.data.data)
        }

    },

    checkTwitchReaction : async function checkTwitchReaction(reaction) {
        if (reaction.trigger === 'banRandom') {
            return banRandom(reaction.token)
        }
    },

    getTwitchData: async function getTwitchData(action, userID) {

        let token = ''
        var tmpTokensList = await AccessTokens.findOne({ownerUserID: userID})
        for (var i = 0; i < tmpTokensList.tokens.length; i = i + 1) {
            if (tmpTokensList.tokens[i].service === 'twitch') {
                token = tmpTokensList.tokens[i].value;
            }
        }

        if (action === 'onStream') {
            return getFollow(token)
                .then((follow) => {
                    return follow
                })
        } else {
            return Promise.resolve([]);
        }
    }

}

module.exports = twitchTrigger;