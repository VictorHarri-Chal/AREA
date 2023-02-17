// Un contrôleur intéragis avec MongoDB avec Mongoose et envoie des réponses HTTP au client
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const AccessTokens = db.accessTokens;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var bodyParser = require('body-parser');

exports.signup = async (req, res) => {
    if (!req.body.passwordSignUp) {
        res.status(500).send({message: "No password provided"});
    }
    var currentuserID = '';

    const user = new User({
        username: req.body.usernameSignUp,
        email: req.body.emailSignUp,
        password: bcrypt.hashSync(req.body.passwordSignUp)
    });

    //Créer un nouveau User
    await user.save((err, user) => {
        if (err) {
            res.status(501).send({ message: "1: " + err });
            return;
        }

        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(502).send({ message: "2: " + err });
                    return;
                }

                user.roles = roles.map(role => role._id);
                user.save(err => {
                if (err) {
                    res.status(503).send({ message: "3: " + err });
                    return;
                }
                res.send({ message: "User was registered successfully!" });
                });
            }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(504).send({ message: "4: " + err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(505).send({ message: "5: " + err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });

    User.findOne({username: req.body.usernameSignUp}, function (err, docs) {
        if (err){
            console.log(err)
        } else {
            console.log("Result : ", docs);
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
      username: req.body.usernameSignIn
    }).populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(406).send({ message: "This User does not exist" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.passwordSignIn,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Wrong Password"
            });
        }

        var authorities = [];
        var payload = {
            userID: user.id,
        }
        var token = jwt.sign(payload, config.secret);
        res.cookie('jwtToken', token);

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("role_permissions_" + user.roles[i].name);
        }

        console.log('200 responding succesfully. . .');
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });
};
