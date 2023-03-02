const isOnStream = require('./isOnStream')
const banRandom = require('./banRandom')
const getFollow = require('./getFollow')

let token = "0mr12thk7njt91y72v8sqko5d8pvdz"

const twitchTrigger = {
    checkTwitchAction : async function checkTwitchAction(action) {

        if (action.trigger === 'onStream') {
            return isOnStream(token, action.data.data)
        }

    },

    checkTwitchReaction : async function checkTwitchReaction(reaction) {
        if (reaction.trigger === 'banRandom') {
            return banRandom(token)
        }
    },

    getTwitchData: function getTwitchData(action) {
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