const express = require('express');
const mongoose = require('mongoose');

const User = require('./src/models/user.model.js');
const newUser = new User({
  username: "example_username",
  email: "example@email.com"
});

const utils = require('./src/utils/utils.js');

function serverProcess() {
    // utils.deleteUsers();
    // utils.addUser(newUser.username, newUser.email);
    // utils.displayUsers();
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
    serverProcess();
}

function initServer() {
    const app = express();

    app.get('/', (req, res) => {
    res.send('Hello World!');
    });
    const port = 8081;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    initDatabase();
}

initServer();