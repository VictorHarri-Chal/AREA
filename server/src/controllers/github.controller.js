const request = require("request");

exports.githubAuth = (req, res) => {
    getGitHubAuthCode(res, "ffd70e614dd0cd62f19e");
}

exports.githubCallback = (req, res) => {
    console.log('callback here');
    res.header("Access-Control-Allow-Origin", "*");
    const code = req.query.code;
    getGitHubAuthToken("ffd70e614dd0cd62f19e", "d5ee3ec76613a1c842150f956ec2a8ec7f3ed28f", code)
        .then(accessToken => {
            console.log('access token: ', accessToken);
            githubConnected = true;
            githubAccessToken = accessToken;
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
