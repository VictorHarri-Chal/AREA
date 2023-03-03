const githubTrigger = require('./actions/githubActions');
const discordTrigger = require('./actions/discord/discordActions');
const spotifyTrigger = require('./actions/spotify/spotifyActions')
const youtubeTrigger = require('./actions/youtube/youtubeActions')
const twitchTrigger = require('./actions/twitch/twitchActions')

const services = {
    github: {
        checkTrigger: async function(action) {
            // return await githubTrigger.checkGithubAction(action);
        },
        startReaction: async function(reaction) {
            // return await githubTrigger.checkGithubReaction(reaction);
        }
    },
    spotify: {
        checkTrigger: async function(action) {
            // return await spotifyTrigger.checkSpotifyAction(action);

        },
        startReaction: function(reaction) {
            // return spotifyTrigger.checkSpotifyReaction(reaction);
        }
    },
    discord: {
        checkTrigger: async function(action) {
            // return await discordTrigger.checkDiscordAction(action);
        },
        startReaction: async function(reaction) {
            // return await discordTrigger.checkDiscordReaction(reaction);
        }
    },
    twitch: {
        checkTrigger: async function(action) {
            // return await twitchTrigger.checkTwitchAction(action);
        },
        startReaction: async function(reaction) {
            // return await twitchTrigger.checkTwitchReaction(reaction);
        }
    },
    youtube: {
        checkTrigger: async function(action) {
            // return await youtubeTrigger.checkYoutubeAction(action);
        },
        startReaction: async function(reaction) {
            // return await youtubeTrigger.youtubeReaction(reaction);
        }
    }
};

module.exports = services;
