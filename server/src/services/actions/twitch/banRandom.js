const axios = require('axios');

const clientID = '24gzvb0o12bsdlj7qqe016eapnfisc';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function getChannelID(token) {
    let channelId = null;

    await axios({
        method: 'GET',
        url: 'https://api.twitch.tv/helix/users',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Client-ID': clientID
        }
    })
    .then((response) => {
        const user = response.data.data[0];
        const userId = user.id;

        return axios({
            method: 'GET',
            url: `https://api.twitch.tv/helix/channels?broadcaster_id=${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-ID': clientID
            }
        });
    })
    .then((response) => {
        const channel = response.data.data[0];
        channelId = channel.broadcaster_id;
    })
    .catch((error) => {
        console.error(error);
    });

    return channelId;
}

async function banRandom(token) {
    const userId = getRandomInt(1, 9999);
    const channelId = await getChannelID(token);


    if (channelId === null) {
        console.error('Impossible de récupérer l\'ID du canal');
        return;
    }

    let ret = false;

    try {
        const response = await axios({
            method: 'POST',
            url: 'https://api.twitch.tv/helix/moderation/bans',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Client-Id': clientID,
                'Content-Type': 'application/json'
            },
            params: {
                broadcaster_id: channelId,
                moderator_id: channelId
            },
            data: {
                data: {
                    user_id: userId,
                    reason: 'Just bad luck sorry :)'
                }
            }
        })
        ret = true;
    } catch (error) {
        ret = false;
        console.error(error);
    }

    return ret;
}

module.exports = banRandom;
