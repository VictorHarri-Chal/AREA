const request = require("request");
const db = require('../models');
const AccessTokens = db.accessTokens;
const cookies = require('../utils/getCookie');

exports.githubAuth = (req, res) => {
    getGitHubAuthCode(res, "ffd70e614dd0cd62f19e");
}

exports.githubCallback = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const code = req.query.code;
    getGitHubAuthToken("498e03f921f50999dbb4", "ef1c8f0525c5239d4635e3e5023ad4b6eb6929ed", code)
        .then(async accessToken => {
            var parsedUserID = cookies.parseJwt(req.cookies.jwtToken)
            var newTokenGithub = {service: 'github', value: accessToken}
            var tmpTokensList = await AccessTokens.findOne({ownerUserID: parsedUserID})

            var isEmpty = true;
            for (var i = 0; i < tmpTokensList.tokens.length; i = i + 1) {
                if (tmpTokensList.tokens[i].service === 'github') {
                    isEmpty = false;
                }
            }
            if (isEmpty) {
                console.log('saving access token. . .');
                tmpTokensList.tokens.push(newTokenGithub);
                tmpTokensList.save();
            }
        })
        .catch(error => {
            console.error(error);
        });
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8081/dashboard");
    res.end();
}

const getGitHubAuthCode = (res, clientId) => {
    const redirectUri = encodeURIComponent(`http://localhost:8080/githubcallback`);
    const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo%20read:user&state=random_string`;
    res.redirect(authorizationUrl);
};

const getGitHubAuthToken = (clientId, clientSecret, code) => {
    return new Promise((resolve, reject) => {
        request.post({
            url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
            headers: {
                Accept: "application/json"
            }
        }, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).access_token);
            }
        });
    });
};
