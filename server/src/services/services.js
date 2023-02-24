const githubTrigger = require('./actions/githubActions');
const discordTrigger = require('./actions/discordActions');
const spotifyTrigger = require('./actions/spotify/spotifyActions')
const youtubeTrigger = require('./actions/youtube/youtubeActions')
const twitchTrigger = require('./actions/twitch/twitchActions')

const services = {
    github: {
        checkTrigger: async function(action) {
            console.log('[GitHub] - Action');
            // return await githubTrigger.checkGithubAction(action);
        },
        startReaction: async function(reaction) {
            console.log('[GitHub] - Reaction');
            // return await githubTrigger.checkGithubReaction(reaction);
        }
    },
    spotify: {
        checkTrigger: async function(action) {
            console.log('[Spotify] - Action');
            return await spotifyTrigger.checkSpotifyAction(action);

        },
        startReaction: function(reaction) {
            console.log('[Spotify] - Reaction');
            // return spotifyTrigger.checkSpotifyReaction(reaction);
        }
    },
    discord: {
        checkTrigger: async function(action) {
            console.log('[Discord] - Action');
            // return await discordTrigger.discordAction(action);
        },
        startReaction: async function(reaction) {
            console.log('[Discord] - Reaction');
            // return await discordTrigger.discordReaction(reaction);
        }
    },
    twitch: {
        checkTrigger: async function(action) {
            console.log('[Twitch] - Action');
            return await twitchTrigger.checkTwitchAction(action);
        },
        startReaction: async function(reaction) {
            console.log('[Twitch] - Reaction');
            return await twitchTrigger.checkTwitchReaction(reaction);
        }
    },
    youtube: {
        checkTrigger: async function(action) {
            console.log('[Youtube] - Action');
            return await youtubeTrigger.checkYoutubeAction(action);
        },
        startReaction: async function(reaction) {
            console.log('[Youtube] - Reaction');
            // return await youtubeTrigger.youtubeReaction(reaction);
        }
    }
};

module.exports = services;
