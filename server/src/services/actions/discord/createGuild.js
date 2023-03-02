const dotenv = require('dotenv');
dotenv.config();

async function createGuild(reaction, discordClient) {

    var newGuildName = reaction.data;

    if (newGuildName === undefined)
        newGuildName = 'NoNameGuild'

    const newGuildPayload = {
        name: newGuildName,
    };

    await fetch('https://discord.com/api/guilds', {
        method: 'POST',
        body: new URLSearchParams(newGuildPayload),
    }).then(response => response.json())
      .then(newGuildResponse => {
        console.log('NEW GUILD -> ', newGuildResponse);
        const generalChannel = newGuildResponse.channels.find(channel => channel.name === 'general');

        if (generalChannel) {
            generalChannel.send(`Hello! Welcome to ${newGuildName}!`);
        } else {
            console.log(`[NEW GUILDS] - Could not find #general channel in ${newGuildName}`);
        }

    }).catch(err => {
        console.log(`[NEW GUILD] - ${err}`);
    });
}

module.exports = createGuild;
