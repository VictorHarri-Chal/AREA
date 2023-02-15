

const spotifyTrigger = {
    checkSpotifyAction: async function checkSpotifyAction(action) {
        console.log('Spotify Action')
        console.log(action)
    },

    checkSpotifyReaction: async function checkSpotifyReaction(reaction) {
        console.log('Spotify Reaction')
        console.log(reaction)
    }
}

module.exports = spotifyTrigger;