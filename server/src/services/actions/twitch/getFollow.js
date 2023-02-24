const axios = require('axios');

const CLIENT_ID = "24gzvb0o12bsdlj7qqe016eapnfisc"

async function getUserID(token) {

    let userID = null;

    await axios({
        method: 'GET',
        url: 'https://api.twitch.tv/helix/users',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Client-ID': CLIENT_ID
        }
    })
    .then((response) => {
        const user = response.data.data[0];
        userID = user.id;
    });

    return userID;
}

async function getFollow(token) {

    const USER_ID = await getUserID(token)
    let follows = [];

    const headers = {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${token}`,
    };

    const url = `https://api.twitch.tv/helix/channels/followed?user_id=${USER_ID}`;

    try {
        const response = await axios.get(url, { headers });
        follows = response.data.data.map((follow) => follow.broadcaster_name);
    } catch (error) {
        console.error(error);
    }

    return follows;
}

module.exports = getFollow;
