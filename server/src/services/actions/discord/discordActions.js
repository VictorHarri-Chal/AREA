const { Client, GatewayIntentBits } = require('discord.js');
const sendDMFunc = require('./sendDM');
const createGuildFunc = require('./createGuild');

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

const discordTrigger = {
    checkDiscordAction : async function checkDiscordAction(action) {
        if (action.trigger === 'newReaction') {
            // return newReaction(action, discordClient)
        }
    },

    checkDiscordReaction : async function checkDiscordReaction(reaction) {
        discordClient.on("ready", () => {
            console.log(`Logged in as ${discordClient.user.tag}!`);
        });

        if (!discordClient.readyAt) {
            console.log(`Launching bot... Token = ${process.env.TOKEN}`);
            await discordClient.login(process.env.TOKEN);
        }

        if (reaction.trigger === 'sendPrivateMessage') {
            return sendDMFunc(reaction, discordClient)
        }

        if (reaction.trigger === 'createGuild') {
            return createGuildFunc(reaction)
        }
    }

}

module.exports = discordTrigger;
