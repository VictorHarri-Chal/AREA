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
    console.log('ça passe là')
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


function serverProcess() {
    const area = new Area({
        action: {
            service: 'github',
            token: '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',
            data: {
                repositoryName: 'VictorHarri-Chal/AREA',
                trigger: 'issue'
            }
        },
        reaction: {
            service: 'github',
            token: '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',
            data: {
                repositoryName: 'VictorHarri-Chal/AREA',
                trigger: 'push'
            }
        }
    });

    // area.save((err, area) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(`Successfully saved area: ${area}`);
    //     }
    // });

    setInterval(() => {
        // trigger.checkTriggers();
        // console.log('Checking triggers...');
    }, 3000);
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
