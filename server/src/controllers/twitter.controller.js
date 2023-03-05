const axios = require("axios");
const crypto = require("crypto");

const db = require('../models');
const AccessTokens = db.accessTokens;
const cookies = require('../utils/getCookie');


const CLIENT_ID = "ZkgzdG5oQzBKeHVHbkNKLUdwb1g6MTpjaQ";
const CLIENT_SECRET = "LRiI204WEhe7Aywe7HvUQKGg5Dn02JpSfXwFSGIQIPF_bYpOD3";
const REDIRECT_URI = "http://localhost:8080/twittercallback";
const AUTHORIZATION_ENDPOINT = "https://twitter.com/i/oauth2/authorize";
const SCOPES = "users.read";
const STATE = "123456";
const CODE_VERIFIER_LENGTH = 64;
const CODE_CHALLENGE_METHOD = "S256";
const codeVerifier = crypto.randomBytes(CODE_VERIFIER_LENGTH).toString("hex");
const hash = crypto.createHash("sha256").update(codeVerifier).digest();
const codeChallenge = hash.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

exports.twitterAuth = (req, res) => {
    const authUrl = `${AUTHORIZATION_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&state=${encodeURIComponent(STATE)}&code_challenge=${encodeURIComponent(codeChallenge)}&code_challenge_method=${encodeURIComponent(CODE_CHALLENGE_METHOD)}`;
    console.log("authUrl:", authUrl);
    res.redirect(authUrl);
};

exports.twitterCallback = async (req, res) => {
    const { code, state } = req.query;

    if (state !== STATE) {
        res.status(400).send('Invalid state parameter');
        return;
    }

    const requestBody = new URLSearchParams();
    requestBody.append('code', code);
    requestBody.append('grant_type', 'authorization_code');
    requestBody.append('redirect_uri', REDIRECT_URI);
    requestBody.append('code_verifier', codeVerifier);

    const response = await axios.post('https://api.twitter.com/2/oauth2/token', requestBody, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        }
    });

    var parsedUserID = cookies.parseJwt(req.cookies.jwtToken)
    var newTokenTwitter = {service: 'twitter', value: response.data.access_token, refresh: ""}
    var tmpTokensList = await AccessTokens.findOne({ownerUserID: parsedUserID})

    var isEmpty = true;
    for (var i = 0; i < tmpTokensList.tokens.length; i = i + 1) {
        if (tmpTokensList.tokens[i].service === 'twitter') {
            isEmpty = false;
        }
    }
    if (isEmpty) {
        tmpTokensList.tokens.push(newTokenTwitter);
        tmpTokensList.save();
    }

    const accessToken = response.data.access_token;
    res.redirect(`http://localhost:8081/dashboard`);
};
