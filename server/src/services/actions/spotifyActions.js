const SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');

const lastStreamSchema = new mongoose.Schema({
    name : String,
    artist : String,
    date : Date,
    id : String,
})

const lastStream = mongoose.model('lastStream', lastStreamSchema);

const spotifyTrigger = {
    checkSpotifyAction: async function checkSpotifyAction(action) {

        var token = 'BQB3GWRlQQtHnsSvmKbKmC_tK_mitnHEee0H7G1ZK9_zkog1SUaqQLW_Pv7yjChDJFemCbj8xdmkwt0-tpRi8ntxyRBI1V478Pg2wlkPfzbUCkae57KjXwnIanfYZNjg4PeMw5X4qwMVPvuVTYgC-vAYIXAWqP7ritJxyK77fIXUPsl6sVfOXstfmfolXlaVE9TU0mk5';


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
                console.log(currentTrack.body.item.name + ' de ' + currentTrack.body.item.artists[0].name)

                if (await lastStream.findOne({id: currentTrack.body.item.id}) === null) {

                    lastStream.deleteMany({}, function (err) {
                        if (err) console.log(err);
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


    },

    checkSpotifyReaction: async function checkSpotifyReaction(reaction) {
        console.log('Spotify Reaction')
    }
}

module.exports = spotifyTrigger;