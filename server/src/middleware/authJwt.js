const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = require(db.user);
const Role = require(db.role);

//Vérifie la validité du token de connexion de l'utilisateur
verifyTokenValidity = (req, res, next) => {

    let token = req.headers["x-access-token"];

    if (!token)
        return (res.status(403).send({ message: 'No token was found' }));

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return (res.status(401).send({ message: 'Unauthorized access'}))
        req.userId = decoded.id;
        next();
    });
};

//Vérifie si l'utilisateur (via id) est un admin
isUserAdmin = (req, res, next) => {

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err});
            return;
        }

        Role.find({
            _id: { $in: user.roles }
        },
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err});
                return;
            }

            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "This action requires admin privilegies"});
            return;
        });
    });
};

const authJwt = {
    verifyTokenValidity,
    isUserAdmin
}

module.exports = authJwt;