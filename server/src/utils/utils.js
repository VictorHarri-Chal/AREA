const mongoose = require('mongoose');
const User = require('../models/user.model');

const utils = {
    addUser: function addUser(username, email) {
        console.log(`Adding user ${username}...`)
        User.create({
            username: username,
            email: email
        }).then()
        .catch((error)=>console.log(error));
    },
    deleteUsers: function deleteUsers() {
        User.deleteMany({}, (error) => {
            if (error) {
                console.error(error);
            } else {
            }
        });
    },
    displayUsers: function displayUsers() {
        User.find({}, (error, users) => {
            if (error) {
                console.error(error);
            } else {
            }
        });
    }
}

module.exports = utils;