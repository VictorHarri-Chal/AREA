const request = require("request");

exports.discordCallback = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const code = req.query.code;
    getDiscordAccessToken("1063054273946058833", "Ie8_A2L-lNSnKFvjiXXQFfwX9Wwb2w_-", code)
        .then((accessToken) => {
            console.log("access token: ", accessToken);
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
        return json.access_token;
    } else {
        return null;
    }
}