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
    twitch: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/twitchauth`;
        },
    },
};

module.exports = services;
