const services = {
    github: {
        handleConnection: async function () {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=4046d9ca5e2152e64fec`;
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
