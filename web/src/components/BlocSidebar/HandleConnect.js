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
};

module.exports = services;
