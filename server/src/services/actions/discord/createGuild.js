async function createGuild(reaction, discordClient) {

    var newGuildName = 'NoNameGuild';

    // console.log(discordClient.channels)
    await discordClient.guilds.create(newGuildName);
    const newGuildPayload = {
        name: newGuildName,
    };

    await fetch('https://discord.com/api/guilds', {
        method: 'POST',
        headers: {
            'Authorization': `Bot ${process.env.TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGuildPayload),
    }).then(response => response.json())
      .then(async newGuildResponse => {
        console.log('NEW GUILD -> ', newGuildResponse);
        await discordClient.guilds.fetch(); // fetch the guilds
        const newGuild = discordClient.guilds.cache.get(newGuildResponse.id);
        const generalChannel = newGuild.channels.cache.find(channel => channel.name === 'general');
        if (generalChannel) {
            generalChannel.send(`Hello! Welcome to ${newGuildName}!`);
        } else {
            console.log(`[NEW GUILD] - Could not find #general channel in ${newGuildName}`);
        }
    }).catch(err => {
        console.log(`[NEW GUILD] - ${err}`);
    });
}

module.exports = createGuild;
