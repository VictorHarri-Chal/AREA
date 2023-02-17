const lastStreamFunc = require('./lastStream');
const createPlaylistFunc = require('./createPlaylist');
const newPlaylistFunc = require('./newPlaylist');

var token = 'BQCrQexPJ7H7pURI-uPXLQBW4q8jpA9ugqLviHR4hQqDryTgGB2ssFP07eQCzaQU7DrGaDn6SsmJtWN3zDOdOoW3zGYxnpFDvtSuI08W8uLkO4-3Fy5luYQ6P67HNbs822lTrLAscKUoul5B5I0ON3YcofWoIRRNl5bu61Qr82rEH_D2zUgMAXOVhViL0QDsnrVqMGoLLRX3XK-KYWG6xnkueOyc4bmFpVMt7pbPO6_qBbF_';

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
    }
}

module.exports = spotifyTrigger;