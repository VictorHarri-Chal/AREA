const lastStreamFunc = require('./lastStream');

const spotifyTrigger = {
    checkSpotifyAction: async function checkSpotifyAction(action) {

        var token = 'BQB3GWRlQQtHnsSvmKbKmC_tK_mitnHEee0H7G1ZK9_zkog1SUaqQLW_Pv7yjChDJFemCbj8xdmkwt0-tpRi8ntxyRBI1V478Pg2wlkPfzbUCkae57KjXwnIanfYZNjg4PeMw5X4qwMVPvuVTYgC-vAYIXAWqP7ritJxyK77fIXUPsl6sVfOXstfmfolXlaVE9TU0mk5';

        if (action.trigger === 'newStream') {
            lastStreamFunc(token)
        }
    },

    checkSpotifyReaction: async function checkSpotifyReaction(reaction) {
        console.log('Spotify Reaction')
    }
}

module.exports = spotifyTrigger;