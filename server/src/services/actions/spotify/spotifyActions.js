const lastStreamFunc = require('./lastStream');
const newPlaylistFunc = require('./newPlaylist');
var token = 'BQBbwDmeIcPehztibXB4V1WtN_tVB2nfFvCg5KQz1WLItvdTHVvBLyGmt2FSWMAwNj2AzlglACVpAQTazI8qPXDejCT2qAIzni4b1YLzdke7PGPofsY1hgH2BEAqLlcZtmH_3vNtW47UsF-M2w6s2RK0i2pFwYiJ1gL0RzyfmcxMxhl-4eaSySHSTmV5KgAOEF-_gB474-V-yAsyip0aFGiJVTFSThlY3FAeww';

const spotifyTrigger = {
    checkSpotifyAction: async function checkSpotifyAction(action) {


        if (action.trigger === 'newStream') {
            return lastStreamFunc(token)
        }
    },

    checkSpotifyReaction: async function checkSpotifyReaction(reaction) {
        if (reaction.trigger === 'newPlaylist') {
            return newPlaylistFunc(token)

        }
    }
}

module.exports = spotifyTrigger;