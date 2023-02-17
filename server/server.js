const mongoose = require('mongoose');
const express = require('express');
const request = require("request");
const Area = require('./src/models/ar.model');
var bodyParser = require('body-parser');
const utils = require('./src/utils/utils.js');
const db = require('./src/models')
const User = db.user;
const Role = db.role;
const app = express();
const port = 8080;
const cors = require('cors');
const trigger = require('./src/services/checkTriggers');
const Math = require('mathjs');
const queryString = require('querystring');
const axios = require('axios');

const newUser = new User({
    username: "example_username",
    email: "example@email.com"
});

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/routes/auth.routes.js')(app);
require('./src/routes/user.routes.js')(app);

var githubConnected = false;
//declare a global variable to store the github access token
var githubAccessToken = "";
//same for discord
var discordAccessToken = "";

var discordConnected = false;

var spotifyConnected = false;

var spotifyAccessToken = "";

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get("/callback", (req, res) => {
    console.log('callback here');
    res.header("Access-Control-Allow-Origin", "*");
    const code = req.query.code;
    getGitHubAuthToken("498e03f921f50999dbb4", "ef1c8f0525c5239d4635e3e5023ad4b6eb6929ed", code)
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
});

app.get("/githubauth", (req, res) => {
    getGitHubAuthCode(res, "498e03f921f50999dbb4");
});

const getGitHubAuthCode = (res, clientId) => {
    const redirectUri = encodeURIComponent(`http://localhost:8080/callback`);
    const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user&state=random_string`;
    res.redirect(authorizationUrl);
};

app.post("/flow", (req, res) => {
    console.log("spotify token: ", spotifyAccessToken);
    genSchema(req.body);
});

const getService = (key) => {
    return key.split('_')[0];
};

const getTrigger = (key) => {
    return key.split('_').slice(1).join('_');
};

const getFirstBox = (data) => {
    return data.find((box) => {
        if (box.startOfFlow === true) {
            return true;
        }
    });
};

const getLastBox = (data) => {
    return data.find((box) => {
        if (box.endOfFlow === true) {
            return true;
        }
    });
};

const genSchema = (data) => {
    const firstBox = getFirstBox(data);
    const endBox = getLastBox(data);

    // console.log(firstBox);
    // console.log(endBox);

    const area = new Area({
        action: {
            service: getService(firstBox.key),
            trigger : getTrigger(firstBox.key),
            token : 'ThisIsAToken',
            data : {
                data : firstBox.chosenItem // change this to a generic way
            }
        },
        reaction: {
            service: getService(endBox.key),
            trigger : getTrigger(endBox.key),
            token : 'ThisIsAToken',
            data : {
                data : endBox.chosenItem
            }
        }
    });
    // console.log(area);
};

app.post("/isConnect", (req, res) => {
    // if (req.body.key === 'github')
    res.status(200).send('Connected');
});

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


app.get("/discordcallback", (req, res) => {
    console.log("discord-callback here");
    res.header("Access-Control-Allow-Origin", "*");
    const code = req.query.code;
    console.log("Code: ", code);
    getDiscordAccessToken("1063054273946058833", "Ie8_A2L-lNSnKFvjiXXQFfwX9Wwb2w_-", code)
        .then((accessToken) => {
            console.log("access token: ", accessToken);
            discordConnected = true;
            discordAccessToken = accessToken;
        })
        .catch((error) => {
            console.error(error);
        });
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8081/dashboard");
    res.end();
});

app.get("/discord-auth", (req, res) => {
    console.log('discord auth here');
    getDiscordAuthCode(res, "1063054273946058833");
});

const getDiscordAuthCode = (res, clientId) => {
    console.log('discord authcode here');
    const redirectUri = encodeURIComponent(`http://localhost:8080/discordcallback`);
    const authorizationUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20guilds%20connections%20messages.read%20identify%20gdm.join`;
    console.log("discord auth URL: ", authorizationUrl);
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

const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


var client_id = '7e1049e74b76497a9c192fcf08c9a279'; // Your client id spotify
var client_secret = '331c1bb09e3042f9b06a9302dc01a74c'; // Your secret spotify

app.get("/spotify-auth", (req, res) => {
    console.log('spotify auth here');

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

});

app.get("/spotifycallback", (req, res) => {
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
        // console.log("\n\n\n\n\n\n\n")
        // console.log(response.data);
        spotifyConnected = true;
        spotifyAccessToken = response.data.access_token;
    }).catch((error) => {
        console.log(error);
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:8081/dashboard");
    res.end();
});

function serverProcess() {

    // setInterval(() => {
    //     if (spotifyConnected) {
    //         console.log('Launch Action');
    //         const area = new Area({
    //             action: {
    //                 service: 'spotify',
    //                 trigger: 'newStream',
    //                 token: spotifyAccessToken,
    //                 data: '',
    //             },
    //             reaction: {
    //                 service: 'spotify',
    //                 trigger: 'createPlaylist',
    //                 token: spotifyAccessToken,
    //                 data: '',
    //             }
    //         });
    //         area.save((err, area) => {
    //             console.log('save..');
    //             if (err) {
    //                 console.log('ERRRRRR');
    //                 console.log(err);
    //             } else {
    //                 // console.log(`Successfully saved area: ${area}`);
    //                 console.log(`Successfully saved area`);
    //             }
    //         });
    //     }
    // }, 15000);

    setInterval(() => {
        console.log('Check...');
        trigger.checkTriggers();
    }, 5000);

    // utils.deleteUsers();
    // utils.addUser(newUser.username, newUser.email);
    // utils.displayUsers();
}

function initRoles() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: 'user'
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: 'admin'
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}

function initDatabase() {
    mongoose.set('strictQuery', false);

    db.mongoose.connect('mongodb+srv://bissap:gerking123@cluster0.qpna6y2.mongodb.net/sadge?retryWrites=true&w=majority&authSource=admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connect to MongoDB.");
        initRoles();
    });
    serverProcess();
}

initDatabase();
