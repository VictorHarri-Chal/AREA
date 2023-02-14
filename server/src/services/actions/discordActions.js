const axios = require('axios');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.Guilds], partials: [Partials.Channel] });


const discordTrigger = {
    checkDiscordAction: async function checkDiscordAction(action) {
        ;
    },
    checkDiscordReaction: async function checkDiscordReaction(reaction) {
        const trigger = reaction.trigger;
        const access_token = reaction.token;
        let url = '';
        require('dotenv').config()
        var botToken = process.env.token;


        if (trigger === 'send_Private_Message') {
            url = `https://discordapp.com/api/users/@me`;
        } else {
            console.log('Invalid reaction provided. Please provide a valid reaction.');
        }

        try {

            userID = ''

            await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + access_token,
                },
            }).then(response => {
                userID = response.data.id
                console.log('User id: ' + userID);

                client.token = botToken
            }).catch(err => {
                console.log('[UserID ERROR] - ' + err);
            })
            await client.users.fetch(userID
            ).then(user => {
                const message = 'Hello mon halouf';

                if (!user) return console.log("[ERROR] - User not found :(")
                else {
                    console.log('user = ' + user)
                }

                console.log('Sending: "' + message + '"');
                user.send(message).catch(() => {
                    console.log("[ERROR] - User has DMs closed or has no mutual servers with the bot:(");
                });
                console.log('sent!');
            }).catch(err => {
                console.log('[SendMsg ERROR] - ' + err);
            })
        }
        catch (err) {
            console.log('Discord reaction error: ' + err);
        }
    }
}

module.exports = discordTrigger;
