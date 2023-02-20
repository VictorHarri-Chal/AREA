const githubController = require('../controllers/github.controller');
const discordController = require('../controllers/discord.controller');

module.exports = function handleServicesRoutes(app) {

    app.get("/githubauth", githubController.githubAuth);
    app.get("/githubcallback", githubController.githubCallback)
    app.get("/discordauth", discordController.discordAuth);
    app.get("/discordcallback", discordController.discordCallback);

}