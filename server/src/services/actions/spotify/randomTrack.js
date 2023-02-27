const SpotifyWebApi = require('spotify-web-api-node');

async function randomTrackFunc(token) {
    const spotifyApi = new SpotifyWebApi({
        clientId: '7e1049e74b76497a9c192fcf08c9a279',
        clientSecret: '331c1bb09e3042f9b06a9302dc01a74c',
        redirectUri: 'http://localhost:8080/spotifycallback'
    });

    spotifyApi.setAccessToken(token);


    const getRandomSongsArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const getRandomSongs = getRandomSongsArray[Math.floor(Math.random() * getRandomSongsArray.length)];

    const getRandomOffset = Math.floor(Math.random() * 1000);

    const urI = await spotifyApi.searchTracks(getRandomSongs, { limit: 1, offset: getRandomOffset })

    const randomTrackUri = urI.body.tracks.items[0].uri

    // put the random track in the queue
    await spotifyApi.addToQueue(randomTrackUri)

}

module.exports = randomTrackFunc;