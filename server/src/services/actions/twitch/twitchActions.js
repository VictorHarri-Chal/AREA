const isOnStream = require('./isOnStream')
const banRandom = require('./banRandom')
const getFollow = require('./getFollow')

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

    getTwitchData: function getTwitchData(action) {
        if (action === 'onStream') {
            return getFollow(action.token)
                .then((follow) => {
                    return follow
                })
        } else {
            return Promise.resolve([]);
        }
    }

}

module.exports = twitchTrigger;