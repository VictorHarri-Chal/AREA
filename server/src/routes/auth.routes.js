const { verifySignup} = require('../middleware');
const controller = require('../controllers/auth.controller');
const { models } = require('mongoose');

function handleAuthRoutes(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signup",
        [
            verifySignup.checkRoleValidity,
            verifySignup.checkUserAlreadyExisting
        ],
        controller.signup
    );

    app.post("/api/auth/signin",
        controller.signin
    )
}

module.exports(handleAuthRoutes);