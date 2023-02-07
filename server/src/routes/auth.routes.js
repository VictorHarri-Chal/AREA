const { verifySignup} = require('../middleware');
const controller = require('../controllers/auth.controller');
const { models } = require('mongoose');

module.exports = function handleAuthRoutes(app) {
    const cors = (req, res, next) => {

        console.log('setup Header to allow Origins');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type");

        next();
    };

    app.use(cors);
    app.post("/api/auth/signup", controller.signup);
    app.post("/api/auth/signin", controller.signin);
}
