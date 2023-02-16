const SpotifyWebApi = require('spotify-web-api-node');

const spotifyTrigger = {
    checkSpotifyAction: async function checkSpotifyAction(action) {
        console.log(action)

        var token = 'BQDjeEY6CTM6LqZ5S0jQ6c-z6bNxcXchDzvMq33hTu2dVjRRH-mPgVuXH0HdKCLmowuWLP6OcGgesX_xuynB1eE-yHi-GJazRtWcYLY7vopE5b7KkpbKY6RpP8GtGrfxPZlgmZbbRvO5ptYEH320RZP0HC7YCXYUT8ZGo_u-oZZhcx4aMJEIMheaDkQ_B92fA3yChqBH';


        if (action.trigger === 'newStream') {
            console.log('New Stream')
            const spotifyApi = new SpotifyWebApi({
                clientId: '7e1049e74b76497a9c192fcf08c9a279',
                clientSecret: '331c1bb09e3042f9b06a9302dc01a74c',
                redirectUri: 'http://localhost:8080/spotifycallback'
            });

            spotifyApi.setAccessToken(token);

            const currentTrack = await spotifyApi.getMyCurrentPlayingTrack();

            if (currentTrack.body.is_playing) {
                console.log('Chanson en cours de lecture')
                console.log(currentTrack.body.item.name)
                return true
            } else {
                console.log('Pas de chanson en cours de lecture')
                return false
            }
        }


    },

    checkSpotifyReaction: async function checkSpotifyReaction(reaction) {
        console.log('Spotify Reaction')
        console.log(reaction)
    }
}

module.exports = spotifyTrigger;