const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//Vérifie si l'utilisateur existe déjà
checkUserAlreadyExisting = (req, res, next) => {
    // Vérification user
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "ERROR - Username is already registered" });
            return;
        }

    // Vérification email
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "ERROR - Email is already registered" });
            return;
        }
        // next(); TESTING
        });
    });
};