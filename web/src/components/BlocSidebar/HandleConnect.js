const services = {
    github: {
        handleConnection: async function () {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=ffd70e614dd0cd62f19e`;
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
