const { google } = require('googleapis');

const db = require("../../../models");
const AccessTokens = db.accessTokens;

const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyBmfluQjyzUt-YO_6hixPN1rMs6SxEnONE'
});

let lastPublishedVideoId = null;
let lastLikedVideoId = null;

async function checkNewLike(accessToken) {
    try {
        const response = await youtube.videos.list({
            part: 'snippet',
            myRating: 'like',
            maxResults: 1,
            access_token: accessToken
        });
        if (response.status === 200 && response.data.items.length > 0) {
            const videoId = response.data.items[0].id;
            const videoTitle = response.data.items[0].snippet.title;

            if (videoId !== lastLikedVideoId) {
                console.log(`User liked the video: ${videoTitle}`);
                lastLikedVideoId = videoId;
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log("Error: ", error);
        if (error.response && error.response.status === 403) {
            console.log("API key does not have permission to access user's activity feed.");
        }
        return false;
    }
}


async function checkNewVideo(channelName) {
    try {
        const response = await youtube.search.list({
            part: 'snippet',
            channelId: "UCVLz2YXk7drrX02TSXPmg2w",
            maxResults: 1,
            order: 'date'
        });
        if (response.status === 200 && response.data.items.length > 0) {
            const videoId = response.data.items[0].id.videoId;
            const videoTitle = response.data.items[0].snippet.title;

            if (videoId !== lastPublishedVideoId) {
                console.log(`New video published by ${channelName}: ${videoTitle}`);
                lastPublishedVideoId = videoId;
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log("Error: ", error);
        if (error.response && error.response.status === 403) {
            console.log("API key does not have permission to access channel's videos.");
        }
        return false;
    }
}

const youtubeTrigger = {
    checkYoutubeAction: async function checkYoutubeAction(action) {
        const accessToken = 'ya29.a0AVvZVspqpwYaQVoOSr6C6Y4vgcswcqiuNK1SaBTJpshhiHXXrRBD9Zl04FjBabNtTWnQIvHZ04EoA5zKCa968z_mRjxwI9JEEp9puIGXbl-tC4w7yjY98JUM58Vuafzmi8D-uoEz-X_jF_ChqtFU2QcSVFvhaCgYKAcQSARASFQGbdwaIObWi3iiOmohGuF7W-oAJBg0163';
        const trigger = action.trigger;
        switch (trigger) {
            case "newLike":
                return await checkNewLike(accessToken);
            case "newVideo":
                return await checkNewVideo(action.channelName);
            default:
                console.log(`Unsupported trigger type: ${action.trigger}`);
                return false;
        }
    },

    checkYoutubeReaction: async function checkYoutubeReaction(reaction) {
    }
};

module.exports = youtubeTrigger;
