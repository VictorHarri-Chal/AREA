const mongoose = require('mongoose');
const User = require('../models/user.model');

const utils = {
    addUser: function addUser(username, email) {
        console.log(`Adding user ${username}...`)
        User.create({
            username: username,
            email: email
        }).then(()=> console.log(`User ${username} added successfully`))
        .catch((error)=>console.log(error));
    },
    deleteUsers: function deleteUsers() {
        User.deleteMany({}, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('All users have been deleted.');
            }
        });
    },
    displayUsers: function displayUsers() {
        User.find({}, (error, users) => {
            if (error) {
                console.log(error);
            } else {
                console.log(users);
            }
        });
    }
}

module.exports = utils;