const mongoose = require('mongoose');
const express = require('express');
var bodyParser = require('body-parser');
const utils = require('./src/utils/utils.js');
const db = require('./src/models')
const User = db.user;
const Role = db.role;
const app = express();
const port = 8081;
const trigger = require('./src/services/actions/githubActions.js');


const newUser = new User({
  username: "example_username",
  email: "example@email.com"
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({msg: 'Hello World!'});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);

function serverProcess() {
    setInterval(() => {
        trigger.checkGithubTrigger({ repositoryName: "VictorHarri-Chal/AREA", action: "push", access_token: "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" });
    }, 3000);
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
