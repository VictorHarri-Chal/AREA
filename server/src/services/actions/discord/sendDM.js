async function sendDM(reaction, discordClient) {
    let userID = null;

    await fetch('https://discordapp.com/api/users/@me', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + reaction.token,
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userIDPayload),
    }).then(response => response.json())
      .then(dmChannelResponse => {
        discordClient.channels.fetch(dmChannelResponse.id)
        .then(channel => {
            channel.send(`Hello <@${userID}>! Welcome to my DM channel!`);
        }).catch(err => {
            console.log(`[CHANNEL FETCH ERROR] - ${err}`);
        });
    }).catch(err => {
        console.log(`[DM CHANNEL] - ${err}`);
    });
}

module.exports = sendDM;
