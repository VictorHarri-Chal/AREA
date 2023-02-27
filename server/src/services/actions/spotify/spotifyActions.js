const lastStreamFunc = require('./lastStream');
const createPlaylistFunc = require('./createPlaylist');
const newPlaylistFunc = require('./newPlaylist');
const pausePlaybackFunc = require('./pausePlayback');
const randomTrackFunc = require('./randomTrack');

const spotifyTrigger = {
    checkSpotifyAction: async function checkSpotifyAction(action) {

        if (action.trigger === 'newStream') {
            return lastStreamFunc(action.token)
        }

        if (action.trigger === 'newPlaylist') {
            return newPlaylistFunc(action.token)
        }

    },

    checkSpotifyReaction: async function checkSpotifyReaction(reaction) {
        if (reaction.trigger === 'createPlaylist') {
            return createPlaylistFunc(reaction.token)
        }

        if (reaction.trigger === 'pausePlayback') {
            return pausePlaybackFunc(reaction.token)
        }

        if (reaction.trigger === 'randomTrack') {
            return randomTrackFunc(reaction.token)
        }
    }
}

module.exports = spotifyTrigger;