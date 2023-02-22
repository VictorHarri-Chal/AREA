const axios = require('axios');

async function isOnStream(token) {
    const clientID = '24gzvb0o12bsdlj7qqe016eapnfisc';
    const twitchUsername = 'yassencore';
    let ret = false;

    try {
        const response = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${twitchUsername}`, {
            headers: {
                'Client-ID': clientID,
                'Authorization': `Bearer ${token}`
            }
        });

        const streams = response.data.data;

        if (streams.length === 0) {
            console.log(`${twitchUsername} n'est pas en live.`);
            ret = false;
        } else {
            console.log(`${twitchUsername} est en live avec ${streams[0].viewer_count} viewers.`);
            ret = true;
        }
    } catch (error) {
        console.log(`Erreur : ${error}`);
    }

    return ret;
}

module.exports = isOnStream;
