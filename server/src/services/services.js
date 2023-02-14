const githubTrigger = require('./actions/githubActions');
const discordTrigger = require('./actions/discordActions');

const services = {
    github: {
        checkTrigger: async function(action) {
            console.log('[GitHub] - Action');
            return await githubTrigger.checkGithubAction(action);
        },
        startReaction: async function(reaction) {
            console.log('[GitHub] - Reaction');
            return await githubTrigger.checkGithubReaction(reaction);
        }
    },
    twitter: {
        checkTrigger: async function(action) {

        },
        startReaction: function(reaction) {

        }
    },
    discord: {
        checkTrigger: async function(action) {
            console.log('[Discord] - Action');
            // return await discordTrigger.discordAction(action);
        },
        startReaction: async function(reaction) {
            console.log('[Discord] - Reaction');
            return await discordTrigger.checkDiscordReaction(reaction);
        }
    }
};

module.exports = services;
