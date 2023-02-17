const lastStreamFunc = require('./lastStream');
const createPlaylistFunc = require('./createPlaylist');
var token = 'BQAWVNM7ZOJFIB0JYZyE1xAaHkPDsuEWBrs_yNShxleKXRL1G4hVw562qumPX_9Q0_ISHsRmOwgNt4T7bR5RZ8hqve-peAwonm19pwQoiaRiqJ9yeqqE8e8k5X4FThVj1_yn_B3T6r7M3ZT8hqhyGfYRNFPQhA5Km20U6lw4UNdS1AI9JUeT83aTziu1VjZqXbL4RqfPseoBmMGsz-lXlCeNXXZPvU0iRulIOA';

const spotifyTrigger = {
    checkSpotifyAction: async function checkSpotifyAction(action) {


        if (action.trigger === 'newStream') {
            return lastStreamFunc(token)
        }
    },

    checkSpotifyReaction: async function checkSpotifyReaction(reaction) {
        if (reaction.trigger === 'createPlaylist') {
            return createPlaylistFunc(token)

        }
    }
}

module.exports = spotifyTrigger;