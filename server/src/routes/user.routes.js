const { authJwt} = require('../middleware')
const controller = require('../controllers/user.controller');

function handleUserRoutes(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/services", controller.allAccess);
    app.get("/api/dashboard", [authJwt.verifyTokenValidity] , controller.userAccess);
    app.get("/api/adminPage", [authJwt.verifyTokenValidity, authJwt.isUserAdmin], controller.adminAccess);
}

module.exports(handleUserRoutes);