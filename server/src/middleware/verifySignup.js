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

//Vérifie si le role est valide
checkRoleValidity = (req, res, next) => {
    if (req.body.ROLES) {
        for (var i = 0; i < req.body.ROLES.length[i]; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: 'Role does not exist!'
                });
                return;
            }
        }
    }
    next();
};

const signUpVerifications = {
    checkUserAlreadyExisting,
    checkRoleValidity
}

module.exports(signUpVerifications);