const Discord = require('discord.js');
const discordClient = new Discord.Client();
const dotenv = require('dotenv');
dotenv.config();

async function sendDM(reaction) {
    var userID =''

    if (!discordClient.isReady()) {
        console.log('Launching bot. . . Token = ' + process.env.TOKEN)
        await discordClient.login(process.env.TOKEN);
    }
    discordClient.on("ready", () => {
        console.log('Logged in as ${discordClient.user.tag}!')
    })

    await fetch('https://discordapp.com/api/users/@me', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + reaction.token,
        }
    }).then(responseData => {
        userID = responseData.data.id;
        console.log('Fetched user ID is <' + userI + '>')
    }).catch(err => {
        console.log('[USER ID] - ' + err);
    })

    const userIDPayload = {
        recipient_id: userID,
    };

    await fetch('https://discordapp.com/api/users/@me/channels', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: new URLSearchParams(userIDPayload),
    }).then(dmChannelResponse => {
        console.log('DM CHANNEL -> ' + dmChannelResponse);
    }).catch(err => {
        console.log('[DM CHANNEL] - ' + err);
    })

    console.log('Your test token is <${process.env.TEST}>');

}

module.exports = sendDM;