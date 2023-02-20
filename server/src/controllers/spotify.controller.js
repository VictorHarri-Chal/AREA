const request = require("request");
const queryString = require('querystring');
const Math = require('mathjs');
const axios = require('axios');

var client_id = '7e1049e74b76497a9c192fcf08c9a279'; // Your client id spotify
var client_secret = '331c1bb09e3042f9b06a9302dc01a74c'; // Your secret spotify

exports.spotifyCallback = (req, res) => {
    const code = req.query.code;

    const requestBody = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:8080/spotifycallback',
        client_id: client_id,
        client_secret: client_secret,
    };

    axios.post('https://accounts.spotify.com/api/token', queryString.stringify(requestBody), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) => {
        console.log("\n\n\n\n\n\n\n")
        console.log(response.data);
        spotifyConnected = true;
        spotifyAccessToken = response.data.access_token;
    }).catch((error) => {
        console.log(error);
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8081/dashboard");
    res.end();
};

exports.spotifyAuth = (req, res) => {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state playlist-modify-private playlist-read-private user-modify-playback-state';

    res.redirect('https://accounts.spotify.com/authorize?' +
        queryString.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: 'http://localhost:8080/spotifycallback',
            state: state
        })
    );
};


const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

