//ça fonctionne!
const { google } = require('googleapis');
const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyBmfluQjyzUt-YO_6hixPN1rMs6SxEnONE'
});

const auth2 = new google.auth.OAuth2(
    '987523785191-8shg0ut9g9olugvsu2bs3os9cqo4d8d1.apps.googleusercontent.com',
    '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',
);

// Set the access token to the OAuth2 client
auth2.setCredentials({
    access_token: 'ya29.a0AVvZVsoplMqX43KkwMWFrAMlPBWb1fL_nasDBBx7DLF2G9gFvCjGVml03Ibpuy4dGUkRCGzmlivrHf34TI3lLDrU_tOCWLcoZ9AqeKxg8XdQe75bGHkSF9GgodznW2xkC5vAJmRJdQESPTOxdVvPC4zmbEFFaCgYKAQ8SARASFQGbdwaIH6dtjwtXJX65iEDUzdsOPg0163',
});

const youtube2 = google.youtube({
    version: 'v3',
    auth: auth2
});

async function getChannelId() {
    try {
        const response = await youtube2.channels.list({
            part: 'id',
            mine: true
        });
        console.log('Channel ID:', response.data.items[0].id);
    } catch (error) {
        console.log('Error:', error.message);
    }
}

const youtubeTrigger = {
    checkYoutubeAction: async function checkYoutubeAction(action) {
        const accessToken = 'ya29.a0AVvZVsoplMqX43KkwMWFrAMlPBWb1fL_nasDBBx7DLF2G9gFvCjGVml03Ibpuy4dGUkRCGzmlivrHf34TI3lLDrU_tOCWLcoZ9AqeKxg8XdQe75bGHkSF9GgodznW2xkC5vAJmRJdQESPTOxdVvPC4zmbEFFaCgYKAQ8SARASFQGbdwaIH6dtjwtXJX65iEDUzdsOPg0163';
        const trigger = action.trigger;

        switch (trigger) {
            case "newLike":
            try {
                const response = await youtube.videos.list({
                    part: 'snippet',
                    myRating: 'like',
                    maxResults: 1,
                    access_token: accessToken
                });
                if (response.status === 200 && response.data.items.length > 0) {
                    const videoTitle = response.data.items[0].snippet.title;
                    console.log(`User liked the video: ${videoTitle}`);
                    return true;
                } else {
                    console.log("User did not like a video.");
                    return false;
                }
            } catch (error) {
                console.log("Error: ", error);
                if (error.response && error.response.status === 403) {
                    console.log("API key does not have permission to access user's activity feed.");
                }
                return false;
            }
            default:
                console.log(`Unsupported trigger type: ${action.trigger}`);
                return false;
        }
    },

    checkYoutubeReaction: async function checkYoutubeReaction(reaction) {
    }
};

module.exports = youtubeTrigger;
