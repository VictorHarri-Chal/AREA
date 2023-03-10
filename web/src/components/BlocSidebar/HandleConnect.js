const services = {
    github: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/githubauth`;
        },
    },
    discord: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/discordauth`;
        },
    },
    spotify: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/spotifyauth`;
        },
    },
    youtube: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/youtubeauth`;
        },
    },
    twitch: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/twitchauth`;
        },
    },
    twitter: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/twitterauth`;
        },
    },
};

module.exports = services;
