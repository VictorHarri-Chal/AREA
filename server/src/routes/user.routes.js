const { authJwt} = require('../middleware')
const controller = require('../controllers/user.controller');

module.exports = function handleUserRoutes(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });

    app.get("/", controller.allAccess);
    app.get("/dashboard", [authJwt.verifyTokenValidity] , controller.userAccess);
    app.get("/adminPage", [authJwt.verifyTokenValidity, authJwt.isUserAdmin], controller.adminAccess);
    app.get("/about.json", controller.about);
}
