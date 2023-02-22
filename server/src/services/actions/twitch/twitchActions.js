const isOnStream = require('./isOnStream')

let token = "ibtan6rohhysuw9e3qohuvwq4egsd9"

const twitchTrigger = {
    checkTwitchAction : async function checkTwitchAction(action) {

        if (action.trigger === 'onStream') {
            return isOnStream(token)
        }

    },

    checkTwitchReaction : async function checkTwitchReaction(reaction) {
        // if (reaction.trigger === 'createPlaylist') {
        //     return createPlaylistFunc(token)
        // }
    }

}

module.exports = twitchTrigger;