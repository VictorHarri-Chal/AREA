const mongoose = require('mongoose');
const express = require('express');
const Area = require('./src/models/ar.model');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const db = require('./src/models');
const AccessTokens = db.accessTokens;
const app = express();
const port = 8080;
const cors = require('cors');
const trigger = require('./src/services/checkTriggers');
const cookies = require('./src/utils/getCookie.js');
const twitchTrigger = require('./src/services/actions/twitch/twitchActions');
const githubTrigger = require('./src/services/actions/githubActions');


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/routes/auth.routes.js')(app);
require('./src/routes/user.routes.js')(app);
require('./src/routes/services.routes.js')(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.post("/askBlocData", async (req, res) => {
    let token = req.headers["x-access-token"];
    const userID =  cookies.parseJwt(token)
    let goodArea = {};

    const areas = await Area.find();
    for (const area of areas) {
        if (area.userId === userID) {
            goodArea = area;
        }
    }

    if (goodArea === {}) {
        res.send("No area found");
    }

    res.json(goodArea);
});

app.post("/flow", (req, res) => {
    genSchema(req.body, req);
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

// SI PLUSIEURS DU MEME UTILISATEURS

const genSchema = async (data, req) => {
    const firstBox = getFirstBox(data);
    const endBox = getLastBox(data);
    let token = req.headers["x-access-token"];
    const userID =  cookies.parseJwt(token)
    var actionToken = '';
    var reactionToken = '';

    var tmpTokensList = await AccessTokens.findOne({ownerUserID: userID})

    for (var i = 0; i < tmpTokensList.tokens.length; i = i + 1) {
        if (tmpTokensList.tokens[i].service === getService(firstBox.key)) {
            actionToken = tmpTokensList.tokens[i].value;
        }
        if (tmpTokensList.tokens[i].service === getService(endBox.key)) {
            reactionToken = tmpTokensList.tokens[i].value;
        }
    }

    if (actionToken == '' || reactionToken == '') {
        return;
    }

    const area = new Area({
        userId : userID,
        action: {
            service: getService(firstBox.key),
            trigger : getTrigger(firstBox.key),
            token : actionToken,
            data : {
                data : firstBox.chosenItem, // change this to a generic way
                x : firstBox.x,
                y : firstBox.y,
                key : firstBox.key,
                linkTo : firstBox.linkTo,
                linkFrom : firstBox.linkFrom,
                startOfFlow : firstBox.startOfFlow,
                endOfFlow : firstBox.endOfFlow,
                chosenItem : firstBox.chosenItem,
                id : firstBox.id,
                isAction : true,
            }
        },
        reaction: {
            service: getService(endBox.key),
            trigger : getTrigger(endBox.key),
            token : reactionToken,
            data : {
                data : endBox.chosenItem,
                x : endBox.x,
                y : endBox.y,
                key : endBox.key,
                linkTo : endBox.linkTo,
                linkFrom : endBox.linkFrom,
                startOfFlow : endBox.startOfFlow,
                endOfFlow : endBox.endOfFlow,
                chosenItem : endBox.chosenItem,
                id : endBox.id,
                isAction : false,
            }
        }
    });

    saveToDatabase(area);
};

async function saveToDatabase(newArea) {

    const areas = await Area.find();
    for (const area of areas) {
        if (area.userId === newArea.userId) {
            Area.findByIdAndRemove(area._id, function (err) {
                if (err) return next(err);
            });
        }
    }

    newArea.save((err, newArea) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

app.post("/isConnect", (req, res) => {
    res.status(200).send('Connected');
});

app.get('/download', (req, res) => {
    const filePath = path.join('/usr/apkBuild', 'client.apk');
    res.download(filePath, (err) => {
      if (err) {
        // Gérer les erreurs de téléchargement
        console.error(err);
        res.status(500).send('Une erreur est survenue lors du téléchargement.');
      }
    });
  });

function serverProcess() {
    setInterval(() => {
        console.log('Check...');
        trigger.checkTriggers();
    }, 5000);
}


app.post("/askDMData", async (req, res) => {
    let key = req.body.key;
    let service = key.split('_')[0];
    let trigger = key.split('_')[1];
    let follows = [];
    let repositories = [];

    let token = req.headers["x-access-token"];
    const userID =  cookies.parseJwt(token) // here

    if (service === 'twitch') {
        follows = await twitchTrigger.getTwitchData(trigger);
        res.json({ follows })
    }

    if (service === 'github') {
        repositories = await githubTrigger.getGithubData(trigger, userID);
        res.json({ repositories })
    }

});

function initDatabase() {
    mongoose.set('strictQuery', false);

    db.mongoose.connect('mongodb+srv://bissap:gerking123@cluster0.qpna6y2.mongodb.net/sadge?retryWrites=true&w=majority&authSource=admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connect to MongoDB.");
    });
    serverProcess();
}

initDatabase();
