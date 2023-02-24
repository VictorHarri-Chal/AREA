const { google } = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyBmfluQjyzUt-YO_6hixPN1rMs6SxEnONE'
});

let lastLikedVideoId = null;

const youtubeTrigger = {
    checkYoutubeAction: async function checkYoutubeAction(action) {
        const accessToken = 'ya29.a0AVvZVsrcOs75fc0ENHx7eecpWx2_mkK9QJyeu47tvkw_V5r21Yx7yhw6bBhg7T0pFuIcnkHN2HBE9_eS2e0VGCTfc5IWArtw6qDg-UW9nXEpnPWwUvZAd77V19GP8OdQFd3904fJVrfEXLkI_wgsOi5iXu_oaCgYKAe8SARASFQGbdwaILCl0ZTHiEr6I-a9PJD4myg0163';
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
            default:
                console.log(`Unsupported trigger type: ${action.trigger}`);
                return false;
        }
    },

    checkYoutubeReaction: async function checkYoutubeReaction(reaction) {
    }
};

module.exports = youtubeTrigger;
