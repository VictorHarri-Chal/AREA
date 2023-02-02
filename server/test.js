const express = require("express");
const app = express();
const port = 3000;

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

const getGitHubAuthCode = (res, clientId) => {
    const redirectUri = encodeURIComponent(`http://localhost:3000/callback`);
    const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user&state=random_string`;
    res.redirect(authorizationUrl);
};

app.get("/", (req, res) => {
    getGitHubAuthCode(res, "498e03f921f50999dbb4");
});

app.get("/callback", (req, res) => {
    const code = req.query.code;
    getGitHubAuthToken("498e03f921f50999dbb4", "8c74471cb40694ebfecc3ac064af38f0e6bf9288", code)
        .then(accessToken => {
            // Save the access token for later use
            // ...
        })
        .catch(error => {
            console.error(error);
        });
    res.send("OAuth authentication complete. You can close this page.");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
