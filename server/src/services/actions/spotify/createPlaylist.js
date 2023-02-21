const SpotifyWebApi = require('spotify-web-api-node');

async function createPlaylistFunc(token) {
    const spotifyApi = new SpotifyWebApi({
        clientId: '7e1049e74b76497a9c192fcf08c9a279',
        clientSecret: '331c1bb09e3042f9b06a9302dc01a74c',
        redirectUri: 'http://localhost:8080/spotifycallback'
    });

    spotifyApi.setAccessToken(token);

    spotifyApi.createPlaylist('test', { 'description': 'test', 'public': false })
        .then(function (data) {
        }
        , function (err) {
            console.log('Something went wrong!', err);
        });

}

module.exports = createPlaylistFunc;