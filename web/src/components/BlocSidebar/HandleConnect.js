const services = {
    github: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/githubauth`;
        },
    },
    discord: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/discord-auth`;
        },
    },
    spotify: {
        handleConnection: async function () {
            window.location.href = `http://localhost:8080/spotify-auth`;
        },
    },
};

module.exports = services;
