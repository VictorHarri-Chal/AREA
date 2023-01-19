const mongoose = require('mongoose');
const express = require('express');
const User = require('./src/models/user.model');
const db = require('./src/models');
const Role = db.role;
const app = express();
const port = 4000;

mongoose.set('strictQuery', true);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

mongoose.connect('mongodb+srv://bissap:gerking123@cluster0.qpna6y2.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  initRoles();
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

const exempleUser = new User({
  username: "example_username",
  email: "example@email.com"
});

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