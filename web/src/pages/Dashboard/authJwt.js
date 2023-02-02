const jwt = require('jsonwebtoken');
const config = require('../../../../server/src/config/auth.config');

//Vérifie la validité du token de connexion de l'utilisateur
module.exports = function verifyTokenValidity(req, res, next) {

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
