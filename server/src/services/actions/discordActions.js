const axios = require('axios');
const Discord = require('discord.js');
const discordClient = new Discord.Client();
const token = ''


const discordAction = {
    checkDiscordAction: async function checkDiscordTrigger(action) {
        ;
    }
}

const discordReaction = {
    checkDiscordReaction: async function checkDiscordTrigger(reaction) {
        discordClient.login(token);
        discordClient.once('ready', () => {
            console.log('Bot Discord correctement initialisé.');
        }).then(reaction => {
            //Send msg
            client.users.fetch('testID', false).then((user) => {
                user.send('[GitHub] - PUSH: "testPush"');
            });
        })

    }
}

module.exports = {
    discordAction,
    discordReaction
};
