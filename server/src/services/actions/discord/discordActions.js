const Discord = require('discord.js');
const discordClient = new Discord.Client();
const dotenv = require('dotenv');
dotenv.config();

const discordTrigger = {
    checkDiscordAction : async function checkDiscordAction(action) {
        if (action.trigger === 'zzz') {
            // return zzzFunc(token)
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

        if (reaction.trigger === 'sendDM') {
            return sendDM(reaction, discordClient)
        }

        if (reaction.trigger === 'createGuild') {
            return createGuildFunc(reaction)
        }
    }

}

module.exports = discordTrigger;
