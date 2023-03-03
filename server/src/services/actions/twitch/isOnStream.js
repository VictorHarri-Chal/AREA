const axios = require('axios');

async function isOnStream(token, twitchUsername) {
    const clientID = '24gzvb0o12bsdlj7qqe016eapnfisc';

    try {
        const response = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${twitchUsername}`, {
            headers: {
                'Client-ID': clientID,
                'Authorization': `Bearer ${token}`
            }
        });

        const streams = response.data.data;

        if (streams.length === 0) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error(`Erreur : ${error}`);
    }
    return false;
}

module.exports = isOnStream;
