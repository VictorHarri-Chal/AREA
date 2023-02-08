const axios = require('axios');
const Discord = require('discord.js');
const discordClient = new Discord.Client();

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
            console.log('THEN -> discord reaction');

            //TEST 1
            discordClient.users.get('testID').send('Hello');

            //TEST 2
            // client.users.fetch('testID', false).then((user) => {
            //     user.send('[GitHub] - PUSH: "testPush"');
            // });
        })

    }
}

module.exports = {
    discordAction,
    discordReaction
};
