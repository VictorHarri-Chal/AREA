const mongoose = require('mongoose');
const express = require('express');
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
require('./src/routes/services.routes.js')(app);

var spotifyAccessToken = "";

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

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
        userId : '123456789',
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

    console.log(area);

    // area.save((err, area) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(area);
    // });

};

app.post("/isConnect", (req, res) => {
    // if (req.body.key === 'github')
    res.status(200).send('Connected');
});

function serverProcess() {
    setInterval(() => {
        console.log('Check...');
        trigger.checkTriggers();
    }, 5000);
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
