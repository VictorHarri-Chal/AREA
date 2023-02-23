const lastStreamFunc = require('./lastStream');
const createPlaylistFunc = require('./createPlaylist');
const newPlaylistFunc = require('./newPlaylist');
const pausePlaybackFunc = require('./pausePlayback');
const randomTrackFunc = require('./randomTrack');

var token = 'BQACJsEB-zgjaZJmEcnXeVaYQL5na0C-3T56wkrWVWaR6T_gxRxe19Cls6qV1aNgBRhRv1_ylyMjyc-st8xmJagKAq7VrjlBeymSOcxykIJcNvUQiXsAEl0HnpZrjGBXE37wjaHTJMS93Yh9_DXne0yWUgRspLhzBHg2t1OZD0vU3z0LqfeAwGJo6Yjib7bY80KBdkH5rHUWRa49J23zzOHzQs9PUjrd8tDNPmtFuUsyxXEeMw';

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