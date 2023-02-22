const githubController = require('../controllers/github.controller');
const discordController = require('../controllers/discord.controller');
const spotifyController = require('../controllers/spotify.controller');
const youtubeController = require('../controllers/youtube.controller');
const twitchController = require('../controllers/twitch.controller');

module.exports = function handleServicesRoutes(app) {

    app.get("/githubauth", githubController.githubAuth);
    app.get("/githubcallback", githubController.githubCallback);

    app.get("/discordauth", discordController.discordAuth);
    app.get("/discordcallback", discordController.discordCallback);

    app.get("/spotifyauth", spotifyController.spotifyAuth);
    app.get("/spotifycallback", spotifyController.spotifyCallback);

    app.get("/youtubeauth", youtubeController.youtubeAuth);
    app.get("/youtubecallback", youtubeController.youtubeCallback);

    app.get("/twitchauth", twitchController.twitchAuth);
    app.get("/twitchcallback", twitchController.twitchCallback);

}