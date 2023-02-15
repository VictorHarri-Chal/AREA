const services = {
    github: {
        handleConnection: async function () {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=498e03f921f50999dbb4`;
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
