const SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');

const lastStreamSchema = new mongoose.Schema({
    name : String,
    artist : String,
    date : Date,
    id : String,
})

const lastStream = mongoose.model('lastStream', lastStreamSchema);

async function lastStreamFunc(token) {
    const spotifyApi = new SpotifyWebApi({
        clientId: '7e1049e74b76497a9c192fcf08c9a279',
        clientSecret: '331c1bb09e3042f9b06a9302dc01a74c',
        redirectUri: 'http://localhost:8080/spotifycallback'
    });

    spotifyApi.setAccessToken(token);

    const currentTrack = await spotifyApi.getMyCurrentPlayingTrack().catch(err => {
    });

    if (!currentTrack) {
        return;
    }


    if (currentTrack.body.is_playing) {
        console.log(currentTrack.body.item.name + ' de ' + currentTrack.body.item.artists[0].name)

        if (await lastStream.findOne({id: currentTrack.body.item.id}) === null) {

            lastStream.deleteMany({}, function (err) {
                if (err) console.error(err);
            });

            const newStream = new lastStream({
                name: currentTrack.body.item.name,
                artist: currentTrack.body.item.artists[0].name,
                date: currentTrack.body.timestamp,
                id: currentTrack.body.item.id
            })
            await newStream.save();
            return true
        } else
            return false
    } else
        return false
}

module.exports = lastStreamFunc;