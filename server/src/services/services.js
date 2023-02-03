const githubTrigger = require('./actions/githubActions');

const services = {
    github: {
        checkTrigger: async function(action) {
            return await githubTrigger.checkGithubTrigger(action);
        },
        startReaction: function(reaction) {
            console.log('REACTION');
        }
    },
    twitter: {
        checkTrigger: async function(action) {

        },
        startReaction: function(reaction) {

        }
    }
};

module.exports = services;
