const lastStreamFunc = require('./lastStream');
const createPlaylistFunc = require('./createPlaylist');
const newPlaylistFunc = require('./newPlaylist');
const pausePlaybackFunc = require('./pausePlayback');
const randomTrackFunc = require('./randomTrack');

var token = 'BQAkATAxw3CSi5IQvMh0pHjHQgwNkGQgLOZxwToZV02TENLGgdiu6wY8PpiP65wqaTfApHSnwjQtc-alcKIOndpSCjY8l07b-PU82gN31dgCbFGUL3ulZBfWI4glkRdxirEfHmhoic6LChBV0XmgdygF7tJJQvw5EDu95q3tky-GXgss4JqsAKajvhCfAC6C_-xTwgLpZcy0gCqoMvIuLUQB85-_1qlylLPO0nWW5BQ74WYoCg';

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

        if (reaction.trigger === 'randomTrack') {
            return randomTrackFunc(token)
        }
    }
}

module.exports = spotifyTrigger;