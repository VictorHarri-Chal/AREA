const db = require('../models');
const AccessTokens = db.accessTokens;
const cookies = require('../utils/getCookie');

exports.discordCallback = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const code = req.query.code;
    getDiscordAccessToken("1063054273946058833", "Ie8_A2L-lNSnKFvjiXXQFfwX9Wwb2w_-", code)
        .then(async (tokensInfo) => {
            var accessToken = tokensInfo.access_token
            var refreshToken = tokensInfo.refresh_token
            var parsedUserID = cookies.parseJwt(req.cookies.jwtToken)
            var newTokenDiscord = {service: 'discord', value: accessToken, refresh: refreshToken}
            var tmpTokensList = await AccessTokens.findOne({ownerUserID: parsedUserID})

            var isEmpty = true;
            for (var i = 0; i < tmpTokensList.tokens.length; i = i + 1) {
                if (tmpTokensList.tokens[i].service === 'discord') {
                    isEmpty = false;
                }
            }
            if (isEmpty) {
                tmpTokensList.tokens.push(newTokenDiscord);
                tmpTokensList.save();
            }
        })
        .catch((error) => {
            console.error(error);
        });
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8081/dashboard");
    res.end();
};

exports.discordAuth = (req, res) => {
    getDiscordAuthCode(res, "1063054273946058833");
};

const getDiscordAuthCode = (res, clientId) => {
    const redirectUri = encodeURIComponent(`http://localhost:8080/discordcallback`);
    const authorizationUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20guilds%20connections%20messages.read%20identify%20gdm.join`;
    res.redirect(authorizationUrl);
};


async function getDiscordAccessToken(clientId, secret, code) {
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `client_id=${clientId}&client_secret=${secret}&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:8080/discordcallback`
    });

    if (response.ok) {
        const json = await response.json();
        // console.log('Discord infos: ' + JSON.stringify(json))
        return json;
    } else {
        // console.log('error: ' + response.status + ' _ ' + response.statusText)
        return null;
    }
}