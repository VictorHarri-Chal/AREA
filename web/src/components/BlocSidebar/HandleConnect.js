const services = {
    github: {
        handleConnection: async function () {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=498e03f921f50999dbb4`;
        },
    },
    twitter: {
    }
};

module.exports = services;
