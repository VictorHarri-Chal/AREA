const mongoose = require('mongoose');
const express = require('express');
const models = require('./src/models');
const utils = require('./src/utils/utils.js');
const User = models.user;
const Role = models.role;
const app = express();
const port = 8081;

const newUser = new User({
  username: "example_username",
  email: "example@email.com"
});

function serverProcess() {
    // utils.deleteUsers();
    // utils.addUser(newUser.username, newUser.email);
    // utils.displayUsers();
}

function initRoles() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      //Ajout du role Admin
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("'admin' added to roles db");
      });

      //Ajout du role User
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("'user' added to roles db");
      });
    }
  });
}

function initDatabase() {
    mongoose.set('strictQuery', true);

    mongoose.connect('mongodb+srv://bissap:gerking123@cluster0.qpna6y2.mongodb.net/sadge?retryWrites=true&w=majority&authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to MongoDB");
    });
    initRoles();
    serverProcess();
}

function initServer() {
    app.get('/', (req, res) => {
    res.send('Hello World!');
    });
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    require('./src/routes/auth.routes')(app);
    require('./src/routes/user.routes')(app);
    initDatabase();
}

initServer();
