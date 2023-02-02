const services = {
    github: {
        handleConnection: async function (action) {
            try {
                const response = await fetch('http://localhost:8080/githubauth');
                if (!response.ok) {
                    throw new Error('Failed to connect to Github');
                }
            } catch (error) {
                console.error(error);
            }
            console.log('Github connected');
        },
    },
    twitter: {
    }
};

module.exports = services;
