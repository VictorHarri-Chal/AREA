var latestReactionRegistered = null;

async function newReaction(action, discordClient) {
    await fetch('https://discordapp.com/api/users/@me', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + action.token,
        }
    }).then(response => response.json())
      .then(responseData => {
        lastReaction = responseData.reactions[0];
        if (lastReaction != latestReactionRegistered) {
            latestReactionRegistered = lastReaction;
            return true;
        } else {
            return false;
        }
    }).catch(err => {
        console.log(`[USER ID] - ${err}`);
    });
    return false;
}

module.exports = newReaction;