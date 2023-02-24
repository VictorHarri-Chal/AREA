const isOnStream = require('./isOnStream')
const banRandom = require('./banRandom')

let token = "w68jwrqzit07nzuwt07hkshhedotl5"

const twitchTrigger = {
    checkTwitchAction : async function checkTwitchAction(action) {

        if (action.trigger === 'onStream') {
            return isOnStream(token)
        }

    },

    checkTwitchReaction : async function checkTwitchReaction(reaction) {
        if (reaction.trigger === 'banRandom') {
            return banRandom(token)
        }
    }

}

module.exports = twitchTrigger;