const axios = require('axios');
const cookies = require('../utils/getCookie');
const db = require('../models');
const AccessTokens = db.accessTokens;

exports.twitchCallback = (req, res) => {
    const clientId = '24gzvb0o12bsdlj7qqe016eapnfisc';
    const clientSecret = 'ov2gyyrz0ei1wtf0vdhxn2kxw43keg';
    const redirectUri = 'http://localhost:8080/twitchcallback';
    const code = req.query.code

    axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
        },
    }).then(async (response) => {
        var accessToken = response.data.access_token;
        var refreshToken = response.data.refresh_token;
        var parsedUserID = cookies.parseJwt(req.cookies.jwtToken)
        var newTokenTwitch = {service: 'twitch', value: accessToken, refresh: refreshToken}
        var tmpTokensList = await AccessTokens.findOne({ownerUserID: parsedUserID})

        var isEmpty = true;
        for (var i = 0; i < tmpTokensList.tokens.length; i = i + 1) {
            if (tmpTokensList.tokens[i].service === 'twitch') {
                isEmpty = false;
            }
        }
        if (isEmpty) {
            tmpTokensList.tokens.push(newTokenTwitch);
            tmpTokensList.save();
        }
    }).catch ((error) => {
        console.log(error);
    })

    res.header("Access-Control-Allow-Origin", "*");
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8081/dashboard");
    res.end();
}

exports.twitchAuth = (req, res) => {
    res.redirect(
        'https://id.twitch.tv/oauth2/authorize' +
            '?response_type=code' +
            '&client_id=24gzvb0o12bsdlj7qqe016eapnfisc' +
            '&redirect_uri=http://localhost:8080/twitchcallback' +
            '&scope=moderator:manage:banned_users%20user:read:follows' +
            '&state=9fusiuye96sab8bvhcx4xnd8wnig9r'
    );
};
