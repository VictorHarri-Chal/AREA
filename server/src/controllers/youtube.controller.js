const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const open = require("open");

const oauth2Client = new OAuth2(
    "YOUR_CLIENT_ID",
    "YOUR_CLIENT_SECRET",
    "http://localhost:8080/youtubecallback"
);

exports.youtubeAuth = (req, res) => {
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

    open(authUrl);
};

exports.youtubeCallback = (req, res) => {
    const code = req.query.code;
    oauth2Client.getToken(code, (err, tokens) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            oauth2Client.setCredentials(tokens);
            const youtube = google.youtube({
                version: "v3",
                auth: oauth2Client,
            });
            youtube.channels.list(
                {
                    part: "snippet,contentDetails,statistics",
                    mine: true,
                },
                (err, response) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: "Internal server error" });
                    } else {
                        console.log(response.data);
                        res.status(200).json(response.data);
                    }
                }
            );
        }
    });
};
