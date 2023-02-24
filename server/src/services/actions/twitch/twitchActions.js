const isOnStream = require('./isOnStream')
const banRandom = require('./banRandom')

let token = "7ew6koqbte939qle693ogjurzoczkl"

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