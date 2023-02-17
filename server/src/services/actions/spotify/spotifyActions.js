const lastStreamFunc = require('./lastStream');
const createPlaylistFunc = require('./createPlaylist');
const newPlaylistFunc = require('./newPlaylist');
const pausePlaybackFunc = require('./pausePlayback');

var token = 'BQA3bU8b1mJxf7o0-xTKY4nQhmxjX_vuMnyiQmUHuzPadtLKMjVhlpAd0FdVJRxuhYQTwqWD7Dgkx_kdQBhJMf1sgpSFAcsBkn1x-BSVIHPYvjynWUHcJta2Oae5m2tjozYOc2mq4zoY0FLaAD-jBnIjW6xrPlfvBMK1AWiwHyKQZm_nU8MHPSSq6L1l5MZDmmDSnJ4xi9O4q1-cS2SvhFYTTYX99E7TQd2QN-_IM2SDBioj5Q';

const spotifyTrigger = {
    checkSpotifyAction: async function checkSpotifyAction(action) {

        if (action.trigger === 'newStream') {
            return lastStreamFunc(token)
        }

        if (action.trigger === 'newPlaylist') {
            return newPlaylistFunc(token)
        }

    },

    checkSpotifyReaction: async function checkSpotifyReaction(reaction) {
        if (reaction.trigger === 'createPlaylist') {
            return createPlaylistFunc(token)
        }

        if (reaction.trigger === 'pausePlayback') {
            return pausePlaybackFunc(token)
        }
    }
}

module.exports = spotifyTrigger;