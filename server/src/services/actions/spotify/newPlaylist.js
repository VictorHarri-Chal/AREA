const SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');

const newPlaylistSchema = new mongoose.Schema({
    name : String,
    id : String,
    date : Date,
})

const newPlaylist = mongoose.model('newPlaylist', newPlaylistSchema);

async function newPlaylistFunc(token) {
    const spotifyApi = new SpotifyWebApi({
        clientId: '7e1049e74b76497a9c192fcf08c9a279',
        clientSecret: '331c1bb09e3042f9b06a9302dc01a74c',
        redirectUri: 'http://localhost:8080/spotifycallback'
    });

    spotifyApi.setAccessToken(token);

    const username = (await spotifyApi.getMe()).body.id

    const playlists = (await spotifyApi.getUserPlaylists(username)).body.items

    const lastPlaylist = await newPlaylist.findOne({}).sort({date: -1})


    if (lastPlaylist === null) {
        const newPlaylistToStore = new newPlaylist({
            name: playlists[0].name,
            id: playlists[0].id,
            date: Date.now()
        })
        await newPlaylistToStore.save();
        return false
    } else {
        if (playlists[0].id !== lastPlaylist.id) {
            newPlaylist.deleteMany({}, function (err) {
                if (err) console.error(err);
            });
            const newPlaylistToStore = new newPlaylist({
                name: playlists[0].name,
                id: playlists[0].id,
                date: Date.now()
            })
            await newPlaylistToStore.save();
            return true
        } else
            return false
    }

}

module.exports = newPlaylistFunc;