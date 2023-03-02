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
                lastLikedVideoId = videoId;
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error: ", error);
        if (error.response && error.response.status === 403) {
            console.error("API key does not have permission to access user's activity feed.");
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
                lastPublishedVideoId = videoId;
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error: ", error);
        if (error.response && error.response.status === 403) {
            console.error("API key does not have permission to access channel's videos.");
        }
        return false;
    }
}

const youtubeTrigger = {
    checkYoutubeAction: async function checkYoutubeAction(action) {
        const accessToken = action.token;
        const trigger = action.trigger;
        switch (trigger) {
            case "newLike":
                return await checkNewLike(accessToken);
            case "newVideo":
                return await checkNewVideo(action.channelName);
            default:
                console.error(`Unsupported trigger type: ${action.trigger}`);
                return false;
        }
    },

    checkYoutubeReaction: async function checkYoutubeReaction(reaction) {
    }
};

module.exports = youtubeTrigger;
