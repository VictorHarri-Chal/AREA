const dotenv = require('dotenv');
dotenv.config();

async function sendDM(reaction, discordClient) {
    let userID = null;

    await fetch('https://discordapp.com/api/users/@me', {
        method: 'GET',
        headers: {
            Authorization: 'Bot ' + process.env.TOKEN,
        }
    }).then(response => response.json())
      .then(responseData => {
        userID = responseData.id;
        console.log(`Fetched user ID is <${userID}>`);
    }).catch(err => {
        console.log(`[USER ID] - ${err}`);
    });

    const userIDPayload = {
        recipient_id: userID,
    };

    await fetch('https://discordapp.com/api/users/@me/channels', {
        method: 'POST',
        headers: {
            Authorization: 'Bot ' + process.env.TOKEN,
        },
        body: new URLSearchParams(userIDPayload),
    }).then(response => response.json())
      .then(dmChannelResponse => {
        console.log('DM CHANNEL -> ', dmChannelResponse);
        const channel = discordClient.channels.cache.get(dmChannelResponse.id);
        channel.send(`Hello <@${userID}>! Welcome to my DM channel!`);
    }).catch(err => {
        console.log(`[DM CHANNEL] - ${err}`);
    });

    console.log(`Your test token is <${process.env.TEST}>`);
}

module.exports = sendDM;
