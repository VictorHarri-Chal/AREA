const mongoose = require('mongoose');
const express = require('express');
const User = require('./src/models/user.model');
const models = require('./src/models');
const Role = models.role;
const app = express();
const port = 4000;

mongoose.set('strictQuery', true);

require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

mongoose.connect('mongodb+srv://bissap:gerking123@cluster0.qpna6y2.mongodb.net/sadge?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected... initiating roles...')
  initRoles();
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
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