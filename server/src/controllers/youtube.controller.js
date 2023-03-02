const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const db = require('../models');
const AccessTokens = db.accessTokens;
const cookies = require('../utils/getCookie');

const oauth2Client = new OAuth2(
    "987523785191-8shg0ut9g9olugvsu2bs3os9cqo4d8d1.apps.googleusercontent.com",
    "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",
    "http://localhost:8080/youtubecallback"
);

exports.youtubeAuth = (req, res) => {
    console.log('auth here');
    const scopes = [
        "https://www.googleapis.com/auth/youtube.force-ssl",
        "https://www.googleapis.com/auth/youtubepartner",
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube",
    ];

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });

    res.redirect(authUrl);
};

exports.youtubeCallback = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const code = req.query.code;
    oauth2Client.getToken(code, async (err, tokens) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        console.log('access token:', tokens.access_token); // Add this line to print the access token

        var parsedUserID = cookies.parseJwt(req.cookies.jwtToken)
        var newTokenYoutube = {service: 'youtube', value: tokens.access_token, refresh: tokens.refresh_token}
        var tmpTokensList = await AccessTokens.findOne({ownerUserID: parsedUserID})

        var isEmpty = true;
        for (var i = 0; i < tmpTokensList.tokens.length; i = i + 1) {
            if (tmpTokensList.tokens[i].service === 'youtube') {
                isEmpty = false;
            }
        }
        if (isEmpty) {
            tmpTokensList.tokens.push(newTokenYoutube);
            tmpTokensList.save();
        }

        oauth2Client.setCredentials(tokens);
        res.statusCode = 302;
        res.setHeader("Location", "http://localhost:8081/dashboard");
        res.end();
    });
};
