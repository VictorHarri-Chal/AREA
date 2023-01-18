// Un contrôleur intéragis avec MongoDB avec Mongoose et envoie des réponses HTTP au client
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email
    });

    //Créer un nouveau User
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = roles.map(role => role._id);
                user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "User was registered successfully!" });
                });
            }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
      username: req.body.username
    }).populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "This User does not exist" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Wrong Password"
            });
        }

        var authorities = [];
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // L'équivalent d'un jour en secondes
        });

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("role_permissions_" + user.roles[i].name);
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });
};
